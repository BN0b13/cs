#!/bin/bash

# Set S3 Bucket Names
CUSTOMER_BUCKET="my-customer-frontend"
ADMIN_BUCKET="my-admin-frontend"

# Navigate to the Customer Site & Build
cd /home/ubuntu/customer-frontend
npm install
npm run build
aws s3 sync build/ s3://$CUSTOMER_BUCKET --delete

# Navigate to the Admin Site & Build
cd /home/ubuntu/admin-frontend
npm install
npm run build
aws s3 sync build/ s3://$ADMIN_BUCKET --delete

# Invalidate CloudFront Cache (Replace with Your CloudFront Distribution IDs)
aws cloudfront create-invalidation --distribution-id XXXXXXXXXXXX --paths "/*"
aws cloudfront create-invalidation --distribution-id YYYYYYYYYYYY --paths "/*"

echo "Deployment to S3 Complete!"
