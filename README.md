# 🐵 MonkeyPaste — MERN Stack (Serverless)

> Share text like a monkey shares bananas 🍌

A full-stack MERN paste sharing app. Enter text, get a 6-digit code, share instantly. No sign-up required.

## 📁 Project Structure

```
MonkeyPaste/
├── client/          ← React JS frontend (Vite + Tailwind + Shadcn UI)
│   ├── netlify/     ← Netlify Serverless Functions (Node.js API routes)
│   │   └── functions/
│   │       ├── db.js
│   │       ├── create-paste.js
│   │       └── get-paste.js
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   └── lib/
│   ├── public/
│   ├── package.json
│   ├── netlify.toml
│   └── vite.config.js
```

## 🚀 Run Locally

The entire app (frontend + serverless functions) runs inside the `client/` folder.
Netlify CLI allows you to run both the frontend and functions together locally.

```bash
cd client
cp .env.example .env   # fill in your MONGODB_URI
npm install
npm i -g netlify-cli
netlify dev
```

## 🌐 Deployment

| Part | Platform | Description |
|------|----------|-------------|
| Frontend & API | Netlify | React App + Netlify Functions |
| Database | MongoDB Atlas | Free 512MB cluster |

## ⚙️ Environment Variables

Add this environment variable to your Netlify dashboard (`Site configuration` > `Environment variables`):

**`MONGODB_URI`**
```
mongodb+srv://youruser:yourpassword@cluster0.xxxxx.mongodb.net/monkeypaste
```

## 🛠️ Tech Stack
- **M** — MongoDB Atlas (database)
- **E** — Express/Node.js logic (via Netlify Functions)
- **R** — React JS (frontend)
- **N** — Node.js (runtime)
