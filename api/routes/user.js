var express = require('express');
var UserController = require('../controllers/user');
var router = express.Router();
var uc = new UserController();

router.get('/', uc.get.bind(this));
router.get('/search', uc.search.bind(this));
router.delete('/delete/:email', uc.delete.bind(this));

module.exports = router;