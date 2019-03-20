const request = require('request-promise-native');

module.exports = async (models, steamIds) => request.get('https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/', {
  qs: {
    key: process.env.STEAM_API_KEY,
    format: 'json',
    steamids: steamIds.join(','),
  },
  json: true,
}).then(response => Promise.all(response.response.players.map(player => models.Player.findOrCreate({
  where: {
    steamId: player.steamid,
  },
  defaults: {
    username: player.personaname,
  },
}).then((playerRecord) => {
  const profile = player;
  profile.id = playerRecord[0].dataValues.id;
  return profile;
})))).catch((e) => {
  throw e;
});
