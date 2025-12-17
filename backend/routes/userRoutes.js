const express = require('express');
const router = express.Router();
const { 
  updateProfile, 
  updatePassword, 
  getUserById 
} = require('../controllers/userController');
const { protect } = require('../middleware/auth');

// Protected routes
router.put('/profile', protect, updateProfile);
router.put('/password', protect, updatePassword);

// Public route
router.get('/:id', getUserById);

module.exports = router;