const router = require('express').Router();

router.use('/', require('./swagger'));

router.use('/cars', require('./cars'));
router.use('/buyers', require('./buyers'));

module.exports = router;