const Booking = require('../models/booking');
const User = require('../models/user');
const Rental = require('../models/rental');
const moment = require('moment');

exports.createBooking = (req, res)=>{
  const { startAt, endAt, totalPrice, guests, days, rental } = req.body;
  const user = res.locals.user;
  const booking = new Booking({startAt, endAt, totalPrice, guests, days});
  Rental.findById(rental._id).populate('bookings').populate('user').exec((err, foundRental)=>{
    if(err) return res.status(422).send({err})
    if(foundRental.user.id == user.id){
      return res.status(422).send({errors: [{title: 'Invalid user!', detail: 'Cannot create booking on your Rental.'}]});
    }
    if(isValidBooking(booking, foundRental)){
      booking.user = user;
      booking.rental = foundRental;
      foundRental.bookings.push(booking);
      booking.save(err=>{
        if(err) return res.status(422).send(err);
        foundRental.save();
        User.update({_id: user.id}, {$push: {bookings: booking}}, function(){});
        return res.json({startAt: booking.startAt, endAt: booking.endAt});
      });
    }else{
      return res.status(422).send({errors: [{title: 'Invalid Booking!', detail: 'Choose dates are already taken!'}]});
    }
    // return res.json({booking, foundRental})
  });
}

isValidBooking = (proposeBooking, rental)=>{
  let isValid = true;
  if(rental.bookings && rental.bookings.length > 0){
    isValid = rental.bookings.every(booking=>{
      const proposedStart = moment(proposeBooking.startAt);
      const proposedEnd = moment(proposeBooking.endAt);
      const actualStart = moment(booking.startAt);
      const actualEnd = moment(booking.endAt);
      // if((actualStart < proposedStart && actualEnd < proposedStart)||(proposedEnd < actualEnd && proposedEnd < actualStart)){
      //   return true;
      // }
      // return false;
      return ((actualStart < proposedStart && actualEnd < proposedStart)||(proposedEnd < actualEnd && proposedEnd < actualStart) ? true : false);
    });
  }
  return isValid;
}
