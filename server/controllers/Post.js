const router = require('express').Router();
const {User} = require('../models');
const {Post} = require('../models');
//updating a post
router.put('/Posts')
//creating a post
router.get('/Posts')
//deleting  a post
router.delete('/Posts')
//get all posts created from one user
router.get('/Posts');

module.exports = router;