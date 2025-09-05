# Egy Sun Tours - Backend API

This is the backend API for Egy Sun Tours, built with Django and Django REST Framework.

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
