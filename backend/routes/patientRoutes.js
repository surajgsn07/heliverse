const express = require('express');
const router = express.Router();
const {
    createPatient,
    getDietChart,
    getAllPatients
  } = require('../controller/patientController.js');

// Routes for patients
router.post('/', createPatient);
router.get("/getall",getAllPatients)
router.get('/:id', getDietChart);

module.exports = router;
