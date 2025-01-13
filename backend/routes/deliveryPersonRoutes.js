const express = require('express');
const router = express.Router();
const  {
    createDeliveryPerson,
    loginDeliveryPerson,
    getAssignedMeals,
    getAllPersons
  } = require('../controller/deliveryPersonController.js');


// Routes for delivery persons
router.post('/', createDeliveryPerson);
router.post('/login', loginDeliveryPerson);
router.get("/getall",getAllPersons)
router.get('/:id', getAssignedMeals);

module.exports = router;
