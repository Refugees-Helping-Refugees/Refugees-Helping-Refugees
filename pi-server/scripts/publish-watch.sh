#!/usr/bin/env bash
set -euo pipefail
REPO_DIR=/home/pi/Refugees-Helping-Refugees
COMPOSE_DIR="$REPO_DIR/pi-server"
EXPORT_DIR=/home/pi/wp2static-export
STATE_DIR=/home/pi/.local/state/rhr-publisher
mkdir -p "$STATE_DIR"
exec 200>"$STATE_DIR/publish.lock"
flock -n 200 || exit 0
cd "$COMPOSE_DIR"
wp() { docker compose --profile tools run --rm -T --user 33:33 -e WP_CLI_CACHE_DIR=/tmp/wp-cli-cache wpcli --url=https://edit.rhrroc.org "$@"; }
status() { wp eval '$o=Simply_Static\Options::instance(); $log=$o->get("archive_status_messages"); if(Simply_Static\Plugin::instance()->is_export_active() || empty($log["done"]) || !$o->get("archive_end_time")){exit(2);} echo $o->get("archive_start_time")."|".$o->get("archive_end_time");'; }
export_id="$(status)" || exit 0
if [[ -f "$STATE_DIR/published" && "$(cat "$STATE_DIR/published")" == "$export_id" ]]; then exit 0; fi
stage="$(mktemp -d "$STATE_DIR/staging.XXXXXX")"
trap 'rm -rf "$stage"' EXIT
rsync -rlt --safe-links "$EXPORT_DIR/" "$stage/"
python3 "$COMPOSE_DIR/scripts/validate-export.py" "$stage"
[[ "$(status)" == "$export_id" ]] || { echo 'Export changed during copy; retry later.' >&2; exit 1; }
printf '%s\n' 'rhrroc.org' > "$stage/CNAME"
touch "$stage/.nojekyll"
cd "$REPO_DIR"
[[ "$(git branch --show-current)" == main ]] || { echo 'Publisher requires main.' >&2; exit 1; }
git diff --cached --quiet || { echo 'Unrelated staged changes; refusing to commit.' >&2; exit 1; }
git fetch origin main
git merge-base --is-ancestor origin/main HEAD || { echo 'Remote main advanced; reconcile before publishing.' >&2; exit 1; }
rsync -rlt --delete "$stage/" "$REPO_DIR/docs/"
git add -- docs
if ! git diff --cached --quiet; then git commit -m "Publish completed WordPress export" -- docs; fi
git push origin HEAD:main
printf '%s\n' "$export_id" > "$STATE_DIR/published"
echo "Published export $export_id"
