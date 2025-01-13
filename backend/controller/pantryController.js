const Pantry = require('../models/Pantry.js');
const {ApiResponse} = require('../utils/ApiResponse.js');
const {asyncHandler} = require('../utils/asyncHandler.js');

// Create a new pantry
const createPantry = asyncHandler(async (req, res) => {
  const { name, contactInfo, location, email, password } = req.body;

  console.log({ name, contactInfo, location, email, password })

  if (!name || !contactInfo || !location || !email || !password) {
    return res.status(400).json(new ApiResponse(400, null, 'Missing required fields'));
  }

  const existingPantry = await Pantry.findOne({ email });
  if (existingPantry) {
    return res.status(400).json(new ApiResponse(400, null, 'Email already in use'));
  }

  const pantry = new Pantry({ name, contactInfo, location, email, password });
  await pantry.save();
  res.status(201).json(new ApiResponse(201, pantry));
});

// Login a pantry
const loginPantry = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  
  const pantry = await Pantry.findOne({ email });
  if (!pantry || !(await pantry.comparePassword(password))) {
    return res.status(400).json(new ApiResponse(400, null, 'Invalid credentials'));
  }

  const token = pantry.generateToken();
  res.status(200).json(new ApiResponse(200, { token  , user: pantry}));
});

// Fetch assigned tasks for a pantry
const getAssignedTasks = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const pantry = await Pantry.findById(id).populate('assignedTasks.dietChartId');

  if (!pantry) {
    return res.status(404).json(new ApiResponse(404, null, 'Pantry not found'));
  }

  res.status(200).json(new ApiResponse(200, pantry.assignedTasks));
});

const getAllPantries = asyncHandler(async (req, res) => {
  const pantries = await Pantry.find();
  res.status(200).json(new ApiResponse(200, pantries));
});

module.exports = {
  createPantry,
  loginPantry,
  getAssignedTasks,
  getAllPantries
};
