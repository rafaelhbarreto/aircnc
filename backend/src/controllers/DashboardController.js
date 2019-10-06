const SpotController = require('./SpotController');
const Spot = require('../models/Spot');

module.exports = {

  /**
   * Return only spots that was created by the given user
   * 
   * @param {*} req 
   * @param {*} res 
   */
  async show(req, res) {

    const { user_id } = req.headers;

    const spots = await Spot.find({ user: user_id });
    return res.json(spots);
  }
}