# Sample Vuln Repo

A small Express API for user registration, login, and profile management.

## Installation

```
npm install
```

## Usage

```
npm start
```

The server runs on port 3000 by default.

## API Reference

- `POST /api/users/register` — register a new user
- `POST /api/users/login` — log in and receive a JWT
- `GET /api/users/profile/:username` — view a user profile
- `POST /api/users/profile/bio` — update a user's bio
- `GET /health` — health check

## Testing

```
npm test
```

Runs the Jest + Supertest suite.
