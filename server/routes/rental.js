const router = require('express').Router();
const Rental = require('../models/rental');

router.route('/').get((req,res,next)=>{
  Rental.find({}).then(foundRentals=>res.json(foundRentals));
});
router.route('/:id').get((req,res,next)=>{
  Rental.findById(req.params.id).then(foundRental=>res.json(foundRental))
  .catch(err=>res.status(422).send({errors:{title: 'Rental Error', detail: 'Cound not find Rental!'}}));
});
module.exports = router;
