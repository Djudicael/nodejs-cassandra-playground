const router = require('express').Router();

const UserController = require('../controller/UserController')


router.get('/', UserController.getUsers);
router.get('/:username', UserController.getUser);
router.put('/:username', UserController.editUser);
router.delete('/:username', UserController.deleteUser);

router.post('/', UserController.addUser);

module.exports = router;