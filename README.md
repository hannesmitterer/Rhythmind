# Rhythmind
sentimento rhythmind gate

## ALO-001: Google OAuth Authentication & Role-Based Access Control

This repository implements Google OAuth authentication with role-based access control for the Rhythmind platform.

### Features

- **Google OAuth Authentication**: Verify users via Google ID tokens
- **Role-Based Access Control**: 
  - **Council**: Access to `/sfi` and `/mcl/live` endpoints
  - **Seedbringer**: Access to `/allocations` endpoint
- **Environment-based Configuration**: Manage allowlists via `.env` file
- **TypeScript Backend**: Express server with type safety

### Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   
   Copy `.env.example` to `.env` and configure:
   ```bash
   cp .env.example .env
   ```
   
   Update the following in `.env`:
   - `GOOGLE_CLIENT_ID`: Your Google OAuth Client ID from [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - `SEEDBRINGER_ALLOWLIST`: Comma-separated list of email addresses with Seedbringer role
   - `COUNCIL_ALLOWLIST`: Comma-separated list of email addresses with Council role

3. **Configure Frontend**
   
   Update `public/pbl-001/index.html` line 176 with your Google Client ID:
   ```html
   <div id="g_id_onload"
        data-client_id="YOUR_ACTUAL_CLIENT_ID.apps.googleusercontent.com"
        data-callback="handleCredentialResponse">
   ```

4. **Build the Backend**
   ```bash
   npm run build
   ```

5. **Start the Server**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

### API Endpoints

- `GET /health` - Health check (no auth required)
- `GET /sfi` - SFI access (requires Council role)
- `GET /mcl/live` - MCL Live data (requires Council role)
- `POST /allocations` - Submit allocations (requires Seedbringer role)

### Frontend

Access the Google Sign-In interface at:
```
http://localhost:3000/pbl-001/index.html
```

### CI/CD

GitHub Actions workflow (`.github/workflows/alo-001-ci.yml`) automatically:
- Builds TypeScript code
- Verifies `.env.example` exists and contains required variables
- Runs tests

### Security

- All protected endpoints require a valid Google ID token in the `Authorization: Bearer <token>` header
- Role verification is performed server-side via email allowlists
- Environment variables should never be committed to the repository
