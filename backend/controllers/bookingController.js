const Booking = require('../models/Booking');
const Property = require('../models/Property');

// @desc    Create a new booking
// @route   POST /api/bookings
// @access  Private
exports.createBooking = async (req, res) => {
  try {
    const { propertyId, checkInDate, checkOutDate, numberOfGuests, totalPrice } = req.body;

    // Check if property exists
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if property is available
    if (!property.isAvailable) {
      return res.status(400).json({
        success: false,
        message: 'Property is not available for booking'
      });
    }

    // Create booking
    const booking = await Booking.create({
      property: propertyId,
      user: req.user.id,
      checkInDate,
      checkOutDate,
      numberOfGuests,
      totalPrice
    });

    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all bookings for logged in user
// @route   GET /api/bookings/my-bookings
// @access  Private
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate('property')
      .sort('-createdAt');

    res.status(200).json({
      success: true,
      count: bookings.length,
      bookings
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single booking by ID
// @route   GET /api/bookings/:id
// @access  Private
exports.getBookingById = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('property')
      .populate('user', 'name email phone');

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking or is the property host
    const property = await Property.findById(booking.property);

    if (booking.user._id.toString() !== req.user.id && 
        property.host.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to access this booking'
      });
    }

    res.status(200).json({
      success: true,
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update booking status
// @route   PUT /api/bookings/:id
// @access  Private
exports.updateBookingStatus = async (req, res) => {
  try {
    const { bookingStatus, paymentStatus } = req.body;

    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Update booking
    if (bookingStatus) booking.bookingStatus = bookingStatus;
    if (paymentStatus) booking.paymentStatus = paymentStatus;

    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking updated successfully',
      booking
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Cancel booking
// @route   DELETE /api/bookings/:id
// @access  Private
exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }

    // Check if user owns this booking
    if (booking.user.toString() !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to cancel this booking'
      });
    }

    booking.bookingStatus = 'cancelled';
    await booking.save();

    res.status(200).json({
      success: true,
      message: 'Booking cancelled successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};