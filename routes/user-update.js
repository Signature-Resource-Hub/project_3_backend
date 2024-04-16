const express = require('express');
const router = express.Router();
const userController = require('../controller/user-update');
router.post('/forgot-password', userController.forgotPassword);
router.post('/updateuser', userController.updateUser);
router.post('/updateEmail',userController.updateEmail);
router.post('/updatePhone',userController.updatePhone);
router.post('/updatePass',userController.updatePassword);
router.post('/getUser',userController.getUser);

module.exports = router;


