# AutoMax POS Corporate Website Deployment

Production deployments target the cPanel-hosted website at:

https://automaxpos.com

The GitHub repository is the source of truth. Every successful push to `main`
runs the production deployment workflow:

Edit -> Validate -> Commit -> Push -> GitHub Actions -> Build -> SFTP upload -> Verify automaxpos.com

## Required GitHub Actions Secrets

Create these in:

`GitHub repository -> Settings -> Secrets and variables -> Actions -> New repository secret`

- `CPANEL_HOST`
  - The SFTP hostname for the hosting account.
  - Current production value: `premium176.web-hosting.com`.

- `CPANEL_PORT`
  - The SFTP port.
  - Current Namecheap Stellar Plus value: `21098`.

- `CPANEL_USERNAME`
  - The cPanel or SFTP username with access to the production website directory.
  - Current production username: `autosyyh`.

- `CPANEL_PASSWORD`
  - The SFTP password for the cPanel account.
  - Do not commit this value to the repository.

- `CPANEL_REMOTE_PATH`
  - The remote directory that serves `https://automaxpos.com`.
  - Current production value: `/home/autosyyh/public_html`.

## Deployment Behavior

The workflow:

- builds the static website in GitHub Actions;
- runs validation and audit;
- aborts deployment if validation fails;
- writes `deployment.json` into the production build for commit verification;
- uploads the generated `dist/` contents to `/home/autosyyh/public_html` over SFTP;
- deletes obsolete generated website files that are no longer in `dist/`;
- preserves `.htaccess` and `.well-known/` on the server;
- verifies `https://automaxpos.com` returns HTTP 200;
- verifies `https://automaxpos.com/deployment.json` contains the deployed commit.

## Production Notes

The cPanel server is treated as a static file host. It does not need to run Git,
Node.js, npm, or shell deployment scripts.

Keep `.htaccess` and SSL challenge files managed on the server unless they are intentionally added to this repository.
