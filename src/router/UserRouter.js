const router = require('express').Router();

const UserController = require('../controller/UserController')


router.get('/', UserController.getUsers);

module.exports = router;