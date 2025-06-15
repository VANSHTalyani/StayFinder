import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import Listing from './models/Listing.js';
import Booking from './models/Booking.js';

dotenv.config();

async function seed() {
  await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
  await User.deleteMany();
  await Listing.deleteMany();
  await Booking.deleteMany();

  const password = await bcrypt.hash('password', 10);
  const users = await User.insertMany([
    { name: 'Alice Host', email: 'alice@host.com', password, isHost: true },
    { name: 'Bob Guest', email: 'bob@guest.com', password, isHost: false }
  ]);

  const listings = await Listing.insertMany([
    {
      title: 'Cozy Apartment',
      description: 'A nice place in the city center.',
      location: 'New York',
      price: 120,
      images: ['https://placehold.co/600x400'],
      host: users[0]._id,
      availableDates: ['2025-06-20', '2025-06-21', '2025-06-22']
    },
    {
      title: 'Beach House',
      description: 'Enjoy the sea breeze.',
      location: 'Los Angeles',
      price: 200,
      images: ['https://placehold.co/600x400'],
      host: users[0]._id,
      availableDates: ['2025-06-23', '2025-06-24']
    }
  ]);

  await Booking.create({
    user: users[1]._id,
    listing: listings[0]._id,
    startDate: '2025-06-20',
    endDate: '2025-06-21'
  });

  console.log('Seed complete!');
  process.exit();
}

seed();
