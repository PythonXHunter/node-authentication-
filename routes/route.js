const express = require('express');
const router = express.Router();
const UserController = require('../controllers/controller');
const checkLoginIn = require('../middleware/checkLoginIn');

router.get('/signup', UserController.userCreateGet);
router.post('/signup', UserController.userCreatePost);
router.get('/login', UserController.userLoginGet);
router.post('/login', UserController.userLoginPost);
router.get('/protected_page', UserController.userSecurePage);

module.exports = router;
