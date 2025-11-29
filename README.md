# 🐾 Panther Budget Buddy

A FIU student finance tracker built with React, Vite, and Supabase. Manage your expenses, track spending goals, and visualize your financial data with interactive charts.

## 📋 Table of Contents
* [Prerequisites](#prerequisites)
* [Installation](#installation)
* [Running Locally](#running-locally)
* [Project Structure](#project-structure)
* [Tech Stack](#tech-stack)
* [Features](#features)
* [Troubleshooting](#troubleshooting)

## 🔧 Prerequisites

Before you begin, make sure you have the following installed:
* **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
* **npm** (comes with Node.js) or yarn
* **Git** - [Download](https://git-scm.com/)

## 📦 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/MarcosPerezLabrada/Panther-Budget-Buddy.git
cd Panther-Budget-Buddy
```

### 2. Run Setup Script
```bash
npm run setup
```

This will create a `.env.local` file in the root directory.

### 3. Add Supabase Credentials

Open the newly created `.env.local` file and add your credentials:
```env
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

**To get these credentials:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Open the **Panther Budget Buddy** project (you should have access via email invite)
3. Navigate to **Settings** → **API**
4. Copy the **Project URL** and **anon public** key
5. Paste them into your `.env.local` file

**Don't have access?** Contact your team lead to be added to the Supabase project.

### 4. Install Dependencies
```bash
npm install
```

## 🚀 Running Locally

### Start Development Server
```bash
npm run dev
```

The app will be available at **`http://localhost:5173`**

⚠️ **Note:** Make sure to use `http://` NOT `https://`

### Other Commands
```bash
# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint
```

## 📁 Project Structure
```
src/
├── assets/                    # Static assets (images, icons, etc.)
├── components/
│   └── ui/                    # Shared UI components (button, card, input, etc.)
├── config/                    # Configuration files
├── features/                  # Feature modules
│   ├── auth/                  # Authentication (Login/Signup)
│   ├── dashboard/             # Main dashboard & finance overview
│   ├── transactions/          # Transaction management (expenses & income)
│   ├── goals/                 # Goal setting & tracking
│   └── analytics/             # Charts & spending analytics
├── lib/
│   ├── chartConfig.js         # Chart configuration
│   ├── supabase.js            # Supabase client
│   └── utils.js               # Utility functions
├── utils/
│   ├── calculations.js        # Financial calculations
│   └── validation.js          # Input validation
├── App.jsx                    # Root component
├── main.jsx                   # React entry point
├── App.css                    # Global styles
└── index.css                  # Base styles
```

## 🛠️ Tech Stack

* **Frontend Framework**: React 19.2.0
* **Build Tool**: Vite
* **Styling**: Tailwind CSS
* **UI Components**: Radix UI, shadcn/ui
* **Charts**: Chart.js, react-chartjs-2
* **Backend/Database**: Supabase (PostgreSQL)
* **Routing**: React Router v7
* **Icons**: Lucide React
* **Date Handling**: date-fns
* **Linting**: ESLint

## 🔐 Authentication

The app uses Supabase for authentication. Users can:
* Sign up with email and password
* Log in with credentials
* Session management is handled automatically

## 📊 Features

* **Dashboard**: Overview of finances and spending summary
* **Transactions**: Add, view, and manage expenses and income
* **Goals**: Set financial goals and track progress
* **Analytics**: Visualize spending patterns with charts
* **Categories**: Organize transactions by category

## ❓ Troubleshooting

### White Screen / App Won't Load

**Cause:** Missing or incorrect environment variables

**Solution:**
1. Make sure `.env.local` exists in the root directory (run `npm run setup` if not)
2. Verify both `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set correctly
3. Check credentials in Supabase dashboard: Settings → API
4. Restart the dev server: Stop (Ctrl+C) and run `npm run dev` again

### "The connection for this site is not secure"

**Solution:** Use `http://localhost:5173` NOT `https://localhost:5173`

### Port 5173 Already in Use

**Solution:**
```bash
npm run dev -- --port 3000
```

Then access: `http://localhost:3000`

### Dependencies Not Installing

**Solution:**
```bash
rm -rf node_modules package-lock.json
npm install
```

### Supabase Connection Issues

* Check that `.env.local` has valid Supabase credentials
* Verify you have internet connection
* Check that the Supabase project is active
* Verify you have access to the Supabase project (check email for invite)

## 👥 Team Collaboration

### Getting Supabase Access

All team members need access to the Supabase project:
1. Check your email for a Supabase invitation
2. Accept the invitation and create an account
3. You'll now have access to the project dashboard

### Daily Development Workflow
**Before starting work:**
```bash
# Pull latest changes from main
git pull origin main
```

**When working on a feature:**
```bash
# Create a new branch for your feature
git checkout -b feature/your-feature-name

# Examples:
# git checkout -b feature/expense-categories
# git checkout -b fix/goal-calculation
# git checkout -b update/dashboard-ui
```

**After making changes:**
```bash
# Check what files changed
git status

# Add your changes
git add .

# Commit with a descriptive message
git commit -m "Description of changes"

# Push your branch
git push origin feature/your-feature-name
```

**Merging to main:**

1. Go to GitHub repository
2. Create a **Pull Request** from your branch to `main`
3. Wait for team review (optional)
4. Merge the Pull Request
5. Delete the branch after merging
6. Pull latest main locally:
```bash
   git checkout main
   git pull origin main
```

## 🚀 Deployment

The app can be deployed to platforms like Vercel, Netlify, or Render.

**Environment variables** must be added in your hosting platform's dashboard (same variables as in `.env.local`).

---

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
