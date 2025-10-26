# Sofia Galvao Group API

This document provides an overview of the Sofia Galvao Group API, explaining how to use the API endpoints to interact with the application's data.

## Base URL

```
https://your-api-domain.com/api/v1
```

Replace `your-api-domain.com` with the actual domain where the API is hosted.

## Authentication

The API uses JWT (JSON Web Token) for authentication. To access protected endpoints, you need to:

1. Obtain a token by sending a POST request to `/api/v1/auth/login` with your credentials:

```json
{
  "email": "your_email@example.com",
  "password": "your_password"
}
```

2. The server will respond with a token:

```json
{
  "token": "eyJhbGciOiJIUzI1NiJ9...",
  "exp": "05-20-2023 14:30",
  "admin_id": 1,
  "email": "your_email@example.com",
  "confirmed": true
}
```

3. Include this token in the Authorization header of subsequent requests:

```
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9...
```

## Pagination

API endpoints that return collections support pagination. You can specify:

- `page`: The page number (default: 1)
- `per_page`: Number of items per page (default: 25)

Example: `/api/v1/listings?page=2&per_page=10`

Pagination information is included in the response:

```json
{
  "data": [...],
  "pagination": {
    "current_page": 2,
    "total_pages": 5,
    "total_count": 50,
    "per_page": 10
  }
}
```

## Public Endpoints

### Documentation

- `GET /api/v1/docs` - Get API documentation

### Listings

- `GET /api/v1/listings` - Get all listings with optional filters
- `GET /api/v1/listings/:id` - Get a specific listing by ID or slug
- `GET /api/v1/buy` - Get listings for sale with filtering options

### Listing Complexes

- `GET /api/v1/listing_complexes` - Get all listing complexes
- `GET /api/v1/listing_complexes/:id` - Get a specific listing complex by ID or slug

### Blog Posts

- `GET /api/v1/blog_posts` - Get all visible blog posts
- `GET /api/v1/blog_posts/:id` - Get a specific blog post by ID or slug

### Club Stories

- `GET /api/v1/club_stories` - Get all visible club stories
- `GET /api/v1/club_stories/:id` - Get a specific club story by ID or slug

### Testimonials

- `GET /api/v1/testimonials` - Get all testimonials

### Variables

- `GET /api/v1/variables` - Get all variables

### Pages

- `GET /api/v1/home` - Get home page data
- `GET /api/v1/about` - Get about page data
- `GET /api/v1/services` - Get services page data
- `GET /api/v1/contact` - Get contact page data
- `GET /api/v1/privacy` - Get privacy policy data
- `GET /api/v1/terms_and_conditions` - Get terms and conditions data
- `GET /api/v1/faq` - Get FAQ data
- `GET /api/v1/sell` - Get sell page data
- `GET /api/v1/club` - Get club page data
- `GET /api/v1/club/rules` - Get club rules data

### Contact and Subscriptions

- `POST /api/v1/contact` - Send a contact message
- `POST /api/v1/club/join` - Join the club
- `POST /api/v1/newsletter_subscriptions` - Subscribe to the newsletter
- `GET /api/v1/newsletter_subscriptions/:id/confirm` - Confirm newsletter subscription

## Admin Endpoints (Protected)

These endpoints require authentication with admin privileges.

### Blog Posts Management

- `GET /api/v1/admin/blog_posts` - Get all blog posts (including hidden)
- `GET /api/v1/admin/blog_posts/:id` - Get a specific blog post
- `POST /api/v1/admin/blog_posts` - Create a new blog post
- `PUT/PATCH /api/v1/admin/blog_posts/:id` - Update a blog post
- `DELETE /api/v1/admin/blog_posts/:id` - Delete a blog post

### Club Stories Management

- `GET /api/v1/admin/club_stories` - Get all club stories (including hidden)
- `GET /api/v1/admin/club_stories/:id` - Get a specific club story
- `POST /api/v1/admin/club_stories` - Create a new club story
- `PUT/PATCH /api/v1/admin/club_stories/:id` - Update a club story
- `DELETE /api/v1/admin/club_stories/:id` - Delete a club story

### Listing Complexes Management

- `GET /api/v1/admin/listing_complexes` - Get all listing complexes
- `GET /api/v1/admin/listing_complexes/:id` - Get a specific listing complex
- `POST /api/v1/admin/listing_complexes` - Create a new listing complex
- `PUT/PATCH /api/v1/admin/listing_complexes/:id` - Update a listing complex
- `DELETE /api/v1/admin/listing_complexes/:id` - Delete a listing complex
- `POST /api/v1/admin/listing_complexes/:id/update_details` - Update details from original source
- `PATCH /api/v1/admin/listing_complexes/:id/photos` - Update photos
- `DELETE /api/v1/admin/listing_complexes/:id/delete_photo` - Delete a photo
- `POST /api/v1/admin/listing_complexes/fetch` - Fetch complex from URL

### Listings Management

- `GET /api/v1/admin/listings` - Get all listings
- `GET /api/v1/admin/listings/:id` - Get a specific listing
- `POST /api/v1/admin/listings` - Create a new listing
- `PUT/PATCH /api/v1/admin/listings/:id` - Update a listing
- `DELETE /api/v1/admin/listings/:id` - Delete a listing
- `POST /api/v1/admin/listings/:id/update_details` - Update details from original source
- `POST /api/v1/admin/listings/:id/recover` - Recover a deleted listing
- `POST /api/v1/admin/listings/update_all` - Update all listings

### Testimonials Management

- `GET /api/v1/admin/testimonials` - Get all testimonials
- `GET /api/v1/admin/testimonials/:id` - Get a specific testimonial
- `POST /api/v1/admin/testimonials` - Create a new testimonial
- `PUT/PATCH /api/v1/admin/testimonials/:id` - Update a testimonial
- `DELETE /api/v1/admin/testimonials/:id` - Delete a testimonial

### Variables Management

- `GET /api/v1/admin/variables` - Get all variables
- `POST /api/v1/admin/variables` - Create a new variable
- `PUT/PATCH /api/v1/admin/variables/:id` - Update a variable
- `DELETE /api/v1/admin/variables/:id` - Delete a variable

### Photo Management

- `POST /api/v1/admin/blog_photos` - Upload a blog photo
- `DELETE /api/v1/admin/blog_photos/:id` - Delete a blog photo
- `POST /api/v1/admin/club_story_photos` - Upload a club story photo
- `DELETE /api/v1/admin/club_story_photos/:id` - Delete a club story photo
- `DELETE /api/v1/admin/photos/:id` - Delete a photo

## Error Handling

The API returns standard HTTP status codes:

- `200 OK` - Request succeeded
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request parameters
- `401 Unauthorized` - Authentication required or invalid
- `403 Forbidden` - Authenticated but not authorized
- `404 Not Found` - Resource not found
- `422 Unprocessable Entity` - Validation errors
- `500 Internal Server Error` - Server error

Error responses have this format:

```json
{
  "status": "status_code",
  "error": ["Error message"]
}
```

## Multilingual Support

The API supports both Portuguese (default) and English. To specify the language, include the `locale` parameter in your requests:

```
/api/v1/listings?locale=en
```

Available locales:

- `pt` (Portuguese, default)
- `en` (English)
