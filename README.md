# StayFinder

StayFinder is a full-stack web app, inspired by Airbnb, where users can list and book properties for short-term or long-term stays. This project is designed to give hands-on experience across both frontend and backend development.

---

## 🚀 Description
StayFinder allows users to:
- Browse and search property listings
- View detailed property information
- Register and log in
- Book properties for desired dates
- (Optional) Hosts can manage their own listings

---

## ✅ Objectives
Build a functional prototype with:
- **Frontend:** Property listing, search, details page, login/register
- **Backend:** RESTful API for listings, user authentication, and bookings
- **Database:** Store users, listings, and bookings

---

## 📦 Deliverables
### Frontend (React)
- Homepage with property cards (image, location, price)
- Listing detail page with images, description, and calendar
- Login/Register pages with validation
- (Optional) Host dashboard to manage listings

### Backend (Node.js/Express)
- Auth routes: register, login
- Listings endpoints: `GET /listings`, `GET /listings/:id`
- `POST /bookings` for reservations
- Basic listing CRUD for hosts

### Database (MongoDB/PostgreSQL)
- Models: Users, Listings, Bookings
- Include seed data for testing

### Bonus (Optional)
- Search with filters (location, price, date)
- Map integration (Google Maps/Mapbox)
- Mock payment integration (e.g., Stripe)

---

## 🛠️ Tech Stack
- **Frontend:** React
- **Backend:** Node.js + Express
- **Database:** MongoDB (Mongoose) or PostgreSQL

---

## ⚡ Setup Instructions

### Backend
1. `cd backend`
2. `npm install`
3. Copy `.env.example` to `.env` and set your MongoDB URI and JWT secret
4. `npm run seed` to seed sample data
5. `npm start` to run the API server

### Frontend
1. `cd frontend`
2. `npm install`
3. `npm start` to run the React app

---

## ✨ Features
- User authentication (register/login)
- List and search properties
- Property detail page
- Booking system
- (Optional) Host dashboard for managing listings

---

## 🔗 API Endpoints

### Auth
- `POST /api/auth/register`
- `POST /api/auth/login`

### Listings
- `GET /api/listings`
- `GET /api/listings/:id`

### Bookings
- `POST /api/bookings`

### Host (optional)
- Basic CRUD endpoints for hosts to manage their listings

---

## 🧩 Bonus Features (Optional)
- Search with filters (location, price, date)
- Map integration (Google Maps/Mapbox)
- Mock payment integration (e.g., Stripe)

---

## 📚 Database Models
- **User**: Stores user info and authentication
- **Listing**: Stores property details
- **Booking**: Stores booking/reservation info

---

Feel free to contribute or extend the project!

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
