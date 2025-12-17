const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description']
  },
  propertyType: {
    type: String,
    required: true,
    enum: ['house', 'apartment', 'villa', 'room', 'cottage', 'other']
  },
  price: {
    type: Number,
    required: [true, 'Please provide a price']
  },
  location: {
    address: String,
    city: String,
    state: String,
    country: String,
    zipCode: String
  },
  amenities: [{
    type: String
  }],
  images: [{
    type: String
  }],
  bedrooms: {
    type: Number,
    default: 1
  },
  bathrooms: {
    type: Number,
    default: 1
  },
  maxGuests: {
    type: Number,
    default: 1
  },
  host: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  rating: {
    type: Number,
    default: 0
  },
  numReviews: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Property', propertySchema);