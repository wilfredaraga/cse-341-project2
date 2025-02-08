const { body, validationResult } = require('express-validator')
const buyerValidationRules = () => {
  return [
    body('firstName').trim().notEmpty().isLength({min:2}).withMessage('Please provide a first name'),
    body('firstName').not().isNumeric().withMessage('Numbers are not allowed'),

    body('lastName').trim().notEmpty().isLength({min:2}).withMessage('Please provide a last name'),
    body('lastName').not().isNumeric().withMessage('Numbers are not allowed'),
    
    body('email').isEmail().notEmpty().withMessage('Please enter a valid email address.'),

    body('phoneNumber').isNumeric().notEmpty().withMessage('Please enter a valid phone number'),

    body('country').trim().notEmpty().withMessage('Please enter your country'),

    body('occupation').trim().notEmpty().isLength({min:2}).withMessage('Please enter an occupation'),
    body('occupation').not().isNumeric().withMessage('Numbers are not allowed'),

    body('preferredCar').trim().notEmpty().isLength({min:2}).withMessage('Please provide your preferred car.'),
    body('preferredCar').not().isNumeric().withMessage('Numbers are not allowed'),

    body('preferredColor').trim().notEmpty().isLength({min:3}).withMessage('Please provide your preferred color'),
    body('preferredColor').not().isNumeric().withMessage('Numbers are not allowed'),
  ]
}

const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors,
  })
}

module.exports = {
  buyerValidationRules,
  validate,
}