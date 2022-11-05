const express = require('express');
const router = express.Router();
const idealistaController = require('../controllers/idealista.controller');

/* GET */
router.get('/', idealistaController.get);
  
module.exports = router;
