# E-Cell SMVIT Event Portal

Next.js App Router + PostgreSQL + Prisma event portal with a President-only admin dashboard.

## Features
- Email/password signup and login using Auth.js credentials, JWT sessions and bcrypt password hashing.
- Roles: USER and ADMIN. Public signup always creates USER; it never accepts a role from the browser.
- President account is provisioned separately through a trusted seed script.
- Admin can create/publish events, edit/close/delete events and view registrations.
- Students from any college can register directly, subject to deadline and capacity.
- Database unique constraint prevents duplicate registrations.
- Students can view their registrations; admin can export event registrations to CSV.

## Setup
1. Use Node.js 20.9+ and a PostgreSQL database (Neon is supported).
2. Copy `.env.example` to `.env`.
3. Set `DATABASE_URL`, a strong random `AUTH_SECRET`, `AUTH_URL=http://localhost:3000`, `PRESIDENT_EMAIL`, `PRESIDENT_NAME`, and `PRESIDENT_INITIAL_PASSWORD`.
4. Run `npm install`.
5. Run `npx prisma generate`.
6. Run `npx prisma migrate dev --name init` (or `npm run db:push` for local prototyping).
7. Run `npm run db:seed` to create/promote the one President account.
8. Run `npm run dev`.

Keep the President seed password private; rotate it after first login. Never use NEXT_PUBLIC_ for secrets.

## Routes
- `/`, `/signup`, `/login`
- `/events`, `/events/register/[id]`, `/my-registrations`
- `/admin`, `/admin/events/new`, `/admin/events/[id]`

## API
- `POST /api/signup`; Auth.js endpoints at `/api/auth/*`
- `GET /api/events`, `POST /api/events` (ADMIN only)
- `GET/POST /api/registrations`
- `GET/PATCH/DELETE /api/admin/events/[id]` (ADMIN only)
- `GET /api/admin/events/[id]/registrations` (ADMIN only)

Before production, add email verification, rate limiting, backups and monitoring; configure HTTPS and a strong unique auth secret.
