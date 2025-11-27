# 🐾 Panther Budget Buddy

A FIU student finance tracker built with React, Vite, and Supabase. Manage your expenses, track spending goals, and visualize your financial data with interactive charts.

## 📋 Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running Locally](#running-locally)
- [Project Structure](#project-structure)
- [Tech Stack](#tech-stack)
- [Features](#features)

## 🔧 Prerequisites

Before you begin, make sure you have the following installed:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)

## 📦 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/MarcosPerezLabrada/Panther-Budget-Buddy.git
cd Panther-Budget-Buddy
```

### 2. Install Dependencies

```bash
npm install
```

Or if you prefer yarn:

```bash
yarn install
```

### 3. Set Up Environment Variables

The `.env.local` file is already configured with Supabase credentials. No additional setup needed!

## 🚀 Running Locally

### Development Server

Start the development server with hot module replacement (HMR):

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Run Linter

```bash
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

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, shadcn/ui
- **Charts:** Chart.js, react-chartjs-2
- **Backend/Database:** Supabase
- **Routing:** React Router v7
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **Linting:** ESLint

## 🔐 Authentication

The app uses Supabase for authentication. Users can:
- Sign up with email and password
- Log in with credentials
- Session management is handled automatically

## 📊 Features

- **Dashboard:** Overview of finances and spending summary
- **Transactions:** Add, view, and manage expenses and income
- **Goals:** Set financial goals and track progress
- **Analytics:** Visualize spending patterns with charts
- **Categories:** Organize transactions by category

## 📝 Notes for Development

- Hot Module Replacement (HMR) is enabled for fast development
- All UI components are pre-built in `src/components/ui/`
- Supabase connection is already configured
- Tailwind CSS is pre-configured with custom colors

## ❓ Troubleshooting

### Port 5173 Already in Use

```bash
npm run dev -- --port 3000
```

### Dependencies Not Installing

```bash
rm -rf node_modules package-lock.json
npm install
```

### Supabase Connection Issues

- Check that `.env.local` has valid Supabase credentials
- Verify you have internet connection
- Check Supabase project is active

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
