# RHR WordPress publishing

The editor is https://edit.rhrroc.org and the public site is https://rhrroc.org.

## Edit and publish

1. Sign in through Cloudflare, then WordPress.
2. Open Pages > Home. Edit the Front Page Content fields and save the page.
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
