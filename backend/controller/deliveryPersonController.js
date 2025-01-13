const DeliveryPerson = require('../models/DeliveryPerson.js');
const {ApiResponse} = require('../utils//ApiResponse.js');
const {asyncHandler} = require('../utils/asyncHandler.js');

// Create a new delivery person
const createDeliveryPerson = asyncHandler(async (req, res) => {
  const { name, contactInfo, email, password , pantry } = req.body;
  
  // Validation
  if (!name || !contactInfo || !email || !password || !pantry) {
    return res.status(400).json(new ApiResponse(400, null, 'Missing required fields'));
  }

  const existingDeliveryPerson = await DeliveryPerson.findOne({ email });
  if (existingDeliveryPerson) {
    return res.status(400).json(new ApiResponse(400, null, 'Email already in use'));
  }

  const deliveryPerson = new DeliveryPerson({ name, contactInfo, email, password , pantry });
  await deliveryPerson.save();
  res.status(201).json(new ApiResponse(201, deliveryPerson));
});

// Login a delivery person
const loginDeliveryPerson = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const deliveryPerson = await DeliveryPerson.findOne({ email });
  if (!deliveryPerson || !(await deliveryPerson.comparePassword(password))) {
    return res.status(400).json(new ApiResponse(400, null, 'Invalid credentials'));
  }

  const token = deliveryPerson.generateToken();
  res.status(200).json(new ApiResponse(200, { token , user: deliveryPerson}));
});

// Fetch assigned meals for a delivery person
const getAssignedMeals = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deliveryPerson = await DeliveryPerson.findById(id).populate('assignedMeals.mealDeliveryId');

  if (!deliveryPerson) {
    return res.status(404).json(new ApiResponse(404, null, 'Delivery person not found'));
  }

  res.status(200).json(new ApiResponse(200, deliveryPerson.assignedMeals));
});

const getAllPersons = asyncHandler(async (req, res) => {
  const deliveryPersons = await DeliveryPerson.find();
  res.status(200).json(new ApiResponse(200, deliveryPersons));
});

module.exports = {
  createDeliveryPerson,
  loginDeliveryPerson,
  getAssignedMeals,
  getAllPersons
};
