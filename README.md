# Object-Management-Locations-Back
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d --build

mongosh -u "1223d" -p "1223d" --authenticationDatabase admin



# Object Management Locations Backend Documentation

## Global Target

The Object Management Locations Backend project aims to provide a comprehensive solution for managing locations and objects within specified areas. It enables the creation, tracking, and management of geographic areas, objects within those areas, and user accounts. The system is designed to facilitate real-time interactions through Socket.IO, allowing for live updates of object locations and user positions. This backend serves as the core for applications requiring geospatial awareness and object management, such as asset tracking, location-based services, or environmental monitoring systems.

## Table of Contents

1. [Introduction](#introduction)
2. [Connecting to the Server](#connecting-to-the-server)
3. [API Endpoints](#api-endpoints)
   - [Areas](#areas)
   - [Authentication](#authentication)
   - [Locations](#locations)
   - [Objects](#objects)
   - [Users](#users)
4. [Socket.IO Events](#socketio-events)
5. [Utilities](#utilities)
6. [Additional Notes](#additional-notes)

## Connecting to the Server

After successfully logging in, clients need to connect to the server via Socket.IO to receive real-time updates. To establish this connection, the client must pass their `userId` (obtained after login) as a query parameter during the Socket.IO connection setup. This `userId` is crucial for identifying the user and ensuring they receive updates pertinent to their account and associated objects.

Example Socket.IO Connection:
```javascript
const socket = io('SERVER_URL', {
  query: {
    userId: 'USER_ID'
  }
});
```

## API Endpoints

### Areas

- **GET /areas/:id**: Fetches a specific area by its ID.
- **GET /areas**: Retrieves all areas.
- **POST /areas**: Creates a new area. Requires body parameters like `name`, `centerLat`, `centerLng`, and `radius`.
- **PUT /areas/:id**: Updates an existing area by ID. Accepts partial or full area details in the body.
- **DELETE /areas/:id**: Deletes an area by its ID.

### Authentication

- **POST /auth/login**: Handles user login. Requires `email` and `password` in the body.

### Locations

- **POST /locations/start**: Initiates real-time location updates for objects.
- **POST /locations/stop**: Stops real-time location updates.

### Objects

- **GET /objects/:id**: Fetches a specific object by its ID.
- **GET /objects**: Retrieves all objects.
- **POST /objects**: Creates a new object. Requires body parameters like `description`, `lat`, `lan`, and `tagId`.
- **PUT /objects/:id**: Updates an existing object by ID. Accepts partial or full object details in the body.
- **DELETE /objects/:id**: Deletes an object by its ID.

### Users

- **GET /users/:id**: Fetches a specific user by their ID.
- **GET /users**: Retrieves all users.
- **POST /users**: Creates a new user. Requires `name`, `secondName`, `phoneNumber`, and `email` in the body.
- **PUT /users/:id**: Updates an existing user by ID. Accepts partial or full user details in the body.
- **DELETE /users/:id**: Deletes a user by their ID.

## Socket.IO Events

This section should detail any Socket.IO events emitted by the server, including `userObjects`, and `objectCrossed`, explaining their purposes, payloads, and when they are triggered.

## Utilities

Utility functions such as `geoDistance`, and `objectsIntersector` play a crucial role in processing location data and managing real-time updates. A brief explanation of each and how they integrate with the system would be beneficial.

## Additional Notes

Include any additional information that might be helpful for users of the API, such as rate limits, data validation rules, or how to set up the development environment.
