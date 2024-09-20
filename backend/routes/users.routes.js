const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.route('/').get(userController.getAll_users);
router.route('/logout').post(userController.user_logout);
router.route('/profile/:id').get(userController.get_user_profile);
router.route('/inventory/:id').get(userController.get_user_inventory);

module.exports = router;
