const express = require('express');
const router = express.Router();

const {buyerValidationRules, validate} = require('../validations/buyer_validator')
const buyersController = require('../controllers/buyers');

router.get('/', buyersController.getAll);
router.get('/:id', buyersController.getSingle);
router.post('/', buyerValidationRules(), validate, buyersController.createBuyer);
router.put('/:id', buyerValidationRules(), validate, buyersController.updateBuyer);
router.delete('/:id', buyersController.deleteBuyer);



module.exports = router;