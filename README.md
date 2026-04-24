# HireHub Onboarding Portal

A client-side single-page application for managing candidate interest submissions. Built with React 18, Vite, and React Router v6, the portal allows candidates to express interest in joining the team and provides an admin dashboard for managing submissions.

---

## Table of Contents

- [Project Description](#project-description)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Folder Structure](#folder-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Development](#development)
  - [Production Build](#production-build)
- [Usage Guide](#usage-guide)
  - [For Candidates](#for-candidates)
  - [For Admins](#for-admins)
- [Admin Credentials](#admin-credentials)
- [Storage Schema](#storage-schema)
- [Deployment](#deployment)
- [License](#license)

---

## Project Description

HireHub Onboarding Portal is a fully client-side recruitment interest management tool. Candidates can browse the landing page to learn about the company and submit an interest form with their details. Administrators can log in to view, edit, and delete submissions through a dedicated dashboard. All data is persisted in the browser's `localStorage`, requiring no backend or database setup.

---

## Features

### Landing Page
- Hero section with call-to-action buttons for expressing interest
- Feature cards highlighting Innovation, Growth, Culture, and Impact
- CTA section encouraging users to apply
- Smooth scroll navigation to the features section

### Interest Form
- Full name field with validation (2–50 characters, letters and spaces only)
- Email field with format validation and duplicate prevention
- Mobile number field with validation (10–15 digits only)
- Department selection dropdown with 8 predefined departments
- Inline error messages for each field on invalid input
- Success and error banners with auto-dismiss after 4 seconds
- Back to Home navigation button

### Admin Login
- Protected route requiring authentication to access the admin dashboard
- Hardcoded credentials for demonstration purposes
- Session-based authentication using `sessionStorage`
- Inline error messaging for invalid credentials

### Admin Dashboard
- Stat cards displaying total submissions, unique departments, and latest submission date
- Submissions table with columns for name, email, mobile, department, submitted date, and actions
- Edit functionality via modal with validation for name, mobile, and department (email is read-only)
- Delete functionality with confirmation modal
- Success and error banners for CRUD operation feedback
- Logout button clearing session authentication
- Empty state display when no submissions exist

### General
- Client-side routing with React Router v6
- Responsive design with mobile-first CSS and hamburger navigation
- CSS custom properties for consistent theming
- `localStorage`-based data persistence with graceful error handling
- UUID v4 generation for unique submission identifiers

---

## Tech Stack

| Technology       | Purpose                                      |
| ---------------- | -------------------------------------------- |
| React 18         | UI component library                         |
| Vite 5           | Build tool and development server             |
| React Router v6  | Client-side routing                          |
| Plain CSS        | Styling with CSS custom properties           |
| localStorage     | Client-side data persistence                 |
| sessionStorage   | Admin session authentication                 |

No external UI libraries, state management libraries, or backend services are required.

---

## Folder Structure

```
hirehub-onboarding-portal/
├── index.html                  # HTML entry point
├── package.json                # Project metadata and dependencies
├── vite.config.js              # Vite build configuration
├── vercel.json                 # Vercel SPA rewrite rules
├── .env.example                # Environment variable documentation
├── CHANGELOG.md                # Version history
├── DEPLOYMENT.md               # Deployment guide
├── README.md                   # Project documentation (this file)
└── src/
    ├── main.jsx                # Application entry point
    ├── App.jsx                 # Root component with routing
    ├── App.css                 # Global styles and CSS custom properties
    ├── components/
    │   ├── Header.jsx          # Sticky navigation header with hamburger menu
    │   ├── LandingPage.jsx     # Home page with hero, features, and CTA
    │   ├── InterestForm.jsx    # Candidate interest submission form
    │   ├── AdminLogin.jsx      # Admin authentication form
    │   ├── AdminDashboard.jsx  # Admin panel with stats, table, and modals
    │   ├── ProtectedRoute.jsx  # Route guard for admin access
    │   ├── SubmissionTable.jsx # Submissions data table component
    │   └── EditModal.jsx       # Edit submission modal form
    └── utils/
        ├── storage.js          # localStorage CRUD operations and helpers
        └── validators.js       # Form field validation functions
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- npm v8 or higher (included with Node.js)

### Installation

Clone the repository and install dependencies:

```bash
git clone <repository-url>
cd hirehub-onboarding-portal
npm install
```

### Development

Start the development server with hot module replacement:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

### Production Build

Build the application for production:

```bash
npm run build
```

The optimized output will be generated in the `dist` directory.

Preview the production build locally:

```bash
npm run preview
```

---

## Usage Guide

### For Candidates

1. **Visit the Landing Page** — Navigate to the home page (`/`) to learn about HireHub and what the company offers.
2. **Express Interest** — Click "Express Your Interest" or "Apply Now" to navigate to the interest form (`/apply`).
3. **Fill Out the Form** — Provide your full name, email address, mobile number, and select a department from the dropdown.
4. **Submit** — Click "Submit Application". On success, a confirmation banner will appear and the form will reset. If there are validation errors, inline messages will indicate what needs to be corrected.

#### Available Departments

- Engineering
- Product
- Design
- Marketing
- Sales
- Human Resources
- Finance
- Operations

### For Admins

1. **Access the Admin Panel** — Navigate to `/admin`. If not authenticated, the login form will be displayed.
2. **Log In** — Enter the admin credentials (see [Admin Credentials](#admin-credentials) below) and click "Sign In".
3. **View Dashboard** — After authentication, the dashboard displays stat cards (total submissions, unique departments, latest submission date) and a table of all submissions.
4. **Edit a Submission** — Click the ✏️ (edit) button on any row to open the edit modal. Modify the name, mobile number, or department and click "Save Changes". Email cannot be changed.
5. **Delete a Submission** — Click the 🗑️ (delete) button on any row. Confirm the deletion in the confirmation modal. This action cannot be undone.
6. **Log Out** — Click the "Logout" button in the dashboard header or the navigation bar to end the session and return to the home page.

---

## Admin Credentials

This application uses hardcoded credentials for demonstration purposes:

| Field    | Value   |
| -------- | ------- |
| Username | `admin` |
| Password | `admin` |

Authentication state is stored in `sessionStorage` under the key `hirehub_admin_auth` and is cleared when the browser tab is closed or the user logs out.

> **Note:** These credentials are for demo purposes only and should not be used in a production environment.

---

## Storage Schema

All submissions are stored in `localStorage` under the key `hirehub_submissions` as a JSON array. Each submission object has the following structure:

```json
{
  "id": "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx",
  "fullName": "John Doe",
  "email": "john.doe@example.com",
  "mobile": "1234567890",
  "department": "Engineering",
  "submittedAt": "2024-01-15T10:30:00.000Z"
}
```

| Field         | Type   | Description                                      |
| ------------- | ------ | ------------------------------------------------ |
| `id`          | string | UUID v4 unique identifier                        |
| `fullName`    | string | Candidate's full name (2–50 characters)           |
| `email`       | string | Candidate's email address (unique across entries) |
| `mobile`      | string | Candidate's mobile number (10–15 digits)          |
| `department`  | string | Selected department from predefined list          |
| `submittedAt` | string | ISO 8601 timestamp of submission                  |

### Storage Behavior

- Data persists across page reloads and browser sessions.
- Corrupted or non-array data is automatically reset to an empty array.
- Duplicate email addresses are rejected during submission.
- Redeploying the application does not affect existing data in the user's browser.

---

## Deployment

This application is configured for deployment on [Vercel](https://vercel.com/) with SPA rewrite support. The `vercel.json` file at the repository root ensures all routes are served through `index.html` for client-side routing.

### Quick Deploy to Vercel

1. Push the repository to GitHub.
2. Import the project in the Vercel dashboard.
3. Verify the build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
4. Click "Deploy".

No environment variables are required.

For detailed deployment instructions, including alternative hosting providers (Netlify, GitHub Pages, Nginx), see [DEPLOYMENT.md](./DEPLOYMENT.md).

---

## License

This project is **Private**. All rights reserved. Unauthorized copying, distribution, or modification of this project, via any medium, is strictly prohibited.