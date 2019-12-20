const express = require('express');
const router = express.Router();
const {validateToken} = require('../middleware/validations');
const userController = require('../controllers/userController');

router.post('/login', userController.userLogin);
router.post('/create/user', userController.createUser);
router.use(validateToken);
router.get('/get/all/users', userController.getAllUsers);
router.put('/modify/user/:userid', userController.modifiyThisUser);
router.delete('/delete/user/:userid', userController.deleteThisUser);
router.get('/', userController.start);
router.get('/get/user/:userid', userController.getUser);

module.exports = { router };