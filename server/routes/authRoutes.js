const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Ensure these names match the 'exports' in your controller exactly
router.post('/login', authController.login);
router.post('/register', authController.register);

module.exports = router;