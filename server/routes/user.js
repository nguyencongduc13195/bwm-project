const router = require('express').Router();
const userController = require('../controllers/user');
router.get('/secret', userController.authMiddleware,(req,res)=>{
  return res.json({secret: 'ok'})
});
router.route('/auth').post(userController.auth);
router.route('/register').post(userController.register);
module.exports = router;

