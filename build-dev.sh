#!/bin/bash

# Reset git branch
git reset --hard
# Pull changes
git pull origin develop
# Copy Frontend to NGINX www dir
cp -r ./frontend /var/www/dev
# Copy Admin to NGINX www dir
cp -r ./admin /var/www/dev
# Change Dir to copy of frontend
cd /var/www/dev/frontend
# Install any new npm packages
npm install
# Build React app with said copy
npm run build;
# Print completion message
echo "dev.cosmicstrains.com build script successfully completed."
# Change Dir to copy of admin
cd /var/www/dev/admin
# Install any new npm packages
npm install
# Build React app with said copy
npm run build;
# Print completion message
echo "dev.admin.cosmicstrains.com build script successfully completed."
# CD back to main dir
cd /home/bnoble/dev/cs/backend
# Install any new npm packages
npm install
# Restart PM2
pm2 restart all --time
# Print completion message
echo "dev.api.cosmicstrains.com updated correctly"