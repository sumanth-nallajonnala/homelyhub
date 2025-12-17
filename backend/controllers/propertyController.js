const Property = require('../models/Property');

// @desc    Create a new property
// @route   POST /api/properties
// @access  Private (Host only)
exports.createProperty = async (req, res) => {
  try {
    const property = await Property.create({
      ...req.body,
      host: req.user.id
    });

    res.status(201).json({
      success: true,
      message: 'Property created successfully',
      property
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get all properties with filters
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res) => {
  try {
    const { city, propertyType, minPrice, maxPrice, bedrooms, guests } = req.query;

    // Build query
    let query = { isAvailable: true };

    if (city) {
      query['location.city'] = { $regex: city, $options: 'i' };
    }

    if (propertyType) {
      query.propertyType = propertyType;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    if (bedrooms) {
      query.bedrooms = { $gte: Number(bedrooms) };
    }

    if (guests) {
      query.maxGuests = { $gte: Number(guests) };
    }

    const properties = await Property.find(query).populate('host', 'name email');

    res.status(200).json({
      success: true,
      count: properties.length,
      properties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get single property by ID
// @route   GET /api/properties/:id
// @access  Public
exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('host', 'name email phone profileImage');

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    res.status(200).json({
      success: true,
      property
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private (Host only)
exports.updateProperty = async (req, res) => {
  try {
    let property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if user is the property owner
    if (property.host.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this property'
      });
    }

    property = await Property.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      message: 'Property updated successfully',
      property
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private (Host only)
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        success: false,
        message: 'Property not found'
      });
    }

    // Check if user is the property owner
    if (property.host.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this property'
      });
    }

    await property.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Property deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Get properties by host
// @route   GET /api/properties/host/my-properties
// @access  Private
exports.getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ host: req.user.id });

    res.status(200).json({
      success: true,
      count: properties.length,
      properties
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};