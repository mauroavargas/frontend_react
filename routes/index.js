const cors = require('cors');
const express = require('express');
const router = express.Router();
const {validateToken} = require('../middleware/validations');
const userController = require('../controllers/userController');

router.post('/login', cors(), userController.userLogin);
router.post('/create/user', cors(),  userController.createUser);
// router.use(validateToken);
router.get('/get/all/users', cors(), validateToken,  userController.getAllUsers);
router.put('/modify/user/:userid', cors(), validateToken,  userController.modifiyThisUser);
router.delete('/delete/user/:userid', cors(), validateToken,  userController.deleteThisUser);
router.get('/', cors(), validateToken,  userController.start);
router.get('/get/user/:userid', cors(), validateToken,  userController.getUser);

module.exports = { router };