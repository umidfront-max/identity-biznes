#!/bin/sh
set -e

echo "Deploying application"

echo "Installing npm packages"
npm ci

echo "Running build"
npm run build:vite

echo "Deployed application"
