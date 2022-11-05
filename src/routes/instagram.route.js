const express = require('express');
const router = express.Router();
const instagramController = require('../controllers/instagram.controller');

/* GET */
router.get('/', instagramController.get);
  
module.exports = router;
