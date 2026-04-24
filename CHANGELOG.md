# Changelog

All notable changes to the HireHub Onboarding Portal will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-01

### Added

- **Landing Page**
  - Hero section with call-to-action buttons for expressing interest
  - Feature cards highlighting Innovation, Growth, Culture, and Impact
  - CTA section encouraging users to apply
  - Smooth scroll navigation to features section

- **Interest Form**
  - Full name field with validation (2–50 characters, letters and spaces only)
  - Email field with format validation and duplicate prevention
  - Mobile number field with validation (10–15 digits only)
  - Department selection dropdown with 8 predefined departments (Engineering, Product, Design, Marketing, Sales, Human Resources, Finance, Operations)
  - Inline error messages for each field on invalid input
  - Success and error banners with auto-dismiss after 4 seconds
  - Back to Home navigation button

- **Admin Login**
  - Protected route requiring authentication to access the admin dashboard
  - Hardcoded credentials (`admin` / `admin`) for demonstration purposes
  - Session-based authentication using `sessionStorage`
  - Inline error messaging for invalid credentials

- **Admin Dashboard**
  - Stat cards displaying total submissions, unique departments, and latest submission date
  - Submissions table with columns for name, email, mobile, department, submitted date, and actions
  - Edit functionality via modal with validation for name, mobile, and department (email is read-only)
  - Delete functionality with confirmation modal
  - Success and error banners for CRUD operation feedback
  - Logout button clearing session authentication
  - Empty state display when no submissions exist

- **Client-Side Routing**
  - React Router v6 with routes for Home (`/`), Apply (`/apply`), and Admin (`/admin`)
  - Protected route wrapper component for admin access
  - Sticky header with navigation links and active state indicators
  - Responsive hamburger menu for mobile viewports

- **Data Persistence**
  - localStorage-based storage for all form submissions
  - UUID v4 generation for unique submission identifiers
  - ISO 8601 timestamps on each submission
  - CRUD utility functions (get, add, update, delete) with error handling
  - Duplicate email detection across submissions
  - Graceful fallback on corrupted or missing localStorage data

- **Responsive Design**
  - Mobile-first CSS with breakpoints at 768px and 480px
  - CSS custom properties for consistent theming (colors, spacing, typography, shadows)
  - Responsive grid layouts for feature cards and stat cards
  - Modal and form adaptations for smaller screens
  - Hamburger navigation menu for mobile devices

- **Deployment Configuration**
  - Vite build tooling with React plugin
  - Vercel configuration with SPA rewrites for client-side routing
  - No backend or environment variable dependencies required