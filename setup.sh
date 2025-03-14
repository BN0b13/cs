#!/bin/bash

set -e  # Exit script immediately on error

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

echo "Setting up environment: $ENV"

# Function to copy config files
copy_config_files() {
    cp "./config/admin/$ENV.router.js" "./admin/src/config/router.js"
    cp "./config/frontend/$ENV.router.js" "./frontend/src/config/router.js"
    cp "./config/cms.js" "./admin/src/config/cms.js"
    cp "./config/cms.js" "./frontend/src/config/cms.js"
    rsync -av --delete "./config/admin/img/" "./admin/src/assets/img/custom/"
    rsync -av --delete "./config/frontend/img/" "./frontend/src/assets/img/custom/"
}

# Copy config files
copy_config_files

# If the environment is local, exit the script
if [ "$ENV" == "local" ]; then
    echo "Local setup completed."
    exit 0
fi

# Determine the correct Git branch
GIT_BRANCH="main"
if [ "$ENV" == "dev" ]; then
    GIT_BRANCH="develop"
fi

# Pull the latest changes from the correct branch
echo "Pulling latest changes from '$GIT_BRANCH' branch..."
if git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
    git checkout "$GIT_BRANCH"
    git pull origin "$GIT_BRANCH" || { echo "Git pull failed!"; exit 1; }
    echo "Git pull successful for '$GIT_BRANCH' branch."
else
    echo "Error: This directory is not a Git repository. Skipping Git pull."
fi

# Backend Setup
setup_backend() {
    echo "Updating backend..."
    cd ./backend
    npm install
    npm run migrate
    npm run seed  # Removed sudo; ensure correct user permissions
    pm2 restart all --time
    echo "Backend updated successfully."
    cd - > /dev/null  # Return to previous directory
}

setup_backend

# Set up frontend apps
setup_frontend() {
    local app=$1
    local dest="/var/www/$ENV/$app"
    
    echo "Setting up $app frontend..."
    
    # Use rsync for efficient syncing
    rsync -av --delete "./$app/" "$dest/"

    cd "$dest"
    npm install
    npm run build
    echo "$app build script successfully completed."
    cd - > /dev/null
}

# Move & build frontend apps
setup_frontend "frontend"
setup_frontend "admin"

echo "All $ENV setup tasks completed successfully."