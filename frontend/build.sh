#!/bin/bash

# Install any new npm packages
npm install

if [ $1 = "pi" ]
then
    npm run build:pi;
else
    npm run build;
fi

# Print completion message
echo "CosmicStrains.com Frontend start-up script successfully completed."