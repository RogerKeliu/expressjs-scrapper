const express = require('express')
const IdealistaService = require('../Domain/Idealista/Services/IdealistaService')

async function get(req, res, next) {
  // Get Basic User Data
  console.log('aaaaaaaaaaaaaaaa');
  const idealistaService = new IdealistaService();

  let data = await idealistaService.getBasicInfo();
  let realState = [];
  for (const a of data) {
      realState = [...realState, ...a['realEstates']]
  }
  res.json({ data: data, estates: realState });

  // Get Specific Data

  // Get Followers & Following Data
}



module.exports = {
  get,
};
