#!/bin/bash

# Install boto3 for backend
echo "Installing boto3..."
pip install boto3

# Build and deploy backend using SAM
echo "Building and deploying backend with SAM..."
cd ~/environment/backend || exit
sam build
sam deploy

# After deployment is finished, continue with scripts
echo "Populating pets table, adoptions table, and pets interest table"
cd ~/environment/backend/scripts || exit
python populate_pets_table.py
python populate_adoptions_table.py
python populate_pets_interest_table.py

echo "Creating pets images bucket and report bucket in s3..."

python create_images_bucket.py
python create_report_bucket.py

echo "Setup complete!"
