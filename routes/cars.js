const express = require('express');
const router = express.Router();

const {carValidationRules, validate} = require('../validations/car_validator');
const carsController = require('../controllers/cars');

router.get('/', carsController.getAll);
router.get('/:id', carsController.getSingle);
router.post('/', carValidationRules(), validate, carsController.createCar);
router.put('/:id', carValidationRules(), validate, carsController.updateCar);
router.delete('/:id', carsController.deleteCar);



module.exports = router;