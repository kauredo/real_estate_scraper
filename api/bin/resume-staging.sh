#!/bin/bash

# Scale Up Staging Environment Script
# This script scales up both the staging database and app

echo "🚀 Scaling up staging environment..."

# Scale up the staging database first
echo "Scaling up sofia-galvao-group-staging-db database to 1..."
fly scale count 1 -a sofia-galvao-group-staging-db

if [ $? -eq 0 ]; then
    echo "✅ Staging database scaled up successfully"
else
    echo "❌ Failed to scale up staging database"
    exit 1
fi

# Wait a moment for the database to be ready
echo "⏳ Waiting for database to be ready..."
sleep 10

# Scale up the staging app (web and worker groups)
echo "Scaling up sofia-galvao-group-staging app..."
echo "  - Scaling web group to 1..."
fly scale count web=1 -a sofia-galvao-group-staging
echo "  - Scaling worker group to 1..."  
fly scale count worker=1 -a sofia-galvao-group-staging

if [ $? -eq 0 ]; then
    echo "✅ Staging app scaled up successfully"
else
    echo "❌ Failed to scale up staging app"
    exit 1
fi

# Wait for app to be fully ready
echo "⏳ Waiting for app to be fully ready..."
sleep 15

# Check the status
echo "📊 Checking staging app status..."
fly status -a sofia-galvao-group-staging

echo "🎉 Staging environment is now running!"
echo "🌐 Your staging app should be available shortly"