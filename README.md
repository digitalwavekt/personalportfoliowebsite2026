# KT — Personal Portfolio Website

Ultra-dark, electric-orange portfolio with Three.js 3D animations, admin panel, and MongoDB backend.

## Tech Stack

- **Frontend:** React + Vite, Three.js (neural mesh hero), React Router
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose)
- **Styling:** Pure CSS with CSS variables, custom cursor, glass effects

---

## Quick Setup

### 1. Install dependencies
```bash
npm install          # installs concurrently at root
npm run install:all  # installs client + server packages
```

### 2. Configure environment

**Server** — copy `server/.env.example` → `server/.env`
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/kt_portfolio
ADMIN_PASSWORD=your_secure_password
CLIENT_URL=http://localhost:5173
```

**Client** — copy `client/.env.example` → `client/.env`
```env
VITE_ADMIN_PASSWORD=your_secure_password
```
> Both passwords must match.

### 3. Start development
```bash
npm run dev
```
- Frontend: http://localhost:5173
- Backend:  http://localhost:5000
- Admin:    http://localhost:5173/admin

---

## Customise Your Info

### Personal details — edit these files:
| What | File |
|------|------|
| Name, bio, location | `client/src/components/About.jsx` |
| Social media links | `client/src/components/Hero.jsx` (SOCIAL array) |
| Contact email/phone | `client/src/components/Contact.jsx` |
| Footer links | `client/src/components/Footer.jsx` |
| Profile photo | `client/src/components/About.jsx` — replace placeholder div with `<img src="/photo.jpg" />` |
| Services offered | `client/src/components/Services.jsx` (SERVICES array) |
| Tech stack chips | `client/src/components/About.jsx` (STACKS array) |

### Add your photo
1. Place `photo.jpg` in `client/public/`
2. In `About.jsx`, replace the placeholder div with:
```jsx
<img src="/photo.jpg" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
```

---

## Admin Panel

Go to `/admin` → enter your `VITE_ADMIN_PASSWORD`.

### Features:
- **Dashboard** — project count, message count, review count
- **Projects** — add/edit/delete portfolio projects with stack tags, links, status
- **Messages** — view all contact form submissions, expand + delete
- **Reviews** — add/edit/delete client testimonials shown in marquee

---

## Production Deployment

### Option A: Vercel (frontend) + Railway (backend)
1. Push to GitHub
2. Deploy `client/` to Vercel — set `VITE_ADMIN_PASSWORD` env var
3. Deploy `server/` to Railway — set all `.env` vars + `MONGO_URI` from Atlas

### Option B: Single server (VPS)
```bash
npm run build          # builds React into client/dist
NODE_ENV=production npm start  # Express serves both API + static files
```

### MongoDB Atlas (recommended for production)
1. Create free cluster at mongodb.com/atlas
2. Whitelist `0.0.0.0/0` in Network Access
3. Get connection string → paste as `MONGO_URI`

---

## Project Structure

```
kt-portfolio/
├── client/                  # React frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx   # Sticky nav with scroll detection
│   │   │   ├── Hero.jsx     # Three.js neural mesh + social links
│   │   │   ├── About.jsx    # Stats, stack, bio
│   │   │   ├── Services.jsx # 3D tilt hover service cards
│   │   │   ├── Projects.jsx # API-fetched project grid
│   │   │   ├── Ratings.jsx  # Infinite auto-scroll marquee
│   │   │   ├── Contact.jsx  # Form + address + socials
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx     # Assembles all sections
│   │   │   └── Admin.jsx    # Full admin panel
│   │   ├── App.jsx
│   │   └── index.css        # Design system / CSS variables
│   └── index.html
└── server/                  # Node.js backend
    ├── models/
    │   ├── Project.js
    │   ├── Contact.js
    │   └── Rating.js
    ├── routes/
    │   ├── projects.js      # GET/POST/PUT/DELETE /api/projects
    │   ├── contact.js       # POST/GET/DELETE /api/contact
    │   └── ratings.js       # GET/POST/DELETE /api/ratings
    └── index.js             # Express server entry point
```

---

## API Reference

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/projects` | All projects |
| POST | `/api/projects` | Add project |
| PUT | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | Get all messages (admin) |
| DELETE | `/api/contact/:id` | Delete message |
| GET | `/api/ratings` | All visible ratings |
| POST | `/api/ratings` | Add rating |
| DELETE | `/api/ratings/:id` | Delete rating |

---

Built with ❤️ by KT — Digital Wave IT Solutions Pvt Ltd
