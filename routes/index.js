const cors = require('cors');
const express = require('express');
const router = express.Router();
const {validateToken} = require('../middleware/validations');
const userController = require('../controllers/userController');

router.post('/login', cors(), userController.userLogin);
router.post('/create/user', cors(),  userController.createUser);
router.use(validateToken);
router.get('/get/all/users', cors(),  userController.getAllUsers);
router.put('/modify/user/:userid', cors(),  userController.modifiyThisUser);
router.delete('/delete/user/:userid', cors(),  userController.deleteThisUser);
router.get('/', cors(),  userController.start);
router.get('/get/user/:userid', cors(),  userController.getUser);

module.exports = { router };