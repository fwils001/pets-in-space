const express = require('express');
const router = express.Router();

//controllers
const ctrls = require('../controllers');

//http://localhost:3003/holidays

router.get('/', ctrls.pets.index);
router.post('/', ctrls.pets.create);
router.put('/:id', ctrls.pets.update);
router.delete('/:id', ctrls.pets.destroy);

module.exports = router;