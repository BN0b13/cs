server {
    root ~/cs/admin/build;

    server_name admin.cosmicstrains.com;
    location / {
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    listen 443 ssl; # managed by Certbot
    ssl_certificate /etc/letsencrypt/live/admin.cosmicstrains.com/fullchain.pem; # managed by Certbot
    ssl_certificate_key /etc/letsencrypt/live/admin.cosmicstrains.com/privkey.pem; # managed by Certbot
    include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
    ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
}

server {
if ($host = admin.cosmicstrains.com) {
return 301 https://$host$request_uri;
}

server_name admin.cosmicstrains.com;

listen 80;

return 301 https://$host$request_uri;


}
