const express = require('express');
const router = express.Router();
const{
    createPantry,
    loginPantry,
    getAssignedTasks,
    getAllPantries
  }= require('../controller/pantryController.js');

// Routes for pantries
router.post('/', createPantry);
router.post('/login', loginPantry);
router.get("/getall",getAllPantries)
router.get('/:id', getAssignedTasks);
module.exports = router;
