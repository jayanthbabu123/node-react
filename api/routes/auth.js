var express = require('express');
var AuthController = require('../controllers/auth');
var router = express.Router();
var ac = new AuthController();

router.post('/login', ac.login.bind(this));
router.post('/signup', ac.signup.bind(this));

module.exports = router;