const { body, validationResult } = require('express-validator')
const carValidationRules = () => {
  return [
    body('brand').trim().notEmpty().isLength({min:2}).withMessage('Please enter the brand'),

    body('model').trim().notEmpty().isLength({min:2}).withMessage('Please enter the model'),

    body('year').isNumeric().withMessage('Please enter the year'),

    body('color').trim().notEmpty().isLength({min:2}).withMessage('Please enter the color'),

    body('transmission').trim().notEmpty().isLength({min:2}).withMessage('Please enter the transmission: Manual or Automatic'),
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
  carValidationRules,
  validate,
}