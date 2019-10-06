const Spot = require('../models/Spot');
const User = require('../models/Users');

module.exports = {

  async index(req, res) {
    const { tech } = req.query;
    const spots = await Spot.find({ techs: tech });
    return res.json(spots);
  },

  async store(req, res) {
    
    // req.body => body data
    // req.query => query params
    // req.file => files
    // req.headers => headers

    const { company, price, techs } = req.body;
    const { filename } = req.file;
    const { user_id } = req.headers;

    // verify if the user exists

    const user = await User.find({ user: user_id });
    if (!user) {
      return res.json({ error: 'The given User was not found!' });
    }

    const spot = await Spot.create({
      user: user_id,
      thumbnail: filename,
      company,
      techs: techs.split(',').map(tech => (tech.trim())),
      price
    });

    return res.json({ ok: spot });
  }
};