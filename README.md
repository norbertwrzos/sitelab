# SiteLab - Website Design Company MVP

A modern website for a web design company offering 24-hour demo previews and lead collection. Built with Next.js 14, TypeScript, Tailwind CSS, and PostgreSQL.

## Features

- 🎨 **Modern, Responsive Design** - Beautiful UI with smooth animations
- ⚡ **24-Hour Demo Request System** - Clients can request free website previews
- 📊 **Lead Management Dashboard** - Admin panel to manage leads and demos
- 📧 **Automated Emails** - Confirmation emails with Resend
- 🔒 **Secure Admin Panel** - Protected with NextAuth.js
- 🛡️ **Spam Protection** - hCaptcha on all forms

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL + Prisma ORM
- **Authentication**: NextAuth.js
- **Email**: Resend
- **Forms**: React Hook Form + Zod
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd sitelab
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   Edit `.env.local` with your configuration:
   - `DATABASE_URL` - PostgreSQL connection string
   - `NEXTAUTH_SECRET` - Random secret (generate with `openssl rand -base64 32`)
   - `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` - hCaptcha site key
   - `HCAPTCHA_SECRET_KEY` - hCaptcha secret key
   - `RESEND_API_KEY` - Resend API key for emails

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate

   # Push schema to database
   npm run db:push

   # Seed with sample data
   npm run db:seed
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open in browser**
   Visit [http://localhost:3000](http://localhost:3000)

### Admin Access

After running the seed script, you can access the admin dashboard:

- **URL**: [http://localhost:3000/admin](http://localhost:3000/admin)
- **Email**: `admin@sitelab.com`
- **Password**: `admin123`

⚠️ **Important**: Change the default password in production!

## Project Structure

```
sitelab/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed script
├── src/
│   ├── app/               # Next.js app router pages
│   │   ├── admin/         # Admin dashboard
│   │   ├── api/           # API routes
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   ├── portfolio/     # Portfolio page
│   │   ├── services/      # Services page
│   │   └── page.tsx       # Homepage
│   ├── components/
│   │   ├── admin/         # Admin components
│   │   ├── forms/         # Form components
│   │   ├── layout/        # Header, Footer
│   │   ├── sections/      # Homepage sections
│   │   └── ui/            # Reusable UI components
│   ├── lib/               # Utilities and config
│   ├── services/          # Business logic
│   └── types/             # TypeScript types
├── public/                # Static assets
└── package.json
```

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to database |
| `npm run db:migrate` | Run database migrations |
| `npm run db:seed` | Seed database with sample data |
| `npm run db:studio` | Open Prisma Studio |

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | ✅ |
| `NEXTAUTH_URL` | App URL for NextAuth | ✅ |
| `NEXTAUTH_SECRET` | Secret for NextAuth encryption | ✅ |
| `NEXT_PUBLIC_APP_URL` | Public app URL | ✅ |
| `NEXT_PUBLIC_HCAPTCHA_SITE_KEY` | hCaptcha site key | ✅ |
| `HCAPTCHA_SECRET_KEY` | hCaptcha secret key | ✅ |
| `RESEND_API_KEY` | Resend API key | ✅ |
| `EMAIL_FROM` | Sender email address | Optional |
| `ADMIN_EMAIL` | Admin notification email | Optional |

## API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/leads` | Submit a lead |
| `POST` | `/api/demo-requests` | Submit a demo request |
| `POST` | `/api/contact` | Submit contact form |

### Admin Endpoints (Protected)

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/leads` | List all leads |
| `GET` | `/api/leads/[id]` | Get single lead |
| `PATCH` | `/api/leads/[id]` | Update lead status |
| `DELETE` | `/api/leads/[id]` | Delete lead |
| `GET` | `/api/demo-requests` | List all demo requests |
| `GET` | `/api/demo-requests/[id]` | Get single demo request |
| `PATCH` | `/api/demo-requests/[id]` | Update demo request |
| `DELETE` | `/api/demo-requests/[id]` | Delete demo request |
| `GET` | `/api/stats` | Get dashboard statistics |

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy!

### Docker

```dockerfile
# Example Dockerfile
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
EXPOSE 3000
CMD ["npm", "start"]
```

## Customization

### Colors

Edit `tailwind.config.ts` to change the color scheme:

```typescript
colors: {
  primary: {
    // Your primary color palette
  },
  accent: {
    // Your accent color palette  
  },
}
```

### Site Configuration

Edit `src/lib/config.ts` to update:
- Site name and contact info
- Navigation links
- Services offered
- Stats and testimonials

## License

This project is proprietary software. All rights reserved.

---

Built with ❤️ by SiteLab
