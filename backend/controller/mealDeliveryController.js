const DeliveryPerson = require('../models/DeliveryPerson.js');
const DietChart = require('../models/DietChart.js');
const MealDelivery = require('../models/MealDelivery.js'); // Import the MealDelivery model
const {ApiResponse} = require('../utils/ApiResponse.js'); // Utility for API responses
const {asyncHandler} = require('../utils/asyncHandler.js'); // Async handler to manage async errors
const mongoose = require('mongoose'); // Mongoose for ObjectId validation

// Utility function to validate ObjectId
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

// Create a new meal delivery
const createMealDelivery = asyncHandler(async (req, res) => {
  const { patientId, pantryId ,shift} = req.body;

  // console.log({ patientId, pantryId ,shift})

  // Validation: Ensure all required fields are provided
  if (!patientId  || !pantryId || !shift) {
    return res.status(400).json(new ApiResponse(400, null, 'Missing required fields'));
  }

  // Validate the patientId, dietChartId, pantryId to ensure they are valid ObjectIds
  if (!isValidObjectId(patientId)  || !isValidObjectId(pantryId)) {
    return res.status(400).json(new ApiResponse(400, null, 'Invalid ObjectId(s)'));
  }

  const dietChart = await DietChart.findOne({ patientId });
  if(!dietChart){
    res.status(400).json(new ApiResponse(400 , null, "Diet chart for this patient not found"));
  }

  // Create a new MealDelivery document
  const mealDelivery = new MealDelivery({ patientId, dietChartId:dietChart?._id, pantryId, shift });
  await mealDelivery.save();

  // Return success response
  res.status(201).json(new ApiResponse(201, mealDelivery));
});

// Get meal delivery details by delivery ID
const getMealDeliveryById = asyncHandler(async (req, res) => {
  const { deliveryId } = req.params;

  

  // Validate the deliveryId to ensure it's a valid ObjectId
  if (!isValidObjectId(deliveryId)) {
    return res.status(400).json(new ApiResponse(400, null, 'Invalid delivery ID'));
  }

  // Find the meal delivery by its ID
  const mealDelivery = await MealDelivery.find({deliveryPersonId:deliveryId})
    .populate('patientId').populate('dietChartId').populate('pantryId').populate('deliveryPersonId'); // Populate references


  // Return the found meal delivery
  res.status(200).json(new ApiResponse(200, mealDelivery));
});

// Update the status of a meal delivery
const updateMealDeliveryStatus = asyncHandler(async (req, res) => {
  const { deliveryId } = req.params;
  const { status } = req.body;

  // Validate the status value
  if (!['Prepared', 'Out for Delivery', 'Delivered'].includes(status)) {
    return res.status(400).json(new ApiResponse(400, null, 'Invalid status'));
  }

  // Validate the deliveryId to ensure it's a valid ObjectId
  if (!isValidObjectId(deliveryId)) {
    return res.status(400).json(new ApiResponse(400, null, 'Invalid delivery ID'));
  }

  // Find and update the meal delivery status by deliveryId
  const mealDelivery = await MealDelivery.findByIdAndUpdate(
    deliveryId,
    { status },
    { new: true } // Return the updated document
  );

  // If no meal delivery is found
  if (!mealDelivery) {
    return res.status(404).json(new ApiResponse(404, null, 'Meal delivery not found'));
  }

  // Return the updated meal delivery
  res.status(200).json(new ApiResponse(200, mealDelivery));
});

// Delete a meal delivery
const deleteMealDelivery = asyncHandler(async (req, res) => {
  const { deliveryId } = req.params;

  // Validate the deliveryId to ensure it's a valid ObjectId
  if (!isValidObjectId(deliveryId)) {
    return res.status(400).json(new ApiResponse(400, null, 'Invalid delivery ID'));
  }

  // Find and delete the meal delivery by deliveryId
  const mealDelivery = await MealDelivery.findByIdAndDelete(deliveryId);

  // If no meal delivery is found
  if (!mealDelivery) {
    return res.status(404).json(new ApiResponse(404, null, 'Meal delivery not found'));
  }

  // Return success response
  res.status(200).json(new ApiResponse(200, null, 'Meal delivery deleted successfully'));
});


const getMealDeliveryByPantryId = asyncHandler(async (req, res) => {
  const { pantryId } = req.params;

  // Validate the pantryId to ensure it's a valid ObjectId
  if (!isValidObjectId(pantryId)) {
    return res.status(400).json(new ApiResponse(400, null, 'Invalid pantry ID'));
  }

  // Find the meal delivery by pantryId
  const mealDelivery = await MealDelivery.find({ pantryId }).populate('patientId dietChartId pantryId deliveryPersonId');
  // console.log({mealDelivery})

  // Return the found meal delivery
  res.status(200).json(new ApiResponse(200, mealDelivery));

})


const getAllDeliveries = asyncHandler(async (req, res) => {
  const deliveries = await MealDelivery.find().populate('patientId').populate('dietChartId').populate('pantryId').populate('deliveryPersonId');
  res.status(200).json(new ApiResponse(200, deliveries));
})

const getDeliveriesByPatientId = asyncHandler(async (req, res) => {
  const {patientId} = req.params;
  const deliveries = await MealDelivery.find({patientId}).populate('patientId').populate('dietChartId').populate('pantryId').populate('deliveryPersonId');
  res.status(200).json(new ApiResponse(200, deliveries));
})

const assignDeliveryPerson = asyncHandler(async (req, res) => {
  const { deliveryId, deliveryPersonId } = req.body;
  // console.log({ deliveryId, deliveryPersonId } )

  // Validate the deliveryId to ensure it's a valid ObjectId
  if (!isValidObjectId(deliveryId)) {
    return res.status(400).json(new ApiResponse(400, null, 'Invalid delivery ID'));
  }

  // Validate the deliveryPersonId to ensure it's a valid ObjectId
  if (!isValidObjectId(deliveryPersonId)) {
    return res.status(400).json(new ApiResponse(400, null, 'Invalid delivery person ID'));
  }

  // Find the meal delivery by deliveryId
  const mealDelivery = await MealDelivery.findById(deliveryId);

  // If no meal delivery is found
  if (!mealDelivery) {
    return res.status(404).json(new ApiResponse(404, null, 'Meal delivery not found'));
  }

  // Find the delivery person by deliveryPersonId
  const deliveryPerson = await DeliveryPerson.findById(deliveryPersonId);

  // If no delivery person is found
  if (!deliveryPerson) {
    return res.status(404).json(new ApiResponse(404, null, 'Delivery person not found'));
  }

  // Assign the delivery person to the meal delivery
  mealDelivery.deliveryPersonId = deliveryPersonId;
  mealDelivery.status = 'Prepared';
  await mealDelivery.save();

  // Assign the meal delivery to the delivery person
  deliveryPerson.assignedMeals.push({ mealDeliveryId: deliveryId });
  await deliveryPerson.save();

  // Return both the updated meal delivery and delivery person
  res.status(200).json(new ApiResponse(200, {
    mealDelivery,
    deliveryPerson
  }));
});

module.exports = {
  createMealDelivery,
  getMealDeliveryById,
  updateMealDeliveryStatus,
  deleteMealDelivery,
  getMealDeliveryByPantryId,
  getAllDeliveries,
  getDeliveriesByPatientId,
  assignDeliveryPerson
};
