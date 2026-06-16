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
