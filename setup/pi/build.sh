#!/bin/bash

# Ensure script is executed with an environment argument
if [ -z "$1" ]; then
    echo "Usage: $0 <environment>"
    echo "Valid options: prod, dev, local"
    exit 1
fi

# Assign the first argument to a variable
ENV=$1

# Validate environment input
if [[ "$ENV" != "prod" && "$ENV" != "dev" && "$ENV" != "local" ]]; then
    echo "Invalid environment: $ENV"
    echo "Valid options: prod, dev, local"
    exit 1
fi

echo Settup up Environment $ENV
# Update to correct config file for enviroment
cp ./config/admin/$ENV.config.js ./admin/src/config.js
cp ./config/frontend/$ENV.config.js ./frontend/src/config.js

# If the environment is local, exit the script
if [ "$ENV" == "local" ]; then
    echo "Local set up completed."
    exit 0
fi

# Determine the correct Git branch to pull
GIT_BRANCH="main"  # Default to 'main' for prod
if [ "$ENV" == "dev" ]; then
    GIT_BRANCH="develop"
fi

# Pull the latest changes from the correct branch
echo "Pulling latest changes from '$GIT_BRANCH' branch..."
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    git fetch origin
    git checkout "$GIT_BRANCH"
    git pull origin "$GIT_BRANCH"
    echo "Git pull successful for '$GIT_BRANCH' branch."
else
    echo "Error: This directory is not a Git repository. Skipping Git pull."
fi
# Update Config files
cp ./config/admin/$ENV.config.js ./admin/src/config.js
cp ./config/frontend/$ENV.config.js ./frontend/src/config.js
# Update backend
cd ./backend
# Install any new npm packages
npm install
# Check DB Migrations
npm run migrate
# Check seeder
sudo npm run seed
# Restart PM2
pm2 restart all --time
# Print completion message
echo "Backend updated correctly"
# Change Dir back to app root
cd /home/bnoble/$ENV/cs
# Copy Frontend to NGINX www dir
cp -r ./frontend /var/www/$ENV/
# Copy Admin to NGINX www dir
cp -r ./admin /var/www/$ENV/
# Change Dir to copy of frontend
cd /var/www/$ENV/frontend
# Install any new npm packages
npm install
# Build React app with said copy
npm run build;
# Print completion message
echo "Frontend build script successfully completed."
# Change Dir to copy of admin
cd /var/www/$ENV/admin
# Install any new npm packages
npm install
# Build React app with said copy
npm run build;
# Print completion message
echo "Admin build script successfully completed."