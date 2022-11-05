const express = require('express')
const IdealistaService = require('../Domain/Idealista/Services/IdealistaService')

async function get(req, res, next) {
  // Get Basic User Data
  console.log('aaaaaaaaaaaaaaaa');
  const idealistaService = new IdealistaService();

  let data = await idealistaService.getBasicInfo();
}



module.exports = {
  get,
};
