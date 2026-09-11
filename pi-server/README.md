# RHR WordPress-on-Pi runbook

This turns your Raspberry Pi into an internal WordPress editor for
rhrroc.org. Editors log into WordPress through a Cloudflare Tunnel link;
when they hit "Publish", the site gets crawled to static HTML and pushed to
this repo's `docs/` folder, which is what GitHub Pages + Cloudflare already
serve at `https://rhrroc.org`. **The public hosting doesn't change at all** —
only how the content gets edited.

Run everything below directly on the Pi over SSH. Nothing here needs to run
on your Mac.

---

## 0. Pre-flight checks

```bash
uname -m
docker --version
docker compose version
docker ps -a
```

- `uname -m` must print `aarch64`. MariaDB 11 doesn't ship 32-bit/armhf images —
  if you're on 32-bit Raspberry Pi OS, either re-flash to the 64-bit OS first,
  or edit `docker-compose.yml` to pin `mariadb:10.6` instead of `mariadb:11.4`.
- `docker ps -a` — note whatever container/network names Beano already uses,
  so nothing collides. This stack uses the Compose project name `rhr`
  (already set via `name: rhr` at the top of `docker-compose.yml`), so
  `docker compose` commands here will never touch Beano's containers.

## 1. A deploy key so the Pi can push to GitHub

Do this once. It lets the Pi push straight to `main` without using your
personal GitHub credentials.

```bash
ssh-keygen -t ed25519 -C "rhr-pi-deploy" -f ~/.ssh/id_ed25519_rhr_deploy -N ""
cat ~/.ssh/id_ed25519_rhr_deploy.pub
```

Copy that public key, then in GitHub: **Refugees-Helping-Refugees/Refugees-Helping-Refugees
→ Settings → Deploy keys → Add deploy key** — name it "RHR Pi Publisher",
paste the key, and check **Allow write access**.

Then add this to `~/.ssh/config` on the Pi:

```
Host github-rhr-deploy
  HostName github.com
  User git
  IdentityFile ~/.ssh/id_ed25519_rhr_deploy
  IdentitiesOnly yes
```

## 2. Clone the repo onto the Pi

```bash
git clone github-rhr-deploy:Refugees-Helping-Refugees/Refugees-Helping-Refugees.git ~/rhr-site-repo
cd ~/rhr-site-repo/pi-server
cp .env.example .env
openssl rand -base64 24   # run twice, once per password below
nano .env                 # fill in MYSQL_ROOT_PASSWORD and MYSQL_PASSWORD,
                           # and double-check EDIT_HOSTNAME / WP2STATIC_EXPORT_DIR /
                           # CLOUDFLARED_CREDS_DIR match your actual Pi paths
```

## 3. Cloudflare Tunnel

```bash
mkdir -p ~/.cloudflared

docker run -it --rm -v ~/.cloudflared:/root/.cloudflared cloudflare/cloudflared:latest tunnel login
# opens a URL — authorize it against the rhrroc.org zone in your Cloudflare account

docker run --rm -v ~/.cloudflared:/root/.cloudflared cloudflare/cloudflared:latest tunnel create rhr-pi-tunnel
# note the printed Tunnel UUID

docker run --rm -v ~/.cloudflared:/root/.cloudflared cloudflare/cloudflared:latest tunnel route dns rhr-pi-tunnel edit.rhrroc.org
# creates the edit.rhrroc.org CNAME automatically in your existing zone

cp cloudflared/config.yml.example cloudflared/config.yml
nano cloudflared/config.yml   # paste the Tunnel UUID into BOTH places (tunnel: and credentials-file:)
```

## 4. Cloudflare Access — the "go to a link, log in" gate

Do this in a browser, before starting WordPress:

1. Go to <https://one.dash.cloudflare.com/> → Zero Trust (first time: pick any
   team name — the free plan covers well more than 3 users).
2. **Networks → Tunnels** — confirm `rhr-pi-tunnel` shows up (it should, from
   step 3).
3. **Access → Applications → Add an application → Self-hosted**
   - Application name: `RHR WordPress Editor`
   - Application domain: `edit.rhrroc.org` (leave the path blank — this
     covers `/wp-admin`, `/wp-login.php`, everything under the hostname)
   - Session duration: whatever you prefer (24h is reasonable)
4. **Add policy** → Action: **Allow** → Include → Emails → list each editor's
   address, one per line (KT, yourself, and whoever uses the "IT Computer").
5. Identity provider: leave **One-Time PIN** enabled. This is the actual
   "click a link, get an emailed code" flow — no account creation, no app
   install for your editors.
6. Save.

## 5. Bring the stack up

```bash
cd ~/rhr-site-repo/pi-server
docker compose up -d db wordpress cloudflared
docker compose logs -f cloudflared
```

Wait for a line like "Registered tunnel connection" then Ctrl-C out of the
logs. Now visit `https://edit.rhrroc.org` in a browser — **you should see the
Cloudflare Access email gate, not WordPress directly.** If you see raw
WordPress instead, stop and fix the Access application in step 4 before
continuing — that gate is the whole point.

## 6. Bootstrap WordPress (wp-cli, one time)

```bash
cd ~/rhr-site-repo/pi-server

docker compose --profile tools run --rm wpcli core install \
  --url="https://edit.rhrroc.org" \
  --title="Refugees Helping Refugees" \
  --admin_user="hamzah_admin" \
  --admin_password="CHANGE-ME-TO-A-STRONG-PASSWORD" \
  --admin_email="alanihamzah25@gmail.com" \
  --skip-email

docker compose --profile tools run --rm wpcli option update permalink_structure '/%postname%/'
docker compose --profile tools run --rm wpcli rewrite flush

docker compose --profile tools run --rm wpcli theme activate rhr-theme

docker compose --profile tools run --rm wpcli plugin install advanced-custom-fields wp-mail-smtp wp2static --activate

docker compose --profile tools run --rm wpcli user create kt kt@example.com --role=editor --user_pass='CHANGE-ME-TEMP-PASSWORD-1'
docker compose --profile tools run --rm wpcli user create itcomputer it@example.com --role=editor --user_pass='CHANGE-ME-TEMP-PASSWORD-2'
```

Replace the emails/passwords above with the real editor addresses (the ones
you added to the Access policy in step 4). Then, in `wp-admin` itself:

- **Set the homepage**: Settings → Reading → "A static page" → set both
  Homepage and (leave Posts page blank) so `front-page.php` is used — WordPress
  needs at least one Page to exist first; create one (any title, e.g. "Home")
  and select it.
- **WP Mail SMTP**: Settings → WP Mail SMTP → configure with a real mailbox
  (e.g. a Gmail app password) so password-reset emails actually send. This
  needs a real secret, so it's done by hand here, not scripted.
- **WP2Static add-on**: Settings → WP2Static → Add-ons — install whichever
  "Local/Folder Deploy" add-on is listed there (the exact plugin slug shifts
  between WP2Static releases, which is why this isn't scripted above).

## 7. Configure WP2Static

In `wp-admin → Settings → WP2Static`:

- **General**: WP Site URL = `https://edit.rhrroc.org`.
  **Destination URL = `https://rhrroc.org`** — this is the single most
  important setting in this whole setup. If it's wrong or blank, the
  published site will contain links pointing back at the internal,
  Access-gated `edit.rhrroc.org` instead of the public site, and it will look
  broken to visitors.
- **Deploy**: method = the Local/Folder deploy add-on installed in step 6;
  target path = `/var/www/html/wp2static-export` (this is the in-container
  path — it's bind-mounted to the `WP2STATIC_EXPORT_DIR` you set in `.env`,
  so the files land on the Pi's real filesystem too).
- Click **Process Queue** / **Crawl Site** once by hand and confirm files
  actually appear in your `WP2STATIC_EXPORT_DIR` on the Pi (`ls` it).

## 8. Wire up the publish script

```bash
sudo mkdir -p "$(grep WP2STATIC_EXPORT_DIR ~/rhr-site-repo/pi-server/.env | cut -d= -f2)"
sudo chown -R www-data:www-data "$(grep WP2STATIC_EXPORT_DIR ~/rhr-site-repo/pi-server/.env | cut -d= -f2)"
sudo usermod -aG www-data "$USER"
# log out and back in for the group change to take effect

chmod +x ~/rhr-site-repo/pi-server/scripts/publish-watch.sh
REPO_DIR=~/rhr-site-repo EXPORT_DIR="$(grep WP2STATIC_EXPORT_DIR ~/rhr-site-repo/pi-server/.env | cut -d= -f2)" \
  ~/rhr-site-repo/pi-server/scripts/publish-watch.sh
# check it worked:
cd ~/rhr-site-repo && git log -1 && git status
```

If that manual run produces a new commit that reaches GitHub, wire it to
cron so future "Publish" clicks go out automatically:

```bash
mkdir -p ~/logs
crontab -e
```

Add (adjust the paths if yours differ from the defaults in the script):

```
*/10 * * * * REPO_DIR=/home/YOUR_USER/rhr-site-repo EXPORT_DIR=/home/YOUR_USER/wp2static-export /home/YOUR_USER/rhr-site-repo/pi-server/scripts/publish-watch.sh >> /home/YOUR_USER/logs/publish.log 2>&1
```

## 9. Verify end-to-end

1. Log into `https://edit.rhrroc.org/wp-admin` as an editor, change some
   text on the homepage (an ACF field under the page editor, or Site
   Settings for the donate button/contact info), and Update the page.
2. Wait for the next cron tick (or re-run `publish-watch.sh` by hand).
3. Check `~/logs/publish.log` for "published update to origin/main".
4. Open `https://rhrroc.org` in a normal browser (not logged into Access)
   and confirm the change is live, and that every link/asset resolves to
   `rhrroc.org`, not `edit.rhrroc.org`.

---

## Ongoing maintenance

- **Updates**: `docker compose --profile tools run --rm wpcli core update`
  and `... plugin update --all` periodically. Cloudflare Access controls
  *who* can reach wp-login, not WordPress's own patch level.
- **Backups**: the git-published `docs/` folder is a snapshot of rendered
  output, not of the editable WordPress state. Periodically back up the
  database (`docker compose --profile tools run --rm wpcli db export -`)
  and `wp-content/uploads` (inside the `wp_data` volume) somewhere off the
  Pi. If the SD card dies, `rhrroc.org` keeps serving from GitHub Pages
  regardless — you'd only lose the ability to edit until this is restored.
- **Beano coexistence**: this stack's Compose project name is `rhr` — always
  double check which project a `docker compose down` targets before running
  it on a Pi that also runs Beano.
