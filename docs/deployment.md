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
  - The SFTP hostname for the hosting account.
  - Obtain from cPanel, hosting welcome email, or the hosting provider's FTP/SFTP Accounts page.

- `CPANEL_PORT`
  - The SFTP port, usually `22`.
  - If the host only supports FTPS, use the provider's FTPS details and update the workflow protocol before deployment.

- `CPANEL_USERNAME`
  - The cPanel or SFTP username with access to the production website directory.

- `CPANEL_PASSWORD`
  - The matching SFTP password.
  - Do not commit this value to the repository.

- `CPANEL_REMOTE_PATH`
  - The remote directory that serves `https://automaxpos.com`.
  - Common values are `/public_html`, `/home/<cpanel-user>/public_html`, or a domain-specific document root.

## Deployment Behavior

The workflow:

- builds the static website;
- runs validation and audit;
- aborts deployment if validation fails;
- writes `deployment.json` into the production build for commit verification;
- uploads only the generated `dist/` contents;
- deletes obsolete remote files that are no longer in `dist/`;
- preserves `.htaccess` and `.well-known/` on the server;
- verifies `https://automaxpos.com` returns HTTP 200;
- verifies `https://automaxpos.com/deployment.json` contains the deployed commit.

## Production Notes

Keep `.htaccess` and SSL challenge files managed on the server unless they are intentionally added to this repository.
