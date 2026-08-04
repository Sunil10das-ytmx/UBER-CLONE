# Users API — /users/register

**Description**

- Endpoint to register a new user. Accepts user details, hashes the password, stores the user, and returns an auth token and the created user (without the password).

**URL**

- POST /users/register

**Headers**

- Content-Type: application/json

**Request body (JSON)**

- fullname: object
  - firstname: string — required
  - lastname: string — optional
- email: string — required, must be a valid email
- password: string — required, minimum 8 characters

Example:

```json
{
  "fullname": { "firstname": "Raj", "lastname": "Das" },
  "email": "raj@example.com",
  "password": "s3cur3P@ssw0rd"
}
```

**Validation / Errors**

- 400 Bad Request — validation errors (missing fields, invalid email, password too short). Response example:

```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" }
  ]
}
```

- 409 Conflict — if a user with the given email already exists (if implemented in service)
- 500 Internal Server Error — server-side or database errors

**Success**

- 200 OK — (current implementation returns 200) JSON body contains `token` and `user` object (user object omits the `password` field since it is excluded by the schema `select: false`). Example:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "60f1c2d4a1b2c3d4e5f6a7b8",
    "fullname": { "firstname": "Raj", "lastname": "Das" },
    "email": "raj@example.com",
    "socketID": null
  }
}
```

**Notes**

- Passwords are hashed using `bcrypt` before being saved.
- JWT signing uses environment variable `TOKEN_SECRET`; ensure `.env` has `TOKEN_SECRET` set.
- The endpoint currently returns `200` on success — if you prefer REST convention, consider changing it to `201 Created`.

**Quick curl example**

```bash
curl -X POST http://localhost:4000/users/register \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"Raj","lastname":"Das"},"email":"raj@example.com","password":"s3cur3P@ss"}'
```

## Users API — /users/login

**Description**

- Endpoint to authenticate an existing user. Accepts email and password, verifies credentials, and returns a JWT token and the user object (without the password).

**URL**

- POST /users/login

**Headers**

- Content-Type: application/json

**Request body (JSON)**

- email: string — required, must be a valid email
- password: string — required, minimum 8 characters

Example:

```json
{
  "email": "raj@example.com",
  "password": "s3cur3P@ssw0rd"
}
```

**Validation / Errors**

- 400 Bad Request — validation errors (missing fields, invalid email, password too short). Response example:

```json
{
  "errors": [
    { "msg": "Invalid Email", "param": "email", "location": "body" }
  ]
}
```

- 401 Unauthorized — invalid email or password.
- 500 Internal Server Error — server-side or database errors.

**Success**

- 200 OK — JSON body contains `token` and `user` object (user object omits the `password` field). Example:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "60f1c2d4a1b2c3d4e5f6a7b8",
    "fullname": { "firstname": "Raj", "lastname": "Das" },
    "email": "raj@example.com",
    "socketID": null
  }
}
```

**Quick curl example**

```bash
curl -X POST http://localhost:4000/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"raj@example.com","password":"s3cur3P@ssw0rd"}'
```

**Notes**

- Ensure `TOKEN_SECRET` is set in `.env` for JWT signing.
- Successful login returns the same `token` structure used for authenticated routes.

## Users API — /users/profile

**Description**

- Returns the authenticated user's profile information. Requires a valid auth token (cookie or `Authorization: Bearer <token>` header).

**URL**

- GET /users/profile

**Headers**

- `Authorization: Bearer <token>` or cookie `token` when using `cookie-parser`.

**Authentication**

- Endpoint is protected by `authUser` middleware; provide a valid JWT token.

**Success**

- 200 OK — returns the authenticated user object (password excluded). Example:

```json
{
  "_id": "60f1c2d4a1b2c3d4e5f6a7b8",
  "fullname": { "firstname": "Raj", "lastname": "Das" },
  "email": "raj@example.com",
  "socketID": null
}
```

**Errors**

- 401 Unauthorized — when token is missing, invalid, expired, or blacklisted.

**Quick curl example**

```bash
curl -X GET http://localhost:4000/users/profile \
  -H "Authorization: Bearer <jwt-token>"
```

## Users API — /users/logout

**Description**

- Logs out the authenticated user by clearing the `token` cookie (if present) and adding the token to a blacklist so it cannot be reused until it expires.

**URL**

- GET /users/logout

**Headers / Cookies**

- `Authorization: Bearer <token>` or cookie `token`.

**Success**

- 200 OK — JSON message: `{"message":"logged out"}`.

**Errors**

- 400 Bad Request — when no token is provided.
- 401 Unauthorized — when token is invalid or already blacklisted.

**Quick curl example**

```bash
curl -X GET http://localhost:4000/users/logout \
  -H "Authorization: Bearer <jwt-token>"
```

## Captains API

This section documents the captain-facing endpoints: registration, login, profile, and logout.

### POST /captains/registration

Description:

- Register a new captain (driver). Accepts `fullname`, `email`, `password`, and `vehicle` details.

Headers:

- `Content-Type: application/json`

Request body (JSON):

```json
{
  "fullname": { "firstname": "Raj", "lastname": "Das" },
  "email": "raj@example.com",
  "password": "s3cur3P@ssw0rd",
  "vehicle": { "color": "Blue", "plate": "ABC1234", "capacity": 4, "vehicleType": "car" }
}
```

Success:

- 200 OK — returns `{ "token": "<jwt>", "captain": { ... } }` where `captain` omits the password.

Errors:

- 400 Bad Request — validation errors or missing fields.
- 409 Conflict — captain already exists (if implemented).

Quick curl example:

```bash
curl -X POST http://localhost:4000/captains/registration \
  -H "Content-Type: application/json" \
  -d '{"fullname":{"firstname":"Raj","lastname":"Das"},"email":"raj@example.com","password":"s3cur3P@ssw0rd","vehicle":{"color":"Blue","plate":"ABC1234","capacity":4,"vehicleType":"car"}}'
```

### POST /captains/login

Description:

- Authenticate a captain using email and password. Returns a JWT token and captain object.

Headers:

- `Content-Type: application/json`

Request body (JSON):

```json
{ "email": "raj@example.com", "password": "s3cur3P@ssw0rd" }
```

Success:

- 200 OK — returns `{ "token": "<jwt>", "captain": { ... } }` and sets a `token` cookie.

Errors:

- 400 Bad Request — validation errors.
- 401 Unauthorized — invalid email or password.

Quick curl example:

```bash
curl -X POST http://localhost:4000/captains/login \
  -H "Content-Type: application/json" \
  -d '{"email":"raj@example.com","password":"s3cur3P@ssw0rd"}'
```

### GET /captains/profile

Description:

- Returns the authenticated captain's profile. Requires a valid auth token (cookie or `Authorization: Bearer <token>` header).

Headers:

- `Authorization: Bearer <token>` or cookie `token` when using `cookie-parser`.

Authentication:

- Endpoint is protected by `authCaptain` middleware; provide a valid JWT token.

Success:

- 200 OK — returns the authenticated captain object (password excluded).

Errors:

- 401 Unauthorized — when token is missing, invalid, expired, or blacklisted.

Quick curl example:

```bash
curl -X GET http://localhost:4000/captains/profile \
  -H "Authorization: Bearer <jwt-token>"
```

### GET /captains/logout

Description:

- Logs out the authenticated captain by clearing the `token` cookie (if present) and adding the token to a blacklist.

Headers / Cookies:

- `Authorization: Bearer <token>` or cookie `token`.

Success:

- 200 OK — JSON message: `{"message":"logged out"}`.

Errors:

- 400 Bad Request — when no token is provided.
- 401 Unauthorized — when token is invalid or already blacklisted.

Quick curl example:

```bash
curl -X GET http://localhost:4000/captains/logout \
  -H "Authorization: Bearer <jwt-token>"
```

## Maps API

This section documents the map endpoints: geocoding, distance & duration calculation, and location auto-suggestions.

### GET /maps/get-coordinates

**Description**

- Fetch latitude and longitude coordinates for a given address using location services.

**URL**

- GET /maps/get-coordinates

**Headers**

- `Authorization: Bearer <token>` or cookie `token`

**Authentication**

- Endpoint is protected by `authUser` middleware; provide a valid user JWT token.

**Query Parameters**

- `address`: string — required, minimum 3 characters.

Example:
`/maps/get-coordinates?address=Howrah%20Railway%20Station`

**Validation / Errors**

- 400 Bad Request — validation errors (missing address or less than 3 characters).
- 401 Unauthorized — when token is missing or invalid.
- 404 Not Found — when coordinates cannot be found for the given address.

**Success**

- 200 OK — JSON object containing `ltd` (latitude) and `lng` (longitude). Example:

```json
{
  "ltd": 22.5830297,
  "lng": 88.3427845
}
```

**Quick curl example**

```bash
curl -X GET "http://localhost:4000/maps/get-coordinates?address=Howrah%20Railway%20Station" \
  -H "Authorization: Bearer <jwt-token>"
```

### GET /maps/get-distance-time

**Description**

- Calculates distance and estimated travel time between an origin and destination location.

**URL**

- GET /maps/get-distance-time

**Headers**

- `Authorization: Bearer <token>` or cookie `token`

**Authentication**

- Endpoint is protected by `authUser` middleware; provide a valid user JWT token.

**Query Parameters**

- `origin`: string — required, minimum 3 characters.
- `destination`: string — required, minimum 3 characters.

Example:
`/maps/get-distance-time?origin=Howrah%20Railway%20Station&destination=Dakshineswar%20Kali%20Temple`

**Validation / Errors**

- 400 Bad Request — validation errors (missing fields or less than 3 characters).
- 401 Unauthorized — when token is missing or invalid.
- 500 Internal Server Error — server-side error or location service failure.

**Success**

- 200 OK — JSON object containing distance and duration data. Example:

```json
{
  "distance": {
    "text": "14.2 km",
    "value": 14200
  },
  "duration": {
    "text": "32 mins",
    "value": 1920
  }
}
```

**Quick curl example**

```bash
curl -X GET "http://localhost:4000/maps/get-distance-time?origin=Howrah%20Railway%20Station&destination=Dakshineswar%20Kali%20Temple" \
  -H "Authorization: Bearer <jwt-token>"
```

### GET /maps/get-suggestions

**Description**

- Fetch address auto-suggestions based on user search query input.

**URL**

- GET /maps/get-suggestions

**Headers**

- `Authorization: Bearer <token>` or cookie `token`

**Authentication**

- Endpoint is protected by `authUser` middleware; provide a valid user JWT token.

**Query Parameters**

- `input`: string — required, minimum 3 characters.

Example:
`/maps/get-suggestions?input=Howrah`

**Validation / Errors**

- 400 Bad Request — validation errors (missing input or less than 3 characters).
- 401 Unauthorized — when token is missing or invalid.
- 500 Internal Server Error — server-side error or location service failure.

**Success**

- 200 OK — JSON array of string address suggestions. Example:

```json
[
  "Howrah Railway Station, Howrah, West Bengal, India",
  "Howrah Bridge, Kolkata, West Bengal, India",
  "Howrah Maidan, Howrah, West Bengal, India"
]
```

**Quick curl example**

```bash
curl -X GET "http://localhost:4000/maps/get-suggestions?input=Howrah" \
  -H "Authorization: Bearer <jwt-token>"
```

## Rides API

This section documents the ride management endpoints: creating a ride, calculating fares, and managing ride status.

### POST /rides/create

**Description**

- Create a new ride request for the authenticated user. Calculates total fare based on pickup and drop locations and vehicle type, generates a secure 6-digit OTP, and creates a ride record in `pending` status.

**URL**

- POST /rides/create

**Headers**

- `Content-Type: application/json`
- `Authorization: Bearer <token>` or cookie `token`

**Authentication**

- Endpoint is protected by `authUser` middleware; provide a valid user JWT token.

**Request body (JSON)**

- `pickup`: string — required, minimum 3 characters (pickup location)
- `drop`: string — required, minimum 3 characters (drop-off location)
- `vehicleType`: string — required, must be one of `auto`, `car`, `moto`, or `motorcycle`

Example:

```json
{
  "pickup": "Howrah Railway Station",
  "drop": "Dakshineswar Kali Temple",
  "vehicleType": "car"
}
```

**Validation / Errors**

- 400 Bad Request — validation errors (invalid or missing pickup, drop, or vehicleType). Response example:

```json
{
  "errors": [
    { "msg": "Invalid Vehicle Type", "path": "vehicleType", "location": "body" }
  ]
}
```

- 401 Unauthorized — when authentication token is missing or invalid.
- 500 Internal Server Error — server error during coordinate lookup, distance calculation, or database operation.

**Success**

- 201 Created — JSON body contains the created ride object:

```json
{
  "_id": "66a1b2c3d4e5f6a7b8c9d0e1",
  "user": "60f1c2d4a1b2c3d4e5f6a7b8",
  "pickup": "Howrah Railway Station",
  "destination": "Dakshineswar Kali Temple",
  "fare": 268,
  "status": "pending",
  "otp": "492015"
}
```

**Quick curl example**

```bash
curl -X POST http://localhost:4000/rides/create \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <jwt-token>" \
  -d '{"pickup":"Howrah Railway Station","drop":"Dakshineswar Kali Temple","vehicleType":"car"}'
```

### GET /rides/get-fare

**Description**

- Calculates and returns estimated fares for available vehicle types (auto, car, moto) based on pickup and destination locations.

**URL**

- GET /rides/get-fare

**Headers**

- `Authorization: Bearer <token>` or cookie `token`

**Authentication**

- Endpoint is protected by `authUser` middleware; provide a valid user JWT token.

**Query Parameters**

- `pickup`: string — required, minimum 3 characters
- `destination`: string — required, minimum 3 characters

Example:
`/rides/get-fare?pickup=Howrah%20Railway%20Station&destination=Dakshineswar%20Kali%20Temple`

**Validation / Errors**

- 400 Bad Request — validation errors (missing or invalid pickup or destination parameter). Response example:

```json
{
  "errors": [
    { "msg": "Invalid pickup", "param": "pickup", "location": "query" }
  ]
}
```

- 401 Unauthorized — when authentication token is missing or invalid.
- 500 Internal Server Error — server error or location service distance/duration calculation failure.

**Success**

- 200 OK — JSON object containing calculated fares for each vehicle type. Example:

```json
{
  "auto": 172,
  "car": 268,
  "moto": 133,
  "motorcycle": 133
}
```

**Quick curl example**

```bash
curl -X GET "http://localhost:4000/rides/get-fare?pickup=Howrah%20Railway%20Station&destination=Dakshineswar%20Kali%20Temple" \
  -H "Authorization: Bearer <jwt-token>"
```

