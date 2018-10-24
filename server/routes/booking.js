const router = require('express').Router();
const userController = require('../controllers/user');
const bookingController = require('../controllers/booking');

router.route('/').post(userController.authMiddleware ,bookingController.createBooking);
module.exports = router;

