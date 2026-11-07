# E-Cell SMVIT Event Portal

Next.js App Router + Tailwind CSS + PostgreSQL + Prisma + Auth.js.

## Roles and access
- USER: anyone can register directly, browse published events and register for events.
- CORE: verified E-Cell core members can access the Core Team Dashboard, create/publish/update/close events and view/export registrations.
- Public signup always creates USER. Role cannot be selected or changed from the signup form.
- Core access is granted only to addresses listed in the private server-side CORE_EMAILS environment variable after those people have signed up. Never expose CORE_EMAILS as a NEXT_PUBLIC variable.

## Local setup
1. Use Node.js 20.9+ and PostgreSQL (Neon works).
2. Copy `.env.example` to `.env` and set DATABASE_URL, AUTH_SECRET, AUTH_URL and CORE_EMAILS.
3. Install dependencies: `npm install`.
4. Generate Prisma client: `npx prisma generate`.
5. Apply the schema: `npx prisma db push` (or create a migration with `npx prisma migrate dev --name core-roles`).
6. Every core member must create a normal account using their own email first.
7. Put all core-member signup emails in CORE_EMAILS, comma-separated, then run `npm run db:seed`.
8. Restart the dev server and have core members sign out and sign in again so their role is refreshed in the session.
9. Start: `npm run dev`.

## Main routes
- `/signup`, `/login`, `/events`, `/my-registrations`
- `/admin` (CORE only), `/admin/events/new`, `/admin/events/[id]`

## Security
- Passwords use bcrypt hashing and Auth.js JWT sessions.
- API routes check CORE permissions server-side.
- A unique database constraint prevents duplicate event registrations.
- Keep DATABASE_URL, AUTH_SECRET and CORE_EMAILS private. Use HTTPS in production.
