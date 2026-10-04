# LearnHub – Online Learning Platform (LMS)

React.js · JavaScript · React Router v5 · REST API · Vite

## Features
- Register / log in before accessing any course page (protected routes), "Welcome, <name>" greeting, log out
- Course browsing, enrollment / unenrollment
- Search, category + level filters, sorting
- Lesson page with per-lesson progress tracking
- "My Learning" dashboard with stats, editable profile
- Reusable components: `CourseCard`, `LessonItem`, `Progress`, `Navbar`, `Spinner`
- REST client (`src/api/api.js`): built-in mock by default, real backend via `VITE_API_URL`
- Route-level code splitting (`React.lazy` + `Suspense`) and memoized filtering for performance
- Responsive layout and light/dark theme

## Run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Structure
```
src/
  api/          REST client (mock + fetch)
  components/   reusable UI
  context/      app state (user, enrollment, progress)
  data/         sample courses
  hooks/        useFetch
  pages/        route components
```

## Using a real backend
Copy `.env.example` to `.env`, set `VITE_API_URL`, and implement the routes listed at the top of `src/api/api.js`.
