# API Documentation - Egy Sun Tours

This document provides a comprehensive guide to using the Egy Sun Tours API.

## Base URL
- Development: `http://localhost:8000`
- Production: `https://api.egyptours.com` (when deployed)

## Authentication
API endpoints that modify data require authentication. Authentication is handled through JWT (JSON Web Tokens).

### Getting a JWT Token
- **URL**: `/api/token/`
- **Method**: `POST`
- **Data Params**:
  ```json
  {
    "username": "admin",
    "password": "adminpass123"
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**:
    ```json
    {
      "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
- **Sample Call**:
  ```bash
  curl -X POST http://localhost:8000/api/token/ \
    -H "Content-Type: application/json" \
    -d '{"username": "admin", "password": "adminpass123"}'
  ```

### Using the JWT Token
Include the access token in the Authorization header for all protected requests:
```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Refreshing the Token
- **URL**: `/api/token/refresh/`
- **Method**: `POST`
- **Data Params**:
  ```json
  {
    "refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```
- **Success Response**:
  - **Code**: 200
  - **Content**: `{ "access": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." }`
- **Sample Call**:
  ```bash
  curl -X POST http://localhost:8000/api/token/refresh/ \
    -H "Content-Type: application/json" \
    -d '{"refresh": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."}'
  ```

### Admin Access Restriction
**Note**: Only admin users can access the dashboard and perform CRUD operations. Admin users are created directly in the database and cannot be created through the API.

## API Endpoints

### Trips

#### Get All Trips
- **URL**: `/api/trips/`
- **Method**: `GET`
- **URL Params**: None
- **Success Response**: 
  - **Code**: 200
  - **Content**: List of trips with pagination
- **Sample Call**:
  ```bash
  curl -X GET http://localhost:8000/api/trips/
  ```

#### Get Trip Details
- **URL**: `/api/trips/:id/`
- **Method**: `GET`
- **URL Params**: `id=[integer]` - ID of the trip
- **Success Response**: 
  - **Code**: 200
  - **Content**: Trip details including timeline and gallery
- **Sample Call**:
  ```bash
  curl -X GET http://localhost:8000/api/trips/1/
  ```

#### Create Trip
- **URL**: `/api/trips/`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Data Params**:
  - `title` (required) - Trip title
  - `shortDescription` (required) - Brief description
  - `fullDescription` (required) - Detailed description
  - `duration` (required) - Trip duration
  - `price` (required) - Trip price
  - `category` (required) - Trip category
  - `image` (required) - Main trip image file
  - `highlights` (optional) - JSON array of highlights
  - `timeline` (optional) - Multiple JSON objects for timeline items
  - `gallery` (optional) - Multiple image files for gallery
- **Success Response**: 
  - **Code**: 201
  - **Content**: Created trip data
- **Sample Call**:
  ```bash
  curl -X POST http://localhost:8000/api/trips/ \
    -F "title=Cairo Pyramids Tour" \
    -F "shortDescription=Explore the ancient pyramids of Giza" \
    -F "fullDescription=Discover the wonders of ancient Egypt" \
    -F "duration=1 Day" \
    -F "price=99.99" \
    -F "category=Cultural" \
    -F "highlights=[\"Great Pyramid\",\"Sphinx\"]" \
    -F "image=@path_to_image.jpg"
  ```

#### Update Trip
- **URL**: `/api/trips/:id/`
- **Method**: `PUT`
- **URL Params**: `id=[integer]` - ID of the trip to update
- **Content-Type**: `multipart/form-data`
- **Data Params**: Same as Create Trip (all fields optional)
- **Success Response**: 
  - **Code**: 200
  - **Content**: Updated trip data
- **Sample Call**:
  ```bash
  curl -X PUT http://localhost:8000/api/trips/1/ \
    -F "title=Updated Cairo Tour" \
    -F "price=129.99"
  ```

#### Delete Trip
- **URL**: `/api/trips/:id/`
- **Method**: `DELETE`
- **URL Params**: `id=[integer]` - ID of the trip to delete
- **Success Response**: 
  - **Code**: 204 No Content
- **Sample Call**:
  ```bash
  curl -X DELETE http://localhost:8000/api/trips/1/
  ```

#### Add Timeline Item to Trip
- **URL**: `/api/trips/:id/add_timeline_item/`
- **Method**: `POST`
- **URL Params**: `id=[integer]` - ID of the trip
- **Content-Type**: `multipart/form-data`
- **Data Params**:
  - `time` (required) - Time of the activity
  - `title` (required) - Title of the activity
  - `description` (required) - Description of the activity
  - `image` (optional) - Image file for the activity
- **Success Response**: 
  - **Code**: 201
  - **Content**: Created timeline item data
- **Sample Call**:
  ```bash
  curl -X POST http://localhost:8000/api/trips/1/add_timeline_item/ \
    -F "time=12:00 PM" \
    -F "title=Lunch Break" \
    -F "description=Traditional Egyptian lunch at a local restaurant" \
    -F "image=@lunch.jpg"
  ```

#### Add Gallery Image to Trip
- **URL**: `/api/trips/:id/add_gallery_image/`
- **Method**: `POST`
- **URL Params**: `id=[integer]` - ID of the trip
- **Content-Type**: `multipart/form-data`
- **Data Params**:
  - `image` (required) - Image file for the gallery
- **Success Response**: 
  - **Code**: 201
  - **Content**: Created gallery image data
- **Sample Call**:
  ```bash
  curl -X POST http://localhost:8000/api/trips/1/add_gallery_image/ \
    -F "image=@new_gallery_image.jpg"
  ```

### Gallery

#### Get All Gallery Items
- **URL**: `/api/gallery/`
- **Method**: `GET`
- **URL Params**:
  - `category` (optional) - Filter by category
  - `type` (optional) - Filter by type (image or video)
- **Success Response**: 
  - **Code**: 200
  - **Content**: List of gallery items with pagination
- **Sample Call**:
  ```bash
  curl -X GET "http://localhost:8000/api/gallery/?category=Adventure&type=image"
  ```

#### Create Gallery Item
- **URL**: `/api/gallery/`
- **Method**: `POST`
- **Content-Type**: `multipart/form-data`
- **Data Params**:
  - `image` (required) - Image/video file
  - `alt` (required) - Alternative text
  - `category` (required) - Category of the item
  - `type` (required) - Type (image or video)
- **Success Response**: 
  - **Code**: 201
  - **Content**: Created gallery item data
- **Sample Call**:
  ```bash
  curl -X POST http://localhost:8000/api/gallery/ \
    -F "image=@sunset.jpg" \
    -F "alt=Beautiful sunset at the Nile" \
    -F "category=Nature" \
    -F "type=image"
  ```

#### Delete Gallery Item
- **URL**: `/api/gallery/:id/`
- **Method**: `DELETE`
- **URL Params**: `id=[integer]` - ID of the gallery item to delete
- **Success Response**: 
  - **Code**: 204 No Content
- **Sample Call**:
  ```bash
  curl -X DELETE http://localhost:8000/api/gallery/1/
  ```

### Reviews

#### Get All Reviews
- **URL**: `/api/reviews/`
- **Method**: `GET`
- **URL Params**: None
- **Success Response**: 
  - **Code**: 200
  - **Content**: List of reviews with pagination
- **Sample Call**:
  ```bash
  curl -X GET http://localhost:8000/api/reviews/
  ```

#### Get Review Details
- **URL**: `/api/reviews/:id/`
- **Method**: `GET`
- **URL Params**: `id=[integer]` - ID of the review
- **Success Response**: 
  - **Code**: 200
  - **Content**: Review details
- **Sample Call**:
  ```bash
  curl -X GET http://localhost:8000/api/reviews/1/
  ```

#### Create Review
- **URL**: `/api/reviews/`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Data Params**:
  - `name` (required) - Reviewer's name
  - `username` (optional) - Reviewer's username
  - `rating` (required) - Rating (1-5)
  - `title` (required) - Review title
  - `excerpt` (required) - Short excerpt
  - `fullText` (required) - Full review text
  - `location` (required) - Reviewer's location
  - `tourType` (required) - Type of tour reviewed
- **Success Response**: 
  - **Code**: 201
  - **Content**: Created review data
- **Sample Call**:
  ```bash
  curl -X POST http://localhost:8000/api/reviews/ \
    -H "Content-Type: application/json" \
    -d '{
      "name": "John Smith",
      "username": "jsmith",
      "rating": 5,
      "title": "Amazing Experience!",
      "excerpt": "We had a wonderful time exploring Egypt.",
      "fullText": "Our tour guide was knowledgeable and friendly.",
      "location": "USA",
      "tourType": "Cultural Tour"
    }'
  ```

#### Update Review
- **URL**: `/api/reviews/:id/`
- **Method**: `PUT`
- **URL Params**: `id=[integer]` - ID of the review to update
- **Content-Type**: `application/json`
- **Data Params**: Same as Create Review (all fields optional)
- **Success Response**: 
  - **Code**: 200
  - **Content**: Updated review data
- **Sample Call**:
  ```bash
  curl -X PUT http://localhost:8000/api/reviews/1/ \
    -H "Content-Type: application/json" \
    -d '{
      "rating": 4,
      "title": "Great Experience",
      "fullText": "Updated review text with additional details."
    }'
  ```

#### Delete Review
- **URL**: `/api/reviews/:id/`
- **Method**: `DELETE`
- **URL Params**: `id=[integer]` - ID of the review to delete
- **Success Response**: 
  - **Code**: 204 No Content
- **Sample Call**:
  ```bash
  curl -X DELETE http://localhost:8000/api/reviews/1/
  ```

### Contact Info

#### Get Contact Info
- **URL**: `/api/contact/`
- **Method**: `GET`
- **URL Params**: None
- **Success Response**: 
  - **Code**: 200
  - **Content**: Contact information
- **Sample Call**:
  ```bash
  curl -X GET http://localhost:8000/api/contact/
  ```

#### Update Contact Info
- **URL**: `/api/contact/1/`
- **Method**: `PUT`
- **Content-Type**: `application/json`
- **Data Params**:
  - `phone` - Phone number
  - `email` - Email address
  - `address` - Physical address
  - `website` - Website URL
  - `facebook` - Facebook URL
  - `instagram` - Instagram URL
  - `twitter` - Twitter URL
  - `tripadvisor` - TripAdvisor URL
  - `businessHours` - Business hours
  - `emergencyContact` - Emergency contact
  - `description` - Company description
- **Success Response**: 
  - **Code**: 200
  - **Content**: Updated contact info
- **Sample Call**:
  ```bash
  curl -X PUT http://localhost:8000/api/contact/1/ \
    -H "Content-Type: application/json" \
    -d '{
      "phone": "+20 123 456 7890",
      "email": "info@egyptours.com",
      "address": "123 Pyramid Street, Giza, Egypt",
      "website": "https://egyptours.com",
      "businessHours": "Mon-Fri: 9 AM - 6 PM"
    }'
  ```

### Contact Messages

#### Get All Messages
- **URL**: `/api/messages/`
- **Method**: `GET`
- **URL Params**: None
- **Success Response**: 
  - **Code**: 200
  - **Content**: List of contact messages with pagination
- **Sample Call**:
  ```bash
  curl -X GET http://localhost:8000/api/messages/
  ```

#### Get Message Details
- **URL**: `/api/messages/:id/`
- **Method**: `GET`
- **URL Params**: `id=[integer]` - ID of the message
- **Success Response**: 
  - **Code**: 200
  - **Content**: Message details
- **Sample Call**:
  ```bash
  curl -X GET http://localhost:8000/api/messages/1/
  ```

#### Send Message
- **URL**: `/api/messages/`
- **Method**: `POST`
- **Content-Type**: `application/json`
- **Data Params**:
  - `name` (required) - Sender's name
  - `email` (required) - Sender's email
  - `subject` (required) - Message subject
  - `message` (required) - Message content
- **Success Response**: 
  - **Code**: 201
  - **Content**: Created message data
- **Sample Call**:
  ```bash
  curl -X POST http://localhost:8000/api/messages/ \
    -H "Content-Type: application/json" \
    -d '{
      "name": "Jane Doe",
      "email": "jane@example.com",
      "subject": "Tour Inquiry",
      "message": "I am interested in booking a tour to the Pyramids for next month."
    }'
  ```

#### Delete Message
- **URL**: `/api/messages/:id/`
- **Method**: `DELETE`
- **URL Params**: `id=[integer]` - ID of the message to delete
- **Success Response**: 
  - **Code**: 204 No Content
- **Sample Call**:
  ```bash
  curl -X DELETE http://localhost:8000/api/messages/1/
  ```

#### Mark Message as Read
- **URL**: `/api/messages/:id/mark_as_read/`
- **Method**: `PATCH`
- **URL Params**: `id=[integer]` - ID of the message to mark as read
- **Success Response**: 
  - **Code**: 200
  - **Content**: Status confirmation
- **Sample Call**:
  ```bash
  curl -X PATCH http://localhost:8000/api/messages/1/mark_as_read/
  ```

## Data Models

### Trip
- `id`: Integer (Unique trip ID)
- `title`: String (Title of the trip)
- `slug`: String (URL-friendly slug)
- `shortDescription`: String (Brief description)
- `fullDescription`: String (Detailed description)
- `duration`: String (e.g., "1 Day")
- `price`: Decimal (Trip price)
- `image`: String (URL to main image)
- `category`: String (Trip category)
- `highlights`: Array of Strings (Key highlights)
- `created_at`: DateTime (Creation timestamp)
- `updated_at`: DateTime (Update timestamp)
- `timeline`: Array of TimelineItem objects
- `gallery`: Array of TripImage objects

### TimelineItem
- `id`: Integer (Unique item ID)
- `trip`: Integer (Foreign key to Trip)
- `time`: String (e.g., "09:00 AM")
- `title`: String (Activity title)
- `description`: String (Activity description)
- `image`: String (Optional image URL)

### TripImage
- `id`: Integer (Unique image ID)
- `trip`: Integer (Foreign key to Trip)
- `image`: String (Image URL)

### GalleryItem
- `id`: Integer (Unique item ID)
- `image`: String (Image/video URL)
- `alt`: String (Alternative text)
- `category`: String (Item category)
- `type`: String (Enum: "image" or "video")
- `created_at`: DateTime (Creation timestamp)

### Review
- `id`: Integer (Unique review ID)
- `name`: String (Reviewer's name)
- `username`: String (Optional reviewer's username)
- `rating`: Integer (1-5 stars)
- `title`: String (Review headline)
- `excerpt`: String (Short excerpt)
- `fullText`: String (Full review text)
- `date`: DateTime (Review date)
- `location`: String (Reviewer's location)
- `tourType`: String (Type of tour reviewed)

### ContactInfo
- `id`: Integer (Always 1, singleton)
- `phone`: String (Phone number)
- `email`: String (Email address)
- `address`: String (Physical address)
- `website`: String (Optional website URL)
- `facebook`: String (Optional Facebook URL)
- `instagram`: String (Optional Instagram URL)
- `twitter`: String (Optional Twitter URL)
- `tripadvisor`: String (Optional TripAdvisor URL)
- `businessHours`: String (Business hours)
- `emergencyContact`: String (Emergency contact)
- `description`: String (Company description)
- `updated_at`: DateTime (Update timestamp)

### ContactMessage
- `id`: Integer (Unique message ID)
- `name`: String (Sender's name)
- `email`: String (Sender's email)
- `subject`: String (Message subject)
- `message`: String (Message content)
- `date`: DateTime (Submission date)
- `is_read`: Boolean (Read status)
