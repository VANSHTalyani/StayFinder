import express from 'express';
import Booking from '../models/Booking.js';
import Listing from '../models/Listing.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware for user auth
function authUser(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Create booking
router.post('/', authUser, async (req, res) => {
  const { listingId, startDate, endDate } = req.body;
  const listing = await Listing.findById(listingId);
  if (!listing) return res.status(404).json({ message: 'Listing not found' });
  const booking = await Booking.create({
    user: req.user.id,
    listing: listingId,
    startDate,
    endDate
  });
  res.status(201).json(booking);
});

export default router;
