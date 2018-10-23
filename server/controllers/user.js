const User = require('../models/user');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.auth = (req, res) => {
  const { email, password } = req.body;
  if(!password || !email){
    res.json({errors: [{title: 'Data missing!', detail: 'Provide email and password.'}]});
  }
  User.findOne({email}).exec((err, user)=>{
    if(err) return res.status(422).send({'mongoose': 'err1'});
    if(!user)
      return res.json({errors: [{title: 'Invalid user!', detail: 'User doesn\'t exist.'}]});
    if(user.isSamePassword(password)){
      const token = jwt.sign({
        userId: user._id,
        username: user.username
      }, config.SECRET, {expiresIn: '1h'});
      console.log(token)
      console.log(user)
      return res.json(token);
    }else{
      return res.status(422).json({errors: [{title: 'Wrong data!', detail: 'Wrong email or password'}]});
    }
  });
};
exports.register = (req, res) => {
  const { username, email, password } = req.body;
  if(!password || !email){
    res.status(422).send({errors: [{title: 'Data missing!', detail: 'Provide email and password.'}]});
  }
  // if(password !== confirmPassword){
  //   res.status(422).send({errors: [{title: 'Invalid password!', detail: 'Password is not a same as confirmation'}]});
  // }
  User.findOne({email}).exec((err, existingUser)=>{
    if(err) return res.status(422).send({'mongoose': 'err1'});
    if(existingUser)
      return res.status(422).send({errors: [{title: 'Invalid email!', detail: 'User with this email already exist.'}]});
    const user = new User({username, email, password});
    user.save((err)=>{
      if(err) return res.status(422).send({'mongoose': 'err2'});
      res.json({'registered': true});
    });
  });
};
exports.authMiddleware = (req, res, next) => {
  const token = req.headers.authorization;
  if(token){
    const user = parseToken(token);
    User.findById(user.userId).exec((err, user)=>{
      console.log(user)
      if(err) return res.status(422).send({err});
      if(user){
        res.locals.user = user;
        next();
      }else{
        return res.status(422).send({errors: [{title: 'Not authorized!', detail: 'You need to login to get access'}]});
      }
    });
  }else{
    return res.status(422).send({errors: [{title: 'Not authorized!', detail: 'You need to login to get access'}]});
  }
};
parseToken = (token)=>{
  return jwt.verify(token, config.SECRET);
}
