#!/usr/bin/env bash
set -euo pipefail
cd /home/pi/Refugees-Helping-Refugees/pi-server
exec 200>/home/pi/.local/state/rhr-publisher/maintenance.lock
flock -n 200 || exit 0
docker compose --profile tools run --rm -T --user 33:33 -e WP_CLI_CACHE_DIR=/tmp/wp-cli-cache wpcli --url=https://edit.rhrroc.org cron event run --due-now
