#!/bin/bash

# Clear local git changes, if any
git reset --hard
# Pull new changes to frontend main
git pull origin main;
# Copy frontend into /var/www dir

# CD into frontend dir
cd /var/www/
# Install any new npm packages
npm install
# Build React app with said copy
npm run build;
# Print completion message
echo "CosmicStrains.com Frontend start-up script successfully completed."
# CD back to main dir
cd ~/cosmicStrains