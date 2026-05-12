const express = require('express');
const router = new express.Router();
const contacts = require('./contacts');
const swagger = require('./swagger');

router.use('/', swagger);
router.use('/contacts', contacts);

router.get('/', (req, res) => {
  res.send('Hello World');
});

module.exports = router;
