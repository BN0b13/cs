#! /bin/bash

echo "Pulling latest git branch"
git reset --hard
git pull origin main
echo "Building Backend"
cd ./backend
source ./build.sh
cd ..
echo "Building Frontend"
cd ./frontend
source ./build.sh $1
cd ..
echo "Building Admin"
cd ./admin
source ./build.sh $1
cd ..