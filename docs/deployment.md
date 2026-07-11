# AutoMax POS Corporate Website Deployment

Production deployments target the cPanel-hosted website at:

https://automaxpos.com

The GitHub repository is the source of truth. Every successful push to `main`
runs the production deployment workflow:

Edit -> Validate -> Commit -> Push -> GitHub Actions -> Deploy to cPanel -> Verify automaxpos.com

## Required GitHub Actions Secrets

Create these in:

`GitHub repository -> Settings -> Secrets and variables -> Actions -> New repository secret`

- `CPANEL_HOST`
  - The SSH hostname for the hosting account.
  - Obtain from cPanel, hosting welcome email, or the hosting provider's SSH/Terminal or FTP Accounts page.

- `CPANEL_PORT`
  - The SSH port.
  - For the current Namecheap Stellar Plus account, use `21098`.

- `CPANEL_USERNAME`
  - The cPanel or SSH username with access to the production website directory.

- `CPANEL_SSH_PRIVATE_KEY`
  - The private key authorized for SSH access to the cPanel account.
  - Store the full private key value, including the `BEGIN` and `END` lines.
  - Do not commit this value to the repository.

- `CPANEL_SSH_PASSPHRASE`
  - Optional.
  - Required only when the private key is protected by a passphrase.

- `CPANEL_REMOTE_PATH`
  - The remote Git checkout directory that serves `https://automaxpos.com`.
  - For the current production plan, this is expected to be `/home/autosyyh/public_html` or the exact domain document root from cPanel.

## Required Server Setup

The cPanel document root must contain a Git checkout of:

`https://github.com/automaxpos-cloud/automaxpos-corporate-site`

The workflow runs this sequence on the server:

```bash
cd "$CPANEL_REMOTE_PATH"
git fetch origin main
git reset --hard origin/main
npm install # only when node_modules is missing
npm run build
rsync dist/ ./ # preserves .git, source files, node_modules, .htaccess, and .well-known
```

The final `rsync` publishes the generated static files to the document root while preserving the server-side Git checkout and cPanel configuration files.

## Deployment Behavior

The workflow:

- builds the static website;
- runs validation and audit;
- aborts deployment if validation fails;
- writes `deployment.json` into the production build for commit verification;
- publishes the generated `dist/` contents into the document root;
- deletes obsolete generated website files that are no longer in `dist/`;
- preserves `.git`, source folders, `node_modules`, `.htaccess`, and `.well-known/` on the server;
- verifies `https://automaxpos.com` returns HTTP 200;
- verifies `https://automaxpos.com/deployment.json` contains the deployed commit.

## Production Notes

Keep `.htaccess` and SSL challenge files managed on the server unless they are intentionally added to this repository.
