var express = require('express');
const musicSugestionController = require('../controllers/musicSugestionController');

var musicSugestionRouter = express.Router();

musicSugestionRouter.get('/getMusic', musicSugestionController.sugestMusicByWeather);
musicSugestionRouter.get('/callback', musicSugestionController.spotifyCallBack);
musicSugestionRouter.get('/teste', musicSugestionController.testes);

module.exports = musicSugestionRouter; 