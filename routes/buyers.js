const express = require('express');
const router = express.Router();
const { isAuthenticated } = require ('.middleware/authenticate');

const {buyerValidationRules, validate} = require('../validations/buyer_validator')
const buyersController = require('../controllers/buyers');

router.get('/', buyersController.getAll);
router.get('/:id', buyersController.getSingle);
router.post('/', isAuthenticated, buyerValidationRules(), validate, buyersController.createBuyer);
router.put('/:id', isAuthenticated, buyerValidationRules(), validate, buyersController.updateBuyer);
router.delete('/:id', isAuthenticated, buyersController.deleteBuyer);



module.exports = router;