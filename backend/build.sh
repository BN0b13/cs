#!/bin/bash

# Install any new npm packages
npm install
# Set up database
npm run up
npm run migrate
npm run seed
# Print completion message
echo "CosmicStrains.com Backend build script successfully completed."