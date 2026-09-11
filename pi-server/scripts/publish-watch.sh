#!/usr/bin/env bash
# Runs a WP2Static crawl + deploy, then syncs the result into docs/ and
# pushes it to GitHub. Meant to run on a cron on the Pi (see pi-server/README.md).
#
# Safe to run by hand too — it no-ops if another run is already in progress,
# and only commits/pushes when the exported output actually changed.
set -euo pipefail

# --- Configuration: edit these three paths for your Pi, or export them
# before calling this script (e.g. from crontab with `REPO_DIR=... EXPORT_DIR=... bash ...`).
REPO_DIR="${REPO_DIR:-/home/hamzah/rhr-site-repo}"
COMPOSE_DIR="${COMPOSE_DIR:-$REPO_DIR/pi-server}"
EXPORT_DIR="${EXPORT_DIR:-/home/hamzah/wp2static-export}"
LOCKFILE="/tmp/rhr-publish.lock"

log() { echo "$(date '+%Y-%m-%d %H:%M:%S') - $*"; }

exec 200>"$LOCKFILE"
if ! flock -n 200; then
  log "another publish run is already in progress, skipping"
  exit 0
fi

log "starting publish run"
cd "$COMPOSE_DIR"

# 1. Trigger crawl + deploy. Confirm these are the exact wp2static subcommand
#    names for your installed plugin version with: docker compose --profile tools run --rm wpcli wp2static --help
docker compose --profile tools run --rm wpcli wp2static crawl
docker compose --profile tools run --rm wpcli wp2static deploy

# 2. Quiescence check: if the export directory was modified in the last 30s,
#    the deploy may still be writing files — skip this run rather than
#    syncing a half-written export, cron will catch it on the next tick.
if find "$EXPORT_DIR" -newermt '-30 seconds' 2>/dev/null | grep -q .; then
  log "export directory still changing, skipping this run"
  exit 0
fi

if [ ! -d "$EXPORT_DIR" ] || [ -z "$(ls -A "$EXPORT_DIR" 2>/dev/null)" ]; then
  log "export directory is empty, nothing to publish"
  exit 0
fi

# 3. Sync the export into the git working tree. --delete keeps docs/ an exact
#    mirror of the export, but that also wipes GitHub Pages' required files,
#    which get re-written in step 4.
rsync -a --delete \
  --exclude '.git' --exclude 'CNAME' --exclude '.nojekyll' \
  "$EXPORT_DIR"/ "$REPO_DIR"/docs/

# 4. Re-assert the files GitHub Pages needs that rsync --delete just removed.
echo "rhrroc.org" > "$REPO_DIR/docs/CNAME"
touch "$REPO_DIR/docs/.nojekyll"

# 5. Commit and push only if something actually changed.
cd "$REPO_DIR"
git add docs
if git diff --cached --quiet; then
  log "no changes to publish"
else
  git commit -m "Automated static site update from WordPress ($(date '+%Y-%m-%d %H:%M'))"
  git push origin main
  log "published update to origin/main"
fi
