# Object-Management-Locations-Back
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

mongosh -u "1223d" -p "1223d" --authenticationDatabase admin


## Area Controller Endpoints

### GET /areas/:id

- **Description**: Fetches a single area by its ID.
- **URL Structure**: `/areas/{id}`
- **Method**: `GET`
- **URL Parameters**: `id=[ObjectId]` - The unique identifier of the area.
- **Request Body**: None
- **Response Structure**: 
  - **Success** (200): Returns a JSON object containing the area's details.
  - **Not Found** (404): `{ "message": "Area not found" }`
  - **Error** (400/500): `{ "message": "<error message>" }`

### GET /areas

- **Description**: Fetches all areas.
- **URL Structure**: `/areas`
- **Method**: `GET`
- **URL Parameters**: None
- **Request Body**: None
- **Response Structure**: 
  - **Success** (200): Returns an array of area objects.
  - **Error** (500): `{ "message": "Server error occurred while fetching areas." }`

### POST /areas

- **Description**: Creates a new area.
- **URL Structure**: `/areas`
- **Method**: `POST`
- **URL Parameters**: None
- **Request Body**: JSON object containing new area details.
  - Example:
    ```json
    {
      "name": "Central Park",
      "contactNumber": 1234567890,
      "centerLat": 40.785091,
      "centerLng": -73.968285,
      "radius": 1200,
      "objects": ["627a14b3ee9f1f4b3c2ab7b8"]
    }
    ```
- **Response Structure**: 
  - **Created** (201): Returns the created area object.
  - **Error** (400/500): `{ "message": "<error message>" }`

### PUT /areas/:id

- **Description**: Updates an existing area by ID.
- **URL Structure**: `/areas/{id}`
- **Method**: `PUT`
- **URL Parameters**: `id=[ObjectId]`
- **Request Body**: JSON object containing fields to update.
  - Example:
    ```json
    {
      "radius": 1500
    }
    ```
- **Response Structure**: 
  - **Success** (200): Returns the updated area object.
  - **Not Found** (404): `{ "message": "Area not found" }`
  - **Error** (400/500): `{ "message": "<error message>" }`

### DELETE /areas/:id

- **Description**: Deletes an area by its ID.
- **URL Structure**: `/areas/{id}`
- **Method**: `DELETE`
- **URL Parameters**: `id=[ObjectId]`
- **Request Body**: None
- **Response Structure**: 
  - **Success** (200): `{ "message": "Area deleted successfully" }`
  - **Not Found** (404): `{ "message": "Area not found" }`
  - **Error** (500): `{ "message": "Server error occurred while deleting the area." }`

## User Controller Endpoints

### GET /users/:id

- **Description**: Fetches a single user by their ID.
- **URL Structure**: `/users/{id}`
- **Method**: `GET`
- **URL Parameters**: `id=[ObjectId]` - The unique identifier of the user.
- **Request Body**: None
- **Response Structure**: 
  - **Success** (200): Returns a JSON object containing the user's details.
  - **Not Found** (404): `{ "message": "User not found" }`
  - **Error** (400/500): `{ "message": "<error message>" }`

### GET /users

- **Description**: Fetches all users.
- **URL Structure**: `/users`
- **Method**: `GET`
- **URL Parameters**: None
- **Request Body**: None
- **Response Structure**: 
  - **Success** (200): Returns an array of user objects.
  - **Error** (500): `{ "message": "Server error occurred while fetching users." }`

### POST /users

- **Description**: Creates a new user.
- **URL Structure**: `/users`
- **Method**: `POST`
- **URL Parameters**: None
- **Request Body**: JSON object containing new user details.
  - Example:
    ```json
    {
      "name": "Jane",
      "secondName": "Doe",
      "phoneNumber": 1234567890,
      "email": "jane.doe@example.com",
      "areas": ["627a14b3ee9f1f4b3c2ab7b8"]
    }
    ```
- **Response Structure**: 
  - **Created** (201): Returns the created user object.
  - **Error** (400/500): `{ "message": "<error message>" }`

### PUT /users/:id

- **Description**: Updates an existing user by ID.
- **URL Structure**: `/users/{id}`
- **Method**: `PUT`
- **URL Parameters**: `id=[ObjectId]`
- **Request Body**: JSON object containing fields to update.
  - Example:
    ```json
    {
      "phoneNumber": 9876543210,
      "email": "jane.updated@example.com"
    }
    ```
- **Response Structure**: 
  - **Success** (200): Returns the updated user object.
  - **Not Found** (404): `{ "message": "User not found" }`
  - **Error** (400/500): `{ "message": "<error message>" }`

### DELETE /users/:id

- **Description**: Deletes a user by their ID.
- **URL Structure**: `/users/{id}`
- **Method**: `DELETE`
- **URL Parameters**: `id=[ObjectId]`
- **Request Body**: None
- **Response Structure**: 
  - **Success** (200): `{ "message": "User deleted successfully" }`
  - **Not Found** (404): `{ "message": "User not found" }`
  - **Error** (500): `{ "message": "Server error occurred while deleting the user." }`
