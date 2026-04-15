# PropertyFinder — cPanel Deployment Guide

## Prerequisites
- cPanel with Node.js support (CloudLinux / "Setup Node.js App")
- SSH access to the server
- Domain property-finder.co.za pointed to the cPanel server

## Step-by-Step Deployment

### 1. Create the deployment archive
Run on your local machine:
```bash
cd /tmp/pf-next
tar czf pf-next-deploy.tar.gz \
  .next/standalone/ \
  .next/static/ \
  public/ \
  messages/ \
  data/ \
  .env.local \
  .htaccess \
  package.json \
  server.js
```

### 2. Upload to cPanel
Upload `pf-next-deploy.tar.gz` to cPanel via:
- File Manager → `/home/YOUR_USER/property-finder.co.za/` (document root)
- Or via SSH: `scp pf-next-deploy.tar.gz user@server:~/property-finder.co.za/`

### 3. Extract on server
```bash
cd ~/property-finder.co.za
tar xzf pf-next-deploy.tar.gz
```

### 4. Copy static assets into standalone
```bash
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public
cp -r messages .next/standalone/messages
mkdir -p .next/standalone/data/agreements
mkdir -p .next/standalone/data/valuations
```

### 5. Set up Node.js App in cPanel
1. Go to cPanel → "Setup Node.js App"
2. Click "Create Application"
3. Settings:
   - Node.js version: 18.x or 20.x
   - Application mode: Production
   - Application root: property-finder.co.za
   - Application URL: property-finder.co.za
   - Application startup file: `.next/standalone/server.js`
4. Environment variables:
   - `SENDGRID_API_KEY` = `YOUR_SENDGRID_API_KEY_HERE`
   - `NODE_ENV` = `production`
   - `PORT` = (auto-assigned by cPanel)
5. Click "Create"

### 6. Install dependencies (in cPanel terminal)
```bash
cd ~/property-finder.co.za/.next/standalone
npm install
```

### 7. Restart the app
Click "Restart" in the Node.js App panel, or via SSH:
```bash
touch ~/property-finder.co.za/tmp/restart.txt
```

### 8. Verify
Visit https://property-finder.co.za — you should see the PropertyFinder homepage.

## Updating
When you make changes:
1. Build locally: `npm run build`
2. Re-create the archive (step 1)
3. Upload & extract (steps 2-3)
4. Copy static assets (step 4)
5. Restart the Node.js app (step 7)

## Troubleshooting
- **502 Bad Gateway**: Check Node.js app is running in cPanel
- **Blank page**: Ensure `.next/static` was copied into `.next/standalone/.next/static`
- **Missing translations**: Ensure `messages/` was copied into `.next/standalone/`
- **Emails not sending**: Verify `SENDGRID_API_KEY` env var is set in cPanel
