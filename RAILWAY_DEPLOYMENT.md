# Railway Deployment Guide for Egy Sun Tours

This guide provides step-by-step instructions for deploying both the Django backend and Next.js frontend of Egy Sun Tours on Railway.

## Prerequisites

1. [Railway Account](https://railway.app/)
2. [Railway CLI](https://docs.railway.app/develop/cli) (optional but recommended)
3. Git repository with your project code

## Deployment Process Overview

We'll be deploying two separate services on Railway:
1. Django Backend API
2. Next.js Frontend

## 1. Django Backend Deployment

### Step 1: Create a new project in Railway

1. Log in to your Railway account
2. Create a new project
3. Choose "Deploy from GitHub repo"
4. Select your repository and the "Back" directory

### Step 2: Set up environment variables

Add the following environment variables in the Railway dashboard:

```
DEBUG=False
SECRET_KEY=<generate_a_secure_secret_key>
ALLOWED_HOSTS=localhost,127.0.0.1,.railway.app
ADMIN_USERNAME=admin
ADMIN_EMAIL=admin@egysuntours.com
ADMIN_PASSWORD=<secure_password>
```

### Step 3: Add a PostgreSQL database

1. Click "New" and select "PostgreSQL" from the dropdown
2. Railway will automatically add the `DATABASE_URL` environment variable to your project

### Step 4: Deploy

1. Railway will automatically detect the Django project and deploy it
2. The first deployment will run migrations and create the admin user

## 2. Next.js Frontend Deployment

### Step 1: Create another service in your Railway project

1. In your Railway project, click "New" and select "GitHub Repo"
2. Select the same repository but choose the "Client" directory

### Step 2: Set up environment variables

Add the following environment variable:

```
NEXT_PUBLIC_API_URL=<your_backend_service_url>
```

Replace `<your_backend_service_url>` with the URL of your deployed backend service.

### Step 3: Deploy

Railway will automatically detect the Next.js project and deploy it.

## Verifying Deployment

1. After both services are deployed, you can visit your frontend URL to see the website
2. Access the admin panel at `<backend_url>/admin` using the admin credentials you set

## Troubleshooting

### Backend Issues

1. Check logs in the Railway dashboard for any errors
2. Verify that environment variables are set correctly
3. Ensure the database is properly connected

### Frontend Issues

1. Verify that the `NEXT_PUBLIC_API_URL` is correctly pointing to your backend
2. Check for any build errors in the deployment logs

## Updating Your Deployment

When you push changes to your GitHub repository, Railway will automatically redeploy your services.

## Important Notes

1. The admin user is created with the credentials specified in the environment variables
2. Static files are served using WhiteNoise
3. The frontend communicates with the backend API using the URL specified in the environment variables
4. Media files (uploads) are not automatically persisted - consider using a service like AWS S3 for production
