const express = require('express');
const router = express.Router();
const 
{registerHospitalManager , loginHospitalManager, getHospitalManagerProfile} = require('../controller/hospitalManagerController.js');
const { authenticateHospitalManager } = require('../middleware/authenticate.js');

// Register route (No authentication required)
router.post('/register', registerHospitalManager);

// Login route (No authentication required)
router.post('/login', loginHospitalManager);

// Profile route (Protected, requires authentication)
router.get('/profile', authenticateHospitalManager, getHospitalManagerProfile);

module.exports = router;
