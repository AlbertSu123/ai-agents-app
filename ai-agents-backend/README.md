# AI Agents Backend

## Quickstart
`npm i`
`npm run dev`

A NestJS-based backend application for AI Agents platform.

## Description

This backend service provides the API infrastructure for the AI Agents platform, handling user management, bounties, tweets, and other core functionalities. Built with NestJS, TypeORM, and PostgreSQL.

## Technologies

- **Framework**: NestJS
- **Database**: PostgreSQL with TypeORM
- **Authentication**: JWT
- **WebSockets**: WS
- **Blockchain Integration**: Solana Web3.js, Helius SDK
- **Other**: Redis for caching, PostHog for analytics

## Prerequisites

- Node.js (v16+)
- PostgreSQL
- Redis (optional, for caching)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/ai-agents-backend.git
   cd ai-agents-backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file based on the template:
   ```bash
   cp .env.template .env
   ```

4. Fill in the required environment variables in the `.env` file:
   - `DATABASE_URL`: PostgreSQL connection string
   - `PRIVY_APP_ID`: Your Privy App ID
   - `PRIVY_APP_SECRET`: Your Privy App Secret
   - `PRIVATE_KEY`: Private key for signing

## Database Setup

1. Run database migrations:
   ```bash
   npm run migration:run
   ```

## Running the Application

### Development Mode

```bash
npm run dev
```

### Production Mode

```bash
npm run build
npm run start:prod
```

## API Endpoints

The API is accessible at `/api` with the following modules:

- User Management
- Bounties
- Tweets

## Database Migrations

- Generate a new migration:
  ```bash
  npm run migration:generate
  ```

- Run migrations:
  ```bash
  npm run migration:run
  ```

- Revert the last migration:
  ```bash
  npm run migration:revert
  ```

## Utilities

- Format code:
  ```bash
  npm run format
  ```

- Lint code:
  ```bash
  npm run lint
  ```

- Truncate database (for development):
  ```bash
  npm run truncate
  ```

## WebSocket Support

The application supports WebSocket connections for real-time features.

## License

This project is licensed under the UNLICENSED license.

## Author

Sweep
