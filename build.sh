#!/bin/bash

# Clear local git changes, if any
git reset --hard
# Pull new changes to frontend main
git pull origin main;
# Install any new npm packages
npm install
# Build React app with said copy
npm run build;
# Print completion message
echo "CosmicStrains.com Frontend start-up script successfully completed."