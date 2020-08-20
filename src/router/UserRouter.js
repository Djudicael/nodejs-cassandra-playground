const router = require('express').Router();

const UserController = require('../controller/UserController')


router.get('/', UserController.getUsers);
router.get('/:username', UserController.getUser);

router.post('/', UserController.addUser);

module.exports = router;