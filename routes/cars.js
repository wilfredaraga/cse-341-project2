const express = require('express');
const router = express.Router();

const { isAuthenticated } = require ('.middleware/authenticate');

const {carValidationRules, validate} = require('../validations/car_validator');
const carsController = require('../controllers/cars');

router.get('/', carsController.getAll);
router.get('/:id', carsController.getSingle);
router.post('/', isAuthenticated, carValidationRules(), validate, carsController.createCar);
router.put('/:id', isAuthenticated, carValidationRules(), validate, carsController.updateCar);
router.delete('/:id', isAuthenticated, carsController.deleteCar);



module.exports = router;