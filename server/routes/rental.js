const router = require('express').Router();
const Rental = require('../models/rental');

router.route('/').get((req,res,next)=>{
  Rental.find({}).select('-bookings').then(foundRentals=>res.json(foundRentals));
});
router.route('/:id').get((req,res,next)=>{
  Rental.findById(req.params.id).populate('bookings', 'startAt endAt -_id').populate('user', 'username -_id').then(foundRental=>res.json(foundRental))
  .catch(err=>res.status(422).send({errors:{title: 'Rental Error', detail: 'Cound not find Rental!'}}));
});
module.exports = router;
