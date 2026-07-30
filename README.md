# Setuverse

**Setuverse** is a community gallery for workspace setups. Browse real desk photos, explore every tagged item inside them, save favorites, and share your own setup with the community.

Browsing is open to everyone. Sharing requires an account (Google OAuth).

---

## Features

- **Setup gallery** — Discover published workspace photos by category
- **Tagged items** — Click hotspots on a photo to see monitors, keyboards, and other gear
- **Create flow** — Upload images, place item tags, review, and submit for publishing
- **Social actions** — Like, save, and rate setups
- **Profiles** — Public profiles with setups, likes, saves, and custom links
- **Admin panel** — Moderate setups, manage users, categories, and images
- **Image pipeline** — Cloudflare R2 storage with Sharp-based optimization

---

## Tech stack

| Layer | Technology |
| --- | --- |
| Framework | [TanStack Start](https://tanstack.com/start) (React 19, SSR) |
| Routing & data | TanStack Router, TanStack Query |
| Auth | [Better Auth](https://www.better-auth.com) + Google OAuth |
| Database | PostgreSQL + [Prisma](https://www.prisma.io) |
| Storage | Cloudflare R2 (S3-compatible) |
| UI | Tailwind CSS 4, Radix UI / shadcn-style components |
| Validation | Zod, React Hook Form |
| Runtime / deploy | Nitro (Node server) |
| Package manager | Yarn |

---

## Prerequisites

- **Node.js** `22.14` (see `.nvmrc`)
- **Yarn**
- **Docker** (recommended for PostgreSQL)
- A **Google Cloud OAuth** client (for login)
- A **Cloudflare R2** bucket (for setup images)

---

## Getting started

### 1. Clone and install

```bash
git clone https://github.com/<your-org>/setuverse.git
cd setuverse
yarn install
```

### 2. Environment variables

```bash
cp .env.example .env
```

Fill in the values described in [Environment variables](#environment-variables). At minimum you need a working `DATABASE_URL`, `BETTER_AUTH_SECRET`, Google OAuth credentials, and R2 settings for uploads.

Generate an auth secret:

```bash
openssl rand -base64 32
```

### 3. Start PostgreSQL

```bash
docker compose up -d
```

This starts Postgres 16 using the credentials from your `.env`.

### 4. Prepare the database

```bash
yarn db:generate
yarn db:migrate
yarn db:seed   # optional sample data
```

### 5. Run the app

```bash
yarn dev
```

The app starts at [http://localhost:3000](http://localhost:3000).

---

## Environment variables

Copy from `.env.example`. Important keys:

| Variable | Description |
| --- | --- |
| `POSTGRES_USER` / `POSTGRES_PASSWORD` / `POSTGRES_DB` / `POSTGRES_PORT` | Local Docker Postgres settings |
| `DATABASE_URL` | Prisma connection string |
| `BASE_URL` / `VITE_BASE_URL` | App origin (e.g. `http://localhost:3000`) |
| `BETTER_AUTH_SECRET` | Better Auth signing secret |
| `GOOGLE_CLIENT_ID` / `GOOGLE_CLIENT_SECRET` | Google OAuth credentials |
| `R2_ENDPOINT` / `R2_ACCOUNT_ID` / `R2_ACCESS_KEY_ID` / `R2_SECRET_ACCESS_KEY` / `R2_BUCKET_NAME` / `R2_PUBLIC_URL` | Cloudflare R2 configuration |

Never commit `.env`. Only `.env.example` belongs in the repository.

---

## Project structure

```text
src/
  features/          # Domain modules (auth, home, create-setup, setup, profile, admin, …)
  routes/            # File-based TanStack Router routes
  shared/            # Shared UI, libs, and utilities
  integrations/      # Cross-cutting integrations (e.g. Query)
  generated/         # Prisma client output (gitignored)
prisma/
  schema/            # Split Prisma models
  migrations/        # SQL migrations
  seed.ts            # Seed script
```

Feature code is organized by domain (`screen`, `components`, `server`, `service`, `lib`) so UI, server functions, and hooks stay close to the feature they belong to.

---

## Scripts

| Command | Description |
| --- | --- |
| `yarn dev` | Generate Prisma client and start Vite dev server on port 3000 |
| `yarn build` | Production build |
| `yarn start` | Run the Nitro production server (`.output/server/index.mjs`) |
| `yarn test` | Run Vitest |
| `yarn lint` / `yarn format` / `yarn check` | Lint and format |
| `yarn db:generate` | Generate Prisma client |
| `yarn db:migrate` | Create / apply migrations (dev) |
| `yarn db:deploy` | Apply migrations (production) |
| `yarn db:push` | Push schema without a migration (prototyping) |
| `yarn db:seed` | Seed the database |
| `yarn db:studio` | Open Prisma Studio |
| `yarn test:r2` | Smoke-test R2 upload credentials |

---

## Database

Prisma schemas live under `prisma/schema/` and map to PostgreSQL.

Core domain models:

- **User / Session / Account** — Better Auth identity
- **Profile / ProfileLink** — Public profile data
- **Setup** — Draft → pending → published (or rejected) workspace posts
- **SetupItem** — Tagged products on a setup image
- **Category** — Setup categories
- **SetupLike / SetupSave / SetupRate** — Engagement

Useful workflow:

```bash
yarn db:migrate     # change schema + create migration
yarn db:studio      # inspect data
```

---

## Authentication

Auth is handled by Better Auth with a Prisma adapter and Google as the social provider. Sessions use TanStack Start cookies.

On first sign-in, a related `Profile` row is created automatically.

Configure the Google OAuth redirect URI to match your `BASE_URL` (for local development: `http://localhost:3000/api/auth/callback/google` — confirm against your Better Auth / Google Cloud console settings).

---

## Media storage (R2)

Setup images are uploaded to Cloudflare R2. The create flow optimizes images with Sharp before storage.

Ensure `R2_PUBLIC_URL` points at a publicly readable URL for your bucket (custom domain or `r2.dev` URL).

---

## Deployment

### Production build (Node)

```bash
yarn build
yarn start
```

### Docker

A multi-stage `Dockerfile` builds and runs the app. Migrations run on container start via `docker-entrypoint.sh`.

Typical flow:

1. Provide production env vars (database, auth, R2, `BASE_URL`)
2. Ensure Postgres is reachable
3. Build and run the image

Local Postgres for development remains available via `docker compose up -d`.

---

## Contributing

Contributions are welcome.

1. Fork the repository and create a feature branch
2. Keep changes focused and consistent with the existing feature-based layout
3. Run `yarn lint` and `yarn test` before opening a PR
4. Describe the motivation and how to verify the change

If you are fixing a bug, include steps to reproduce. If you are proposing a larger feature, open an issue first so scope can be discussed.

---

## Roadmap ideas

- Additional OAuth providers
- Richer discovery (search, filters, collections)
- Moderation tooling improvements

---

## License

License to be decided. Until a `LICENSE` file is added, all rights are reserved by the author(s). If you plan to use or redistribute this project, open an issue to confirm terms.

---

## Acknowledgments

Built with [TanStack](https://tanstack.com), [Better Auth](https://www.better-auth.com), [Prisma](https://www.prisma.io), and [Cloudflare R2](https://www.cloudflare.com/developer-platform/r2/).
