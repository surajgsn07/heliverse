const DietChart = require('../models/DietChart.js'); // Import the DietChart model
const {ApiResponse} = require('../utils/ApiResponse.js'); // Utility for API responses
const {asyncHandler} = require('../utils/asyncHandler.js'); // Async handler to manage async errors
const mongoose = require('mongoose'); // Mongoose for ObjectId validation

// Utility function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create a new diet chart for a patient
const createDietChart = asyncHandler(async (req, res) => {
  const { patientId, morning, evening, night } = req.body;

  // Validation: Ensure all required fields are provided
  if (!patientId || !morning || !evening || !night) {
    return res.status(400).json(new ApiResponse(400, null, 'Missing required fields'));
  }

  // Validate the patientId to ensure it's a valid ObjectId
  if (!isValidObjectId(patientId)) {
    return res.status(400).json(new ApiResponse(400, null, 'Invalid patient ID'));
  }

  // Create a new DietChart document
  const dietChart = new DietChart({ patientId, morning, evening, night });
  await dietChart.save();

  // Return success response
  res.status(201).json(new ApiResponse(201, dietChart));
});

// Get diet chart for a specific patient
const getDietChartByPatient = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  // Validate the patientId to ensure it's a valid ObjectId
  if (!isValidObjectId(patientId)) {
    return res.status(400).json(new ApiResponse(400, null, 'Invalid patient ID'));
  }

  // Find the diet chart by patientId
  const dietChart = await DietChart.findOne({ patientId });

  // If no diet chart is found
  if (!dietChart) {
    return res.status(404).json(new ApiResponse(404, null, 'Diet chart not found for this patient'));
  }

  // Return the found diet chart
  res.status(200).json(new ApiResponse(200, dietChart));
});

// Update a diet chart for a patient
const updateDietChart = asyncHandler(async (req, res) => {
  const { patientId } = req.params;
  const { morning, evening, night } = req.body;

  // Validation: Ensure at least one field is provided for update
  if (!morning && !evening && !night) {
    return res.status(400).json(new ApiResponse(400, null, 'At least one meal must be provided for update'));
  }

  // Validate the patientId to ensure it's a valid ObjectId
  if (!isValidObjectId(patientId)) {
    return res.status(400).json(new ApiResponse(400, null, 'Invalid patient ID'));
  }

  // Find and update the diet chart by patientId
  const dietChart = await DietChart.findOneAndUpdate(
    { patientId },
    { morning, evening, night },
    { new: true } // Return the updated document
  );

  // If diet chart not found
  if (!dietChart) {
    return res.status(404).json(new ApiResponse(404, null, 'Diet chart not found for this patient'));
  }

  // Return the updated diet chart
  res.status(200).json(new ApiResponse(200, dietChart));
});

// Delete a diet chart for a patient
const deleteDietChart = asyncHandler(async (req, res) => {
  const { patientId } = req.params;

  // Validate the patientId to ensure it's a valid ObjectId
  if (!isValidObjectId(patientId)) {
    return res.status(400).json(new ApiResponse(400, null, 'Invalid patient ID'));
  }

  // Find and delete the diet chart by patientId
  const dietChart = await DietChart.findOneAndDelete({ patientId });

  // If diet chart not found
  if (!dietChart) {
    return res.status(404).json(new ApiResponse(404, null, 'Diet chart not found for this patient'));
  }

  // Return success response
  res.status(200).json(new ApiResponse(200, null, 'Diet chart deleted successfully'));
});

const getAllDietCharts  = asyncHandler(async(req,res)=>{
  const dietCharts = await DietChart.find();
  res.status(200).json(new ApiResponse(200, dietCharts));
})

module.exports = { createDietChart, getDietChartByPatient, updateDietChart, deleteDietChart , getAllDietCharts };
