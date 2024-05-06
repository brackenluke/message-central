const router = require('express').Router();
const {Message} = require('../models');

//adding a message
router.put('/Messages');

//getting a message
router.get('/Messages');

module.exports = router;