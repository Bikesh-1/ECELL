# E-Cell SMVIT Event Portal

Next.js App Router + Tailwind CSS + PostgreSQL + Prisma + Auth.js.

## Roles and access
- USER: anyone can register directly, browse published events and register for events.
- CORE: verified E-Cell core members can access the Core Team Dashboard, create/publish events and view/export registrations.
- Public signup always creates USER. Role cannot be selected or changed from the signup form.
- Core access is granted only to addresses listed in the private server-side CORE_EMAILS environment variable after those people have signed up. Never expose CORE_EMAILS as a NEXT_PUBLIC variable.

## Event features
- Core members can upload event posters to Cloudinary and publish event descriptions, dates, venue, prize pool and organiser contact details.
- Events can be configured for solo participation, team participation, or both, with minimum and maximum team sizes.
- Events can be free or paid. Paid events display the configured entry fee; payment collection is not enabled until a payment gateway is integrated.
- Core members can add round-wise titles and descriptions.
- Public event detail pages show the poster, event information, prize pool, rounds and contact number.
- Registration collects participant phone number and college name. Team registrations collect each additional member's name, email, phone and college.
- Core registration views show participant/team details and export them as CSV.

## Local setup
1. Use Node.js 20.9+ and PostgreSQL (Neon works).
2. Copy `.env.example` to `.env` and set DATABASE_URL, AUTH_SECRET, AUTH_URL and CORE_EMAILS.
3. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET to enable poster uploads.
4. Install dependencies: `npm install`.
5. Generate Prisma client: `npx prisma generate`.
6. Apply the updated schema: `npx prisma db push`. Back up any existing production database before applying schema changes.
7. Every core member must create a normal account using their own email first.
8. Put all core-member signup emails in CORE_EMAILS, comma-separated, then run `npm run db:seed`.
9. Restart the dev server and have core members sign out and sign in again so their role is refreshed in the session.
10. Start: `npm run dev`.

## Main routes
- `/signup`, `/login`, `/events`, `/events/[id]`, `/events/register/[id]`, `/my-registrations`
- `/admin` (CORE only), `/admin/events/new`, `/admin/events/[id]`

## Security
- Passwords use bcrypt hashing and Auth.js JWT sessions.
- API routes check CORE permissions server-side.
- A unique database constraint prevents duplicate event registrations.
- Keep DATABASE_URL, AUTH_SECRET, CORE_EMAILS and Cloudinary credentials private. Use HTTPS in production.
