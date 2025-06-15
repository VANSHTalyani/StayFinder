import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  location: String,
  price: Number,
  images: [String],
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  availableDates: [String]
});

export default mongoose.model('Listing', listingSchema);
