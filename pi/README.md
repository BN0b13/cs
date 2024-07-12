## RASPBERRY PI SET-UP

# Command to see what GPIO pins are assigned what internal number
cat /sys/kernel/debug/gpio

# Allow Bash Script to run
chmod +x pi.sh
chmod +x nginx.sh



## NOTES

# How to runanother bash script
source ./nginx/nginx.sh $1

# How to make a prompt
while true; do
    read -p "Do you wish to install this program? " yn
    case $yn in
        [Yy]* ) echo "user entered yes"; break;;
        [Nn]* ) echo "user entered no";exit;;
        * ) echo "Please answer yes or no.";;
    esac
done