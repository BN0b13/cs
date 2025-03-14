#!/bin/bash

# Update & Upgrade System
sudo apt update -y && sudo apt upgrade -y

# Install Node.js & NPM
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs
npm install -g pm2

# Install PostgreSQL
sudo apt install -y postgresql postgresql-contrib
sudo systemctl enable postgresql
sudo systemctl start postgresql

# Secure PostgreSQL (change 'mysecurepassword' to a real password)
sudo -u postgres psql -c "ALTER USER postgres PASSWORD 'mysecurepassword';"

# Install Redis
sudo apt install -y redis-server
sudo systemctl enable redis
sudo systemctl start redis

# Allow Firewall Rules (Adjust as Needed)
sudo ufw allow OpenSSH
sudo ufw allow 5432  # PostgreSQL
sudo ufw allow 6379  # Redis
sudo ufw enable

# Set Up Auto Updates
sudo apt install -y unattended-upgrades
sudo dpkg-reconfigure -plow unattended-upgrades

echo "EC2 Setup Complete!"
