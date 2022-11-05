const express = require('express');
const router = express.Router();
const fotocasaController = require('../controllers/fotocasa.controller');

/* GET */
router.get('/', fotocasaController.get);
  
module.exports = router;
