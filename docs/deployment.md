# AutoMax POS Corporate Website Deployment

Production deployments target the cPanel-hosted website at:

https://automaxpos.com

The GitHub repository is the source of truth. Every successful push to `main`
runs the production deployment workflow:

Edit -> Validate -> Commit -> Push -> GitHub Actions -> Build -> Explicit FTPS upload -> Verify automaxpos.com

## Required GitHub Actions Secrets

Create these in:

`GitHub repository -> Settings -> Secrets and variables -> Actions -> New repository secret`

- `CPANEL_HOST`
  - Required.
  - FTP host for the Namecheap cPanel account.
  - Recommended value: `ftp.automaxpos.com`.

- `CPANEL_PORT`
  - Optional.
  - Explicit FTPS port.
  - Recommended value: `21`.
  - If omitted, the workflow defaults to `21`.

- `CPANEL_USERNAME`
  - Required.
  - FTP user with write access to the corporate document root.
  - Recommended value: `deploy@automaxpos.com`.

- `CPANEL_PASSWORD`
  - Required.
  - Password for the FTP account above.
  - Do not commit this value to the repository.

## Recommended cPanel Configuration

- Host: `ftp.automaxpos.com`
- Protocol: Explicit FTPS
- Port: `21`
- Username: `deploy@automaxpos.com`
- Target: `/public_html`

The corporate deployment does not use a secret-controlled remote directory. It always deploys the generated site to the FTP account root, which must be configured by cPanel to serve `/public_html` for `automaxpos.com`.

## Deployment Behavior

The workflow:

- builds the static website in GitHub Actions;
- runs validation and audit;
- aborts deployment if validation fails;
- fails immediately if required deployment secrets are missing;
- prints deployment diagnostics without printing the password;
- writes `deployment.json` into the production build for commit verification;
- uploads the generated `dist/` contents to `/public_html` over explicit FTPS;
- deletes obsolete generated corporate website files that are no longer in `dist/`;
- preserves `.htaccess`, `.well-known/`, `owner/`, `hospitality/`, and `cgi-bin/` on the server;
- verifies `https://automaxpos.com` returns HTTP 200;
- verifies `https://automaxpos.com/deployment.json` contains the deployed commit.

## Production Notes

The cPanel server is treated as a static file host. It does not need to run Git, Node.js, npm, or shell deployment scripts.

Keep `.htaccess` and SSL challenge files managed on the server unless they are intentionally added to this repository.

## Deployment Metadata

The workflow writes `dist/deployment.json` with:

- `commit`
- `branch`
- `deployed_at`
- `repository`
- `workflow_run`
- `version`
- `target_folder`: `/public_html`
- `method`: `ftps`

## Recovery After Root Overwrite

If `https://automaxpos.com` serves another AutoMax application, restore the corporate site by re-running this repository's production workflow after confirming the secrets above are set correctly. The workflow uploads the corporate `dist/` contents to `/public_html` and verifies that `deployment.json` contains the deployed corporate commit.

After recovery, verify:

1. `https://automaxpos.com` displays the AutoMax POS Corporate Website.
2. `https://automaxpos.com/deployment.json` reports `automaxpos-corporate-site`.
3. `target_folder` is `/public_html`.
4. `https://owner.automaxpos.com` still displays the AutoMax Owner Portal from `/public_html/owner`.
