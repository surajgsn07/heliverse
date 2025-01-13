const jwt = require('jsonwebtoken');
const Patient = require('../models/Patient');
const Pantry = require('../models/Pantry');
const DeliveryPerson = require('../models/DeliveryPerson');
const hospitalManager = require('../models/hospitalManager');
const ApiResponse = require('../utils/ApiResponse');

const authenticate = (model) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization?.split(' ')[1]; // Bearer token
      if (!token) {
        return res.status(401).json(new ApiResponse(401, null, 'No token provided'));
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT
      const user = await model.findById(decoded.id); // Find the user by ID from the model

      if (!user) {
        return res.status(404).json(new ApiResponse(404, null, 'User not found'));
      }

      req.user = user; // Attach user data to the request
      next(); // Pass control to the next middleware or route handler
    } catch (error) {
      return res.status(401).json(new ApiResponse(401, null, 'Invalid or expired token'));
    }
  };
};

// Authentication for Patient model
const authenticatePatient = authenticate(Patient);

// Authentication for Pantry model
const authenticatePantry = authenticate(Pantry);

// Authentication for DeliveryPerson model
const authenticateDeliveryPerson = authenticate(DeliveryPerson);

const authenticateHospitalManager = authenticate(hospitalManager);

module.exports = { authenticatePatient, authenticatePantry, authenticateDeliveryPerson ,authenticateHospitalManager};
