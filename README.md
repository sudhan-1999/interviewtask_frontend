# URL Shortener – Frontend (React)

A simple React UI for creating shortened URLs using the backend API.

## Features
- Input field for long URL
- URL validation
- Displays generated short URL
- Copy-to-clipboard
- Toast notifications
- Responsive layout

## Tech Stack
- React (Vite or CRA)
- Axios
- React Toastify
- TailwindCSS / Bootstrap (optional)

## Installation
git clone <your-frontend-repo-url>
cd frontend
npm install

## Environment Variables
Create a .env file:
VITE_BACKEND_URL=<your-backend-api-url>

Example:
VITE_BACKEND_URL=https://your-backend.onrender.com

## Run the App
Development:
npm run dev

Production Build:
npm run build

## How It Works
1. User enters long URL
2. Frontend sends POST request to {VITE_BACKEND_URL}/api/shorten
3. Backend returns shortened URL
4. UI displays the short URL
5. Clicking the short URL opens redirect route

## Folder Structure
/frontend
  ├── src/
  │    ├── App.jsx
  │    ├── components/
  │    ├── services/api.js
  ├── public/
  ├── .env
  └── package.json

## Testing
Valid URLs:
- https://google.com
- https://github.com
- https://www.amazon.in/s?k=laptop

Invalid URLs (should show error):
- test
- http:/broken
- https://

## Deployment
Netlify:
- Build: npm run build
- Publish: dist/
- Add env variable VITE_BACKEND_URL

Vercel:
- Framework: Vite
- Output: dist/
- Add env variable VITE_BACKEND_URL

## License
MIT
