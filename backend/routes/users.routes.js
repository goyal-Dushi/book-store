const express = require('express');
const router = express.Router();
const passport = require('passport');
require('../config/passportConfig')(passport);
const userController = require('../controllers/user.controller');

router.route('/').get(userController.getAll_users);
router.route('/register').post(userController.user_register);
router
  .route('/login')
  .get(userController.check_user_login)
  .post(userController.user_login);
router.route('/logout').get(userController.user_logout);
router.route('/profile/:id').get(userController.get_user_profile);

module.exports = router;
