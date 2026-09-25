# RHR WordPress publishing

The editor is https://edit.rhrroc.org and the public site is https://rhrroc.org.

## Edit and publish

1. Sign in through Cloudflare, then WordPress.
2. Open Pages > Home. Edit text, images, and buttons directly in the visual block editor and save the page. Use List View to find each named section.
3. Use Site Settings for the donation link and contact details.
4. Preview the site. Open Simply Static > Generate and run an export.
5. After export succeeds, the Pi publisher validates the output and commits it to GitHub. GitHub Pages serves main/docs. Allow a few minutes for deployment.

Cloudflare's email rule permits the configured Gmail and organization domains. It does not create WordPress accounts. Add individual staff accounts with the Editor role; administrators control plugins and exports.

## Free components

WordPress, Secure Custom Fields, Simply Static, WP Mail SMTP Lite, Raspberry Pi Connect, Cloudflare Tunnel/Access, and GitHub Pages. No paid plugin license is required. Gmail sending needs its separate authentication setup.

## Server

Checkout: /home/pi/Refugees-Helping-Refugees
Compose directory: pi-server
Export directory: /home/pi/wp2static-export
Publisher state: /home/pi/.local/state/rhr-publisher
Initial database backup: /home/pi/rhr-backups/before-free-setup-20260925.sql

The custom mu-plugin routes requests for the exact editor origin to the existing private Docker WordPress service, without changing Cloudflare access or exposing a port. Install it into wp-content/mu-plugins when rebuilding from an empty WordPress volume. The poster assets originate in public/poster and are copied into the WordPress volume at /var/www/html/poster.

The old Next.js workflow is retained in pi-server/legacy, outside .github/workflows, so it cannot overwrite WordPress deployments. GitHub Pages is configured to serve the main branch's docs folder.

## Checks and recovery

Run bash pi-server/scripts/publish-watch.sh to publish a completed export manually. It refuses incomplete output, missing assets, private editor links, unexpected staged changes, and remote history divergence. It never force-pushes. Failed pushes retry on the next run.

Git retains previous public site versions. Revert the appropriate docs commit to roll back public content. Back up the WordPress database and uploads before upgrades; Git tracks generated output, not the editable database. The initial backup predates the migration.

## Installed Pi schedule

The pi user's crontab checks for completed exports every minute, runs due WordPress events every five minutes, and backs up the database and uploaded media daily at 03:15 in the Pi's timezone. Logs are in /home/pi/.local/state/rhr-publisher. Daily verified archives are in /home/pi/rhr-backups/daily and retained for 14 days. These are local backups; a Pi disk failure still requires an off-device backup. No paid backup service is connected.

Contact links follow the editable Site Settings email, phone, and address values. Gmail delivery uses WP Mail SMTP Lite, smtp.gmail.com, TLS port 587, and the account alanihamzah25@gmail.com; the current SMTP credentials failed authentication on 2026-09-25. The owner must replace the saved SMTP password with a valid Google app password and repeat the WP Mail SMTP email test. Never commit that password or the WordPress database to this public repository.

## Visual homepage editor
The Home page (ID 6) now uses native WordPress blocks. Open Pages > Home and click text or an image in the canvas to edit. The five named sections are available in List View. Save, preview, then run Simply Static > Generate to publish. The free scheduled publisher validates the completed export and pushes docs/ to GitHub Pages. The purple Single Push button requires Pro and is not needed.
Header/footer settings remain under Site Settings. The homepage location text is now editable in its own blocks; update Site Settings too when changing shared contact details. The map remains an embedded HTML block. The original field data and a database backup are retained for recovery.

## Verified deployment: 2026-09-25
The native-block homepage export completed at 14:46:11 UTC and the scheduled publisher pushed commit bf7f70a. GitHub Pages run 36149858124 succeeded. The public homepage, donation page, and multilingual poster page returned HTTP 200; 49 referenced local assets loaded; a missing route returned 404. Unauthenticated editor requests redirected to Cloudflare Access. The same-day database and content backups passed archive integrity checks.

Client onboarding remains pending the client email address. Cloudflare domain admission does not create WordPress accounts. A separate Editor account is required; administrators run the static export. SMTP delivery remains blocked on the owner entering a valid Gmail app password.
