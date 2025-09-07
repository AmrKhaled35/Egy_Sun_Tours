# Railway Deployment Steps

## Backend Deployment

1. Sign up for a [Railway account](https://railway.app/)

2. Install the [Railway CLI](https://docs.railway.app/develop/cli) (optional)
   ```bash
   npm i -g @railway/cli
   railway login
   ```

3. Create a new project in Railway
   - Go to the Railway dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Connect your GitHub account and select the repository

4. Configure the backend service
   - Set the root directory to `/Back`
   - Configure the required environment variables:
     ```
     DEBUG=False
     SECRET_KEY=your_secure_secret_key
     ALLOWED_HOSTS=localhost,127.0.0.1,.railway.app
     ADMIN_USERNAME=admin
     ADMIN_EMAIL=admin@egysuntours.com
     ADMIN_PASSWORD=your_secure_admin_password
     ```

5. Add a PostgreSQL database
   - In your project, click "New" and select "PostgreSQL"
   - Railway will automatically add the `DATABASE_URL` variable

## Frontend Deployment

1. In your Railway project, create a new service
   - Click "New" and select "Deploy from GitHub repo" 
   - Select the same repository but set the root directory to `/Client`

2. Configure the frontend service
   - Set the environment variable:
     ```
     NEXT_PUBLIC_API_URL=https://your-backend-service-url.up.railway.app
     ```

3. Wait for the deployment to complete

## Domain Configuration (Optional)

1. For custom domains:
   - In your Railway project, go to Settings
   - Click on "Domains"
   - Add your custom domain and follow the DNS configuration instructions

## Monitoring

1. Check the health of your backend:
   - Visit https://your-backend-service-url.up.railway.app/api/health/

2. Check your logs:
   - In the Railway dashboard, click on your service
   - Go to the "Logs" tab to see real-time logs

## Troubleshooting

- If migrations fail, you can manually run them:
  ```bash
  railway run python manage.py migrate
  ```

- If static files aren't being served correctly:
  ```bash
  railway run python manage.py collectstatic --noinput
  ```

- For any other issues, check the Railway logs for detailed error messages
