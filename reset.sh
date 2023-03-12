#!/bin/bash

# Delete the node_modules dir
rm -r node_modules;
# Delete the package-lock.json
rm -r package-lock.json;
# Pull new changes to frontend main
git pull origin main;
# Install any new npm packages
npm install;
# Build React app with said copy
npm run build;
# Print completion message
echo "CosmicStrains.com Frontend reset script successfully completed."