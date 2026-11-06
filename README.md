# Khristian Jose Guinto — Portfolio

Personal portfolio website built with **React (Vite)** on the frontend and **Express.js** on the backend.

## Tech stack

| Part | Technology | Why |
| --- | --- | --- |
| Frontend | React 18 + Vite | Vite is the build tool/dev server for React: fast reloads and an optimized production build |
| Styling | Plain CSS (one file per section) | No framework needed; colors and fonts live as variables in `client/src/styles/global.css` |
| Fonts | `@fontsource/*` packages | Self-hosted Google Fonts (Anton, Bodoni Moda, Inter, Mrs Saint Delafield), with no external requests |
| Backend | Node.js + Express.js | REST API serving the portfolio content and handling the contact form |
| `cors` | Express middleware | Lets the dev frontend (port 5173) call the API (port 5000) |
| `dotenv` | Config | Reads settings like SMTP credentials from `server/.env` |
| `express-rate-limit` | Security | Limits contact-form spam (5 messages / 15 min per visitor) |
| `nodemailer` | Email | Sends contact-form messages to your inbox when SMTP is configured |
| `concurrently` | Dev tool | Runs the client and server with one command |

## Folder structure

```
Tian_Portfolio/
├─ package.json            ← root scripts (install:all, dev, build, start)
├─ client/                 ← React frontend
│  ├─ index.html
│  ├─ vite.config.js       ← proxies /api to the Express server in dev
│  ├─ public/images/       ← your photo + project images
│  └─ src/
│     ├─ App.jsx           ← loads data from the API and renders all sections
│     ├─ api.js            ← fetch helpers
│     ├─ components/       ← Header, Footer, Icon, ProjectModal, ...
│     ├─ sections/         ← Hero, About, Projects, Skills, Experience, Certifications, Contact
│     ├─ hooks/            ← scroll-reveal + active-nav-link hooks
│     └─ styles/           ← global.css (design tokens) + one CSS file per section
└─ server/                 ← Express backend
   ├─ .env.example         ← copy to .env
   └─ src/
      ├─ index.js          ← server entry
      ├─ data/portfolio.js ← ★ ALL website content lives here
      ├─ routes/           ← /api/portfolio, /api/projects, /api/contact
      └─ utils/            ← validation + mailer
```

## Run it locally

Requirements: **Node.js 18.18 or newer** (check with `node -v`). Download it from https://nodejs.org (LTS).

Open a terminal in the `Tian_Portfolio` folder (in VS Code: *Terminal → New Terminal*), then:

```bash
# 1. Install everything (root, server and client) — only needed once
npm run install:all

# 2. Create your server settings file
#    Windows (PowerShell):  copy server\.env.example server\.env
#    macOS / Linux:         cp server/.env.example server/.env

# 3. Start the frontend and backend together
npm run dev
```

Open **http://localhost:5173**. Edits to React files reload instantly.

## Production build

```bash
npm run build     # builds the React app into client/dist
npm start         # Express serves the API and the built site on http://localhost:5000
```

## Deploy to Vercel

The project is ready for Vercel: `vercel.json` builds the React app, and `api/index.js` runs the Express API as a serverless function.

1. Push this folder to a GitHub repository (`.env` is ignored, so your passwords stay private).
2. On https://vercel.com, click **Add New → Project**, import the repository, and leave all build settings as they are.
3. Under **Environment Variables**, add `SMTP_USER`, `SMTP_PASS` and `CONTACT_TO` (the same values as `server/.env`).
4. Click **Deploy**.

Every push to GitHub after that redeploys the site automatically.

Other Node hosts (Render, Railway) also work: build command `npm run install:all && npm run build`, start command `npm start`, and set `NODE_ENV=production`.

## API endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/health` | Server status |
| GET | `/api/portfolio` | All content (profile, skills, projects, experience, education, certifications) |
| GET | `/api/projects` | All projects |
| GET | `/api/projects/:id` | One project (`savr`, `teddiursa`) |
| GET | `/api/certifications` | Certifications |
| POST | `/api/contact` | Contact form: `{ name, email, subject?, message }` |

## Contact form email

Without SMTP settings, messages are saved to `server/data/messages.json`. To receive them by email, fill in `server/.env`:

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your.gmail@gmail.com
SMTP_PASS=your-16-character-app-password
CONTACT_TO=kdguinto@fit.edu.ph.com
```

For Gmail, create an **App Password** (Google Account → Security → 2-Step Verification → App passwords). Never commit `.env` to GitHub; it's already in `.gitignore`.

## Updating content

- **Text, projects, skills, certifications:** edit `server/src/data/portfolio.js` and restart the server.
- **Photo:** replace `client/public/images/khristian.jpg` (square, at least 800×800 px recommended).
- **Project images:** add files to `client/public/images/projects/` and update the `image` path in `portfolio.js`.
- **Colors / fonts:** edit the variables at the top of `client/src/styles/global.css`.
