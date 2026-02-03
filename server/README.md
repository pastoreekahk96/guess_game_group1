# Email Backend (Node)

This simple Express server receives submissions from JoinUs and ContactUs forms and emails them to `pccliberia2025@gmail.com` by default.

## Setup

1. Install dependencies:
   ```bash
   cd server
   npm install
   ```

2. Create a `.env` file (see `.env.example`) and set SMTP credentials.
3. Start the server:
   ```bash
   npm run start
   ```

## Endpoints

### `POST /api/join-us`

**Body (JSON):**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "phone": "+231555000",
  "message": "I want to join"
}
```

### `POST /api/contact-us`

**Body (JSON):**
```json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "subject": "Question",
  "message": "Hello!"
}
```

## Notes
- The destination email defaults to `pccliberia2025@gmail.com`. You can override it with `TO_EMAIL`.
- `FROM_EMAIL` must be a valid sender for your SMTP provider.
