#!/bin/bash

# Copy Frontend to NGINX www dir
cp -r ./frontend /var/www
# Change Dir to copy of frontend
cd /var/www/frontend
# Install any new npm packages
npm install
# Build React app with said copy
npm run build;
# Print completion message
echo "cosmicstrains.com build script successfully completed."
# CD back to main dir
cd ~/cosmicStrains

# Copy Admin to NGINX www dir
cp -r ./admin /var/www
# Change Dir to copy of frontend
cd /var/www/admin
# Install any new npm packages
npm install
# Build React app with said copy
npm run build;
# Print completion message
echo "admin.cosmicstrains.com build script successfully completed."
# CD back to main dir
cd ~/cosmicStrains