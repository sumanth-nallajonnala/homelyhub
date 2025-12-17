const express = require('express');
const router = express.Router();
const {
  createProperty,
  getProperties,
  getPropertyById,
  updateProperty,
  deleteProperty,
  getMyProperties
} = require('../controllers/propertyController');
const { protect, authorizeHost } = require('../middleware/auth');

// Public routes
router.get('/', getProperties);
router.get('/:id', getPropertyById);

// Protected routes - Host only
router.post('/', protect, authorizeHost, createProperty);
router.put('/:id', protect, authorizeHost, updateProperty);
router.delete('/:id', protect, authorizeHost, deleteProperty);

// Get host's properties
router.get('/host/my-properties', protect, authorizeHost, getMyProperties);

module.exports = router;