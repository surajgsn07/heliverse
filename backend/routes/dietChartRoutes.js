const express = require('express');
const router = express.Router();
const { createDietChart, getDietChartByPatient, updateDietChart, deleteDietChart ,getAllDietCharts}= require('../controller/dietChartControler.js');


// Routes for delivery persons
router.post('/', createDietChart);
router.get("/getall",getAllDietCharts)
router.get('/:patientId', getDietChartByPatient);
router.put('/:patientId', updateDietChart);
router.delete('/:patientId', deleteDietChart);

module.exports = router;
