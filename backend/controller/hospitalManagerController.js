const HospitalManager = require('../models/hospitalManager.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Register a new Hospital Manager
exports.registerHospitalManager = async (req, res) => {
  const { name, email, password, phone, role } = req.body;
  if(!name || !email || !password || !phone || !role){
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    // Check if the email already exists
    const existingManager = await HospitalManager.findOne({ email });
    if (existingManager) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Create a new HospitalManager
    const newManager = new HospitalManager({
      name,
      email,
      password,
      phone,
      role
    });

    // Save the manager to the database
    await newManager.save();
    res.status(201).json({ message: 'Hospital Manager registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Login a Hospital Manager and generate JWT token
exports.loginHospitalManager = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the hospital manager by email
    const manager = await HospitalManager.findOne({ email });
    if (!manager) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password in DB
    const isMatch = await bcrypt.compare(password, manager.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = manager.generateAuthToken();
    res.json({ token  , user: manager});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get the hospital manager's profile details (with authentication)
exports.getHospitalManagerProfile = async (req, res) => {
  try {
    // Fetch hospital manager using ID from the JWT token
    const manager = await HospitalManager.findById(req.managerId).select('-password');
    if (!manager) {
      return res.status(404).json({ message: 'Hospital Manager not found' });
    }

    res.json(manager);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
