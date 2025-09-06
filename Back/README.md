# Egy Sun Tours - Backend API

This is the backend API for Egy Sun Tours, built with Django and Django REST Framework.

## Authentication System

This project uses JWT (JSON Web Token) authentication to secure the API endpoints. Only admin users can access the dashboard and perform CRUD operations.

### Authentication Flow

1. **Login**: Admin users can obtain JWT tokens by sending a POST request to `/api/token/` with valid credentials.
2. **Using Tokens**: Include the access token in the Authorization header (`Bearer <token>`) for all protected requests.
3. **Refreshing Tokens**: When an access token expires, use the refresh token to obtain a new one via `/api/token/refresh/`.

### Admin-Only Access

- The application enforces admin-only access for modifying data.
- Regular users and anonymous visitors can only read public data.
- Admin users cannot be created through the API and must be created directly in the database.

## Setup

1. Create a virtual environment:
   ```
   python3 -m venv venv
   ```

2. Activate the virtual environment:
   ```
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

4. Start MongoDB service:
   ```
   sudo systemctl start mongod  # On Linux
   # OR
   brew services start mongodb-community  # On Mac
   # OR start MongoDB service on Windows
   ```

5. Run migrations:
   ```
   python manage.py makemigrations
   python manage.py migrate
   ```

6. Initialize data (creates admin user and contact info):
   ```
   python manage.py initialize_data
   ```

7. Run the development server:
   ```
   python manage.py runserver
   ```

## API Endpoints

### Trips
- GET /api/trips/ - List all trips
- POST /api/trips/ - Create a new trip
- GET /api/trips/{id}/ - Get trip details
- PUT /api/trips/{id}/ - Update trip
- DELETE /api/trips/{id}/ - Delete trip

### Gallery
- GET /api/gallery/ - List all gallery items
- POST /api/gallery/ - Add gallery item
- DELETE /api/gallery/{id}/ - Delete gallery item

### Reviews
- GET /api/reviews/ - List all reviews
- POST /api/reviews/ - Create a review
- PUT /api/reviews/{id}/ - Update review
- DELETE /api/reviews/{id}/ - Delete review

### Contact
- GET /api/contact/ - Get contact information
- PUT /api/contact/1/ - Update contact information

### Messages
- GET /api/messages/ - List all contact messages
- POST /api/messages/ - Send a contact message
- DELETE /api/messages/{id}/ - Delete a message

## Admin Access
- URL: /admin/
- Username: admin
- Password: adminpass123 (change this in production)
