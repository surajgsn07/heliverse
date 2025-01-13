const express = require('express');
const router = express.Router();
const {
    createMealDelivery,
    getMealDeliveryById,
    updateMealDeliveryStatus,
    deleteMealDelivery,
    getMealDeliveryByPantryId,
    getAllDeliveries,
    getDeliveriesByPatientId,
    assignDeliveryPerson
  } = require('../controller/mealDeliveryController.js');


// Routes for meal deliveries
router.post('/', createMealDelivery);
router.get('/pantry/:pantryId', getMealDeliveryByPantryId);
router.post("/assignDeliveryPerson",assignDeliveryPerson)
router.get('/all', getAllDeliveries);
router.get("/getDeliveriesByPatientId/:patientId",getDeliveriesByPatientId)
router.get('/:deliveryId', getMealDeliveryById);
router.put('/:deliveryId', updateMealDeliveryStatus);
router.delete('/:deliveryId', deleteMealDelivery);


module.exports = router;
