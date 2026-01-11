# ExpressProject

Simple Express CRUD API with JWT authentication using Prisma + SQLite for local development.

Endpoints:
- POST /auth/register { email, password, name }
- POST /auth/login { email, password }
- GET /items (protected)
- POST /items (protected)
- GET /items/:id (protected)
- PUT /items/:id (protected)
- DELETE /items/:id (protected)

API docs (Swagger UI):
- Open http://localhost:3000/docs to view and test endpoints in the browser

Run:
- cp .env.example .env
- npm install
- npx prisma generate
- npx prisma migrate dev --name init
- npm run dev
