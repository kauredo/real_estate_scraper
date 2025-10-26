#!/bin/bash

# Scale Down Staging Environment Script
# This script scales down both the staging app and database to 0

echo "🛑 Scaling down staging environment..."

# Scale down the staging app (web and worker groups)
echo "Scaling down sofia-galvao-group-staging app..."
echo "  - Scaling web group to 0..."
fly scale count web=0 -a sofia-galvao-group-staging
echo "  - Scaling worker group to 0..."
fly scale count worker=0 -a sofia-galvao-group-staging

if [ $? -eq 0 ]; then
    echo "✅ Staging app scaled down successfully"
else
    echo "❌ Failed to scale down staging app"
    exit 1
fi

# Scale down the staging database
echo "Scaling down sofia-galvao-group-staging-db database to 0..."
fly scale count 0 -a sofia-galvao-group-staging-db

if [ $? -eq 0 ]; then
    echo "✅ Staging database scaled down successfully"
else
    echo "❌ Failed to scale down staging database"
    exit 1
fi

echo "🎉 Staging environment fully scaled down!"
echo "💰 You're now saving on compute costs"