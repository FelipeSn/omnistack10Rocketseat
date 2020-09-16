const axios = require('axios');
const Dev = require('../models/Dev');
const parseStringAsArray = require('../utils/parseStringAsArray');
const { findConnections, sendMessage } = require('../websocket');

module.exports = {
  async index(request, response) {
    const devs = await Dev.find();

    return response.json(devs);
  },

  async store(request, response) {

    const { github_username, techs, latitude, longitude } = request.body;

    let dev = await Dev.findOne({ github_username });

    if (!dev) {
      //CHAMADA DE API DA GITHUB
      const apiResponse = await axios.get(`https://api.github.com/users/${github_username}`);

      const { name = login, avatar_url, bio } = apiResponse.data;

      //const techsArray = techs.split(',').map(tech => tech.trim());
      const techsArray = parseStringAsArray(techs);

      const location = {
        type: 'Point',
        coordinates: [longitude, latitude],
      };

      dev = await Dev.create({
        github_username,
        name,
        avatar_url,
        bio,
        techs: techsArray,
        location,
      })

      //Filtrar as conexoes que estao ha no maximo 10km de distancia e que o novo dev tenha uma das techs filtradas
      const sendSocketMessageTo = findConnections(
        { latitude, longitude },
        techsArray,
      )
      sendMessage(sendSocketMessageTo, 'new-dev', dev);
;    }

    return response.json(dev);
  }
}