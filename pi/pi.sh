#!/bin/bash

## Raspberry Pi set-up

# Check argument
if [[ "$#" -eq 0 ]] || [[ $1 != *"."* ]];
    then echo Please enter in a valid url as an argument.
    exit
fi

if [[ $1 = "www."* ]];
    then echo Please remove www from the url.
    exit
fi

# Update Raspberry Pi
sudo apt update -y
sudo apt upgrade -y

# Node
echo Installing Node
sudo apt install -y ca-certificates curl gnupg
sudo curl -fsSL https://deb.nodesource.com/gpgkey/nodesource-repo.gpg.key | sudo gpg --dearmor -o /usr/share/keyrings/nodesource.gpg
NODE_MAJOR=20
sudo echo "deb [signed-by=/usr/share/keyrings/nodesource.gpg] https://deb.nodesource.com/node_$NODE_MAJOR.x nodistro main" | sudo tee /etc/apt/sources.list.d/nodesource.list
sudo apt update -y
sudo apt install nodejs -y
sudo apt install build-essential

# Docker
echo Installing Docker
sudo apt-get update
sudo apt-get install ca-certificates curl
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/debian/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/debian \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update -y
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# Docker-Compose
echo Installing Docker-Compose
sudo curl -L https://github.com/docker/compose/releases/download/v2.23.3/docker-compose-`uname -s`-`uname -m` > docker-compose
sudo mv docker-compose /usr/bin/
sudo chown root: /usr/bin/docker-compose
sudo chmod +x /usr/bin/docker-compose

# Set up sites
cd ~/cs
source ./build.sh
cd ~/cs/pi

# PM2
echo Installing PM2
sudo npm install -g pm2
pm2 startup
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u bnoble --hp /home/bnoble
cd ~/cs/backend
sudo pm2 start app.js --name $1 --time
sudo pm2 save

# NGINX
# cd ~/cs/pi/nginx
# source ./nginx.sh $1
## OR
sudo apt remove apache2
sudo apt install nginx -y
sudo systemctl start nginx

sudo reboot