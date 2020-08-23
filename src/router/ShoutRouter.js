const router = require('express').Router();

const ShoutControler = require('../controller/ShoutControler')


router.get('/', ShoutControler.getShouts);
router.get('/:username', ShoutControler.getUserShout);
router.post('/', ShoutControler.addShout);

module.exports = router;