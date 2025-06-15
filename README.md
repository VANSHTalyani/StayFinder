# StayFinder 🏡

Welcome to **StayFinder** – your modern, open-source platform for listing and booking unique stays, inspired by Airbnb! Whether you're looking for a cozy weekend getaway or a place to host guests, StayFinder brings together everything you need in a beautiful, easy-to-use web app.

---

## 🌟 Why StayFinder?
StayFinder was created as an intern project to help developers learn full-stack web development by building something real and useful. It's a perfect playground for those who want hands-on experience with React, Node.js/Express, and MongoDB (or PostgreSQL). The codebase is clean, approachable, and ready for contributions!

---

## 🚀 What Can You Do?
- **Browse** and **search** property listings
- View detailed property pages with images, descriptions, and calendars
- **Register** and **log in** securely
- **Book** properties for your desired dates
- (Optional) Hosts can manage their own listings from a dedicated dashboard

---

## 🎯 Project Goals
- Build a functional, full-stack prototype
- Practice RESTful API design and authentication
- Learn how to connect frontend, backend, and database layers

---

## 📦 Main Features
- 🏠 Homepage with property cards (image, location, price)
- 📋 Listing detail page with images, description, and calendar
- 🔐 Login/Register pages with validation
- 🧑‍💼 (Optional) Host dashboard to manage listings
- 🔎 Search with filters (location, price, date)
- 🌍 (Bonus) Map integration (Google Maps/Mapbox)
- 💳 (Bonus) Mock payment integration (e.g., Stripe)

---

## 🛠️ Tech Stack
- **Frontend:** React
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose) or PostgreSQL

---

## ⚡ Getting Started

### 1. Backend Setup
```bash
cd backend
npm install
# Copy .env.example to .env and set your MongoDB URI and JWT secret
npm run seed   # (Optional) Seed the database with sample data
npm start      # Start the API server
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start      # Runs the React app on http://localhost:3000
```

---

## 🔗 API Overview

**Auth:**
- `POST /api/auth/register` — Register a new user
- `POST /api/auth/login` — Log in and get a token

**Listings:**
- `GET /api/listings` — List all properties
- `GET /api/listings/:id` — Get details for a specific property

**Bookings:**
- `POST /api/bookings` — Book a property

**Host (optional):**
- Full CRUD for hosts to manage their listings

---

## 🗄️ Database Models
- **User:** Authentication and profile info
- **Listing:** Property details, images, location, price
- **Booking:** Reservation info, user, dates

---

## 🤝 Contributing
We welcome contributions of all kinds! If you’re learning, don’t hesitate to open a pull request or ask a question. Check out the issues tab for ideas on what to work on next.

---

## 💡 Motivation
StayFinder was built to help new developers learn by doing. The project covers everything from authentication and CRUD to styling and deployment. If you want to see how a real-world web app is built, this is the place to start!

---

## 📬 Questions or Feedback?
Open an issue or reach out — we’d love to hear from you!

---

> Made with ❤️ by the StayFinder community.

### Listings
- `GET /api/listings`
- `GET /api/listings/:id`
- `POST /api/listings` (host)
- `PUT /api/listings/:id` (host)
- `DELETE /api/listings/:id` (host)

### Bookings
- `POST /api/bookings`

---

## Seed Data
Run `npm run seed` in backend to populate users, listings, and bookings for demo/testing.
