import express from 'express';
import Listing from '../models/Listing.js';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware for host auth
function authHost(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded.isHost) return res.status(403).json({ message: 'Not a host' });
    req.user = decoded;
    next();
  } catch {
    res.status(401).json({ message: 'Invalid token' });
  }
}

// Public: Get all listings (with filters)
// Enhanced: Fuzzy search, date range, and sorting
router.get('/', async (req, res) => {
  const { q, location, minPrice, maxPrice, date, startDate, endDate, sort } = req.query;
  let filter = {};

  // Fuzzy search for title/location
  if (q) {
    filter.$or = [
      { title: { $regex: q, $options: 'i' } },
      { location: { $regex: q, $options: 'i' } }
    ];
  }
  if (location) filter.location = { $regex: location, $options: 'i' };
  if (minPrice || maxPrice) filter.price = {};
  if (minPrice) filter.price.$gte = Number(minPrice);
  if (maxPrice) filter.price.$lte = Number(maxPrice);

  // Date filtering
  if (startDate && endDate) {
    // Listing must be available for ALL dates in the range
    const range = [];
    let d = new Date(startDate);
    const end = new Date(endDate);
    while (d <= end) {
      range.push(d.toISOString().slice(0, 10));
      d.setDate(d.getDate() + 1);
    }
    filter.availableDates = { $all: range };
  } else if (date) {
    filter.availableDates = date;
  }

  // Sorting
  let sortObj = {};
  if (sort) {
    // e.g., 'price', '-price', 'createdAt', '-createdAt'
    const dir = sort.startsWith('-') ? -1 : 1;
    const field = sort.replace('-', '');
    sortObj[field] = dir;
  } else {
    sortObj = { createdAt: -1 };
  }

  const listings = await Listing.find(filter).sort(sortObj).populate('host', 'name email');
  res.json(listings);
});

// Public: Get listing by id
router.get('/:id', async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate('host', 'name email');
  if (!listing) return res.status(404).json({ message: 'Not found' });
  res.json(listing);
});

// Host: Create listing
router.post('/', authHost, async (req, res) => {
  const { title, description, location, price, images, availableDates } = req.body;
  const listing = await Listing.create({ ...req.body, host: req.user.id });
  res.status(201).json(listing);
});

// Host: Update listing
router.put('/:id', authHost, async (req, res) => {
  const listing = await Listing.findOneAndUpdate(
    { _id: req.params.id, host: req.user.id },
    req.body,
    { new: true }
  );
  if (!listing) return res.status(404).json({ message: 'Not found or unauthorized' });
  res.json(listing);
});

// Host: Delete listing
router.delete('/:id', authHost, async (req, res) => {
  const listing = await Listing.findOneAndDelete({ _id: req.params.id, host: req.user.id });
  if (!listing) return res.status(404).json({ message: 'Not found or unauthorized' });
  res.json({ message: 'Deleted' });
});

export default router;
