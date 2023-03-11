#!/bin/bash

# Pull latest copy of main
git pull origin main;
# Build React app with said copy
npm run build;
# Restart Nginx to reflect new changes 
systemctl restart nginx;