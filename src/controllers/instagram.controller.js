const InstagramService = require("../Domain/Instagram/Services/InstagramService");

async function get(req, res, next) {
  console.log('Starting Get Instagram Controller Request')
  // Get Basic User Data
  const instagramService = new InstagramService();
  
  let data = await instagramService.getBasicInfo();

  // Get Specific Data

  // Get Followers & Following Data
}

async function create(req, res, next) {}

async function update(req, res, next) {}

async function remove(req, res, next) {}

module.exports = {
  get,
  create,
  update,
  remove,
};
