#!/bin/bash

# Pull new changes to frontend main
git pull origin main;
# Build React app with said copy
npm run build;
# Navigate to backend dir
cd ~/server/cs-backend
# Stop PM2
pm2 stop 4
# Pull new changes to backend main
git pull origin main
# Restart PM2
pm2 start 4
# Restart Nginx to reflect new changes 
systemctl restart nginx;