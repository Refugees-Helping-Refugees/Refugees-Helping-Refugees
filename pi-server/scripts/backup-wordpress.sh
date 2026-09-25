#!/usr/bin/env bash
set -euo pipefail
umask 077
cd /home/pi/Refugees-Helping-Refugees/pi-server
mkdir -p /home/pi/rhr-backups/daily
stamp=$(date +%F)
docker compose exec -T db sh -c 'exec mariadb-dump --single-transaction -u"$MYSQL_USER" -p"$MYSQL_PASSWORD" "$MYSQL_DATABASE"' | gzip > /home/pi/rhr-backups/daily/database-$stamp.sql.gz.tmp
gzip -t /home/pi/rhr-backups/daily/database-$stamp.sql.gz.tmp
mv /home/pi/rhr-backups/daily/database-$stamp.sql.gz.tmp /home/pi/rhr-backups/daily/database-$stamp.sql.gz
docker compose exec -T wordpress tar czf - -C /var/www/html/wp-content uploads mu-plugins > /home/pi/rhr-backups/daily/content-$stamp.tar.gz.tmp
tar tzf /home/pi/rhr-backups/daily/content-$stamp.tar.gz.tmp >/dev/null
mv /home/pi/rhr-backups/daily/content-$stamp.tar.gz.tmp /home/pi/rhr-backups/daily/content-$stamp.tar.gz
find /home/pi/rhr-backups/daily -type f -mtime +14 -name '*.gz' -delete
echo "Verified WordPress backup $stamp"
