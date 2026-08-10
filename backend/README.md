# Portfolio backend

Spring Boot 4 REST API backing the portfolio frontend: projects, blog posts, and skills are
managed through an admin-only API (JWT auth), and the public contact form persists messages
and emails a notification.

## Requirements

- Java 21
- A local PostgreSQL server, managed via pgAdmin

## Running locally

1. Open **pgAdmin 4** (bundled with the local PostgreSQL install), connect to your local server,
   and create a database named `portfolio`:
   right-click **Databases** → **Create** → **Database...** → name it `portfolio` → Save.
2. Set the DB credentials and admin credentials as environment variables. The defaults in
   `application.yml` assume `postgres`/`postgres` on `localhost:5432` — override if your local
   server uses a different superuser password:
   ```
   set DB_URL=jdbc:postgresql://localhost:5432/portfolio
   set DB_USERNAME=postgres
   set DB_PASSWORD=your-postgres-password
   set ADMIN_USERNAME=admin
   set ADMIN_PASSWORD=change-me
   ```
3. Run the app:
   ```
   mvnw.cmd spring-boot:run
   ```

On startup, Flyway creates all tables (`V1__init.sql`) automatically — no manual schema/table
creation needed in pgAdmin beyond creating the empty `portfolio` database itself.

The app reads its config from environment variables (see `application.yml` for the full list
and defaults): `DB_URL`, `DB_USERNAME`, `DB_PASSWORD`, `MAIL_HOST`, `MAIL_PORT`, `MAIL_USERNAME`,
`MAIL_PASSWORD`, `JWT_SECRET`, `JWT_EXPIRATION_MS`, `CORS_ALLOWED_ORIGINS`, `CONTACT_NOTIFY_TO`,
`ADMIN_USERNAME`, `ADMIN_PASSWORD`.

**Before deploying to production**, set a real `JWT_SECRET` (a long random string) and real
`MAIL_USERNAME`/`MAIL_PASSWORD` (an SMTP account or app password) — the defaults in
`application.yml` are dev-only placeholders.

Admin seeding only runs once: if `admin_user` already has a row, `ADMIN_USERNAME`/`ADMIN_PASSWORD`
are ignored on subsequent boots.

## API overview

Public (no auth):
- `GET /api/projects`, `GET /api/projects/{id}`
- `GET /api/blog`, `GET /api/blog/{slug}`
- `GET /api/skills`
- `POST /api/contact`

Admin (`Authorization: Bearer <token>` from `/api/auth/login`):
- `POST /api/auth/login`
- `POST|PUT|DELETE /api/admin/projects[/{id}]`
- `POST|PUT|DELETE /api/admin/blog[/{id}]`
- `POST|PUT|DELETE /api/admin/skills[/{id}]`
- `GET /api/admin/contact-messages`, `PATCH /api/admin/contact-messages/{id}/read`

Swagger UI: `/swagger-ui.html` (not exposed to the public in the current CORS config, dev use only).

## Build

```
mvnw.cmd compile      # verify it compiles
mvnw.cmd test-compile # verify tests compile
mvnw.cmd package       # produce the runnable jar
```
