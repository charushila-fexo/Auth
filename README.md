**Auth**

**Project Overview**
- **Description**: Simple Node.js authentication example using MongoDB and JWTs.
- **Stack**: Node.js , Mongoose, JSON Web Tokens, Docker (optional).

**Prerequisites**
- **Node**: Install Node.js 18+.
- **npm**: Included with Node.js.
- **Docker (optional)**: Install Docker Engine and Docker Compose if using containers.

**Environment Variables**
- **MONGO_URI**: MongoDB connection string.
- **JWT_SECRET**: Secret used to sign JWT tokens.
- **PORT**: Server port (default 5000).

Example `.env`:

```env
MONGO_URI=mongodb://localhost:27017/auth
JWT_SECRET=mysecrettoken
PORT=5000
```

**Quick Start — Run Locally (no Docker)**
- **Install**: Run dependencies.

```bash
npm install
```

- **Add env**: Create a `.env` file in the project root (see example above).
- **Run**: Start the server.

```bash
npm start
```

- **Dev**: If the project includes a dev script (e.g., nodemon), use:

```bash
npm run dev
```

The server listens on the port defined by `PORT` (defaults to `5000`).

**Run with Docker Compose**
- **Compose**: Use the provided `docker-compose.yml` to run the app and a MongoDB service together.

```bash
docker compose up --build
```

- Environment variables are injected by the compose file; see `docker-compose.yml` for defaults (MONGO_URI and JWT_SECRET).
- To run in detached mode:

```bash
docker compose up -d --build
```

- To stop and remove containers:

```bash
docker compose down
```

**Run with Docker (manual)**
- **Build** image from the `Dockerfile`:

```bash
docker build -t auth-app .
```

- **Run** container (example exposing port 5000):

```bash
docker run -e MONGO_URI="mongodb://host.docker.internal:27017/auth" -e JWT_SECRET="mysecrettoken" -p 5000:5000 auth-app
```

Note: On Windows, `host.docker.internal` maps to the host machine so containers can reach a locally running MongoDB instance.

**Useful Files**
- **Server entry**: [server.js](server.js)
- **DB config**: [config/db.js](config/db.js)
- **Auth routes**: [routes/auth.js](routes/auth.js)
- **Dockerfile**: [Dockerfile](Dockerfile)
- **Compose config**: [docker-compose.yml](docker-compose.yml)

**Notes**
- The project expects the following env variables; defaults are provided in `.env` and `docker-compose.yml` in this repository.
- JWT signing and verification depend on `JWT_SECRET` (keep this secret in production).
- The repo uses Mongoose for MongoDB; ensure a running MongoDB instance is reachable via `MONGO_URI`.

If you'd like, I can also add a short `Makefile` or npm scripts for common tasks (start, dev, docker-up).