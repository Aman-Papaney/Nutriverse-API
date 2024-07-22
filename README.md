# Welcome to Nutriverse API

This API provides endpoints for user registration, login, food management, and nutrition tracking.

## Rate Limiting

To prevent abuse and ensure fair usage, the API implements rate limiting. The default rate limit is **100 requests per 5 minute**. If the rate limit is exceeded, a 429 Too Many Requests response will be returned.

## Authentication

API uses JSON Web Tokens (JWT) for authentication.


### Register

**Endpoint:** /register \n
**Method:** POST 
**Request Body:**

JSON
```
{
  "name": "username"
  "email": "user@example.com",
  "password": "password123",
  "age": 23
}
```
**Response:**

-   On success:

JSON

```
{ "message": "User Registered Successfully"
  "user": {
	  "name": "username"
	  "email": "user@example.com",
	  "age": 23
	  }
}

```
-   On failure:

JSON

```
{
  "message": "Error Occurred"
}

```

### Login

**Endpoint:** /login 
**Method:** POST 
**Request Body:**

JSON

```
{
  "email": "user@example.com",
  "password": "password123"
}

```
**Response:**

-   On success:

JSON

```
{
  "message": "Login Successfull",
  "token": "jwt_token"
}
```
-   On failure:

JSON

```
{
  "message": "Invalid Username or Password"
}

```
## Foods

### Get Foods

**Endpoint:** /foods 
**Method:** GET
 **Response:**

JSON

```
[
  {
    "id": 1,
    "name": "Apple",
    "carbohydrates": 95,
    "protein": 0.3,
    "fats": 24,
    "calories": 0.5,
    "fiber" : 2
  },
  // ... other foods
]

```
#### Get Food by ID

**Endpoint:** /foods/{name}
 **Method:** GET 
 **Response:**

JSON

```
{
    "id": 1,
    "name": "Apple",
    "carbohydrates": 95,
    "protein": 0.3,
    "fats": 24,
    "calories": 0.5,
    "fiber" : 2
  }
```
## Track

#### Create a Food Entry

**Endpoint:** /track 
**Method:** POST 
**Request Body:**

JSON

```
{
  "food_id": 1,
  "user_id": 2,
  "quantity": 232 // In grams
}
```
**Response:**

JSON

```
{ 
  "message":  "Food Added to Track"
}
```
### Get Food Entries

**Endpoint:** /track/{user_id}/date
**Method:** GET
**Response:**

JSON

```
[
  {
    "id": 1,
    "user": {
      "id": 1,
      "name": "XYZ",
      // ... other user details
    },
    "food": {
      "id": 1,
      "name": "Apple",
      // ... other food details
    },
    "quantity": 1,
    "date": "7/21/2024"
  },
  // ... other entries
]

```
