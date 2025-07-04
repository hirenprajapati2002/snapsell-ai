# SnapSell.AI API Integration Guide

## API Endpoints

### Base URL
```
Development: http://localhost:3001/api
Production: https://api.snapsell.ai
```

### Authentication Endpoints

#### 1. Login
```
POST /auth/login
Content-Type: application/json

Body:
{
  "email": "user@example.com",
  "password": "userpassword"
}

Response Success (200):
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}

Response Error (401):
{
  "success": false,
  "message": "Invalid credentials"
}
```

#### 2. Register
```
POST /auth/register
Content-Type: application/json

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}

Response Success (201):
{
  "success": true,
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "john@example.com",
    "name": "John Doe",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}

Response Error (409):
{
  "success": false,
  "message": "Email already exists"
}
```

#### 3. Forgot Password
```
POST /auth/forgot-password
Content-Type: application/json

Body:
{
  "email": "user@example.com"
}

Response Success (200):
{
  "success": true,
  "message": "Password reset link sent to your email"
}

Response Error (404):
{
  "success": false,
  "message": "Email not found"
}
```

#### 4. Reset Password
```
POST /auth/reset-password
Content-Type: application/json

Body:
{
  "token": "reset_token_from_email",
  "newPassword": "newpassword123"
}

Response Success (200):
{
  "success": true,
  "message": "Password reset successfully"
}

Response Error (400):
{
  "success": false,
  "message": "Invalid or expired reset token"
}
```

#### 5. Verify Token
```
GET /auth/verify
Authorization: Bearer jwt_token_here

Response Success (200):
{
  "success": true,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "User Name",
    "createdAt": "2025-01-01T00:00:00.000Z"
  }
}

Response Error (401):
{
  "success": false,
  "message": "Invalid token"
}
```

#### 6. Logout
```
POST /auth/logout
Authorization: Bearer jwt_token_here

Response Success (200):
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Image Generation Endpoints

#### 1. Generate Image
```
POST /generate-image
Content-Type: multipart/form-data
Authorization: Bearer <jwt_token>

Form Data:
- prompt: "A modern living room interior featuring a sleek sofa..."
- image: [optional] image file for image-to-image generation

Response Success (200):
{
  "success": true,
  "image_url": "https://api.example.com/generated-images/image-123.png",
  "prompt": "A modern living room interior featuring a sleek sofa...",
  "generation_id": "gen_123456",
  "created_at": "2025-01-01T00:00:00.000Z"
}

Response Error (400):
{
  "success": false,
  "message": "Prompt is required"
}

Response Error (429):
{
  "success": false,
  "message": "Rate limit exceeded. Please try again later."
}
```

#### 2. Get Generation History
```
GET /generate-image/history
Authorization: Bearer <jwt_token>

Response Success (200):
{
  "success": true,
  "generations": [
    {
      "id": "gen_123456",
      "prompt": "A modern living room interior...",
      "image_url": "https://api.example.com/generated-images/image-123.png",
      "created_at": "2025-01-01T00:00:00.000Z"
    }
  ],
  "total": 1,
  "page": 1,
  "limit": 10
}
```

## Error Handling

The API returns consistent error responses with the following structure:

```json
{
  "success": false,
  "message": "Error description",
  "errors": [] // Optional array of validation errors
}
```

### Common HTTP Status Codes
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `422` - Validation Error
- `429` - Too Many Requests
- `500` - Internal Server Error

## Frontend Integration

The frontend automatically handles:
- Token storage in localStorage
- Authorization headers for protected routes
- Automatic token refresh
- Error handling and user feedback
- Loading states

## Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Rate limiting on auth endpoints
- Email verification for password reset
- CORS protection
- Input validation and sanitization

## Environment Variables

Required environment variables for the backend:

```env
NODE_ENV=development
PORT=3001
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
DB_CONNECTION_STRING=your-database-url
EMAIL_SERVICE=gmail
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
FRONTEND_URL=http://localhost:3000
```
