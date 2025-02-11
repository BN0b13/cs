#!/bin/bash

# Reset git branch
git reset --hard
# Pull changes
git pull origin main
# Copy Frontend to NGINX www dir
cp -r ./frontend /var/www
# Copy Admin to NGINX www dir
cp -r ./admin /var/www
# Change Dir to copy of frontend
cd /var/www/frontend
# Install any new npm packages
npm install
# Build React app with said copy
npm run build;
# Print completion message
echo "cosmicstrains.com build script successfully completed."
# Change Dir to copy of admin
cd /var/www/admin
# Install any new npm packages
npm install
# Build React app with said copy
npm run build;
# Print completion message
echo "admin.cosmicstrains.com build script successfully completed."
# CD back to main dir
cd /home/bnoble/cs/backend
# Install any new npm packages
npm install
# Spin up DB, if not already up
sudo npm run up
# Check DB Migrations
npm run migrate
# Check seeder
sudo npm run seed
# Restart PM2
pm2 restart all --time
# Print completion message
echo "api.cosmicstrains.com updated correctly"