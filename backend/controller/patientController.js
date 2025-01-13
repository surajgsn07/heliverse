const DietChart = require('../models/DietChart.js');
const Patient = require('../models/Patient.js');
const { ApiResponse } = require('../utils/ApiResponse.js');
const { asyncHandler } = require('../utils/asyncHandler.js');

// Create a new patient
const createPatient = asyncHandler(async (req, res) => {
  const { 
    name, 
    diseases = [], 
    roomNumber, 
    bedNumber, 
    floorNumber, 
    age, 
  } = req.body;

  // Validate required fields
  if (!name || !roomNumber || !bedNumber || !floorNumber || !age || !diseases ) {
    return res.status(400).json(new ApiResponse(400, null, 'Missing required fields'));
  }

  // Create a new patient
  const patient = new Patient({
    name,
    diseases,
    roomNumber,
    bedNumber,
    floorNumber,
    age,
  });

  await patient.save();
  res.status(201).json(new ApiResponse(201, patient, 'Patient created successfully'));
});

// Fetch a patient's diet chart
const getDietChart = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the diet chart by patient ID
  const dietChart = await DietChart.findOne({ patientId: id }).populate('patientId');

  if (!dietChart) {
    return res.status(404).json(new ApiResponse(404, null, 'Diet chart not found for this patient'));
  }

  res.status(200).json(new ApiResponse(200, dietChart));
});

// Fetch all patients
const getAllPatients = asyncHandler(async (req, res) => {
  const patients = await Patient.find();
  res.status(200).json(new ApiResponse(200, patients));
});

module.exports = {
  createPatient,
  getDietChart,
  getAllPatients
};
