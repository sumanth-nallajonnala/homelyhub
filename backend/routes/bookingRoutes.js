const express = require('express');
const router = express.Router();
const {
  createBooking,
  getMyBookings,
  getBookingById,
  updateBookingStatus,
  cancelBooking
} = require('../controllers/bookingController');
const { protect } = require('../middleware/auth');

// All booking routes are protected (require login)
router.post('/', protect, createBooking);
router.get('/my-bookings', protect, getMyBookings);
router.get('/:id', protect, getBookingById);
router.put('/:id', protect, updateBookingStatus);
router.delete('/:id', protect, cancelBooking);

module.exports = router;