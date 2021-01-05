var express = require('express');
const musicSugestionController = require('../controllers/musicSugestionController');

var musicSugestionRouter = express.Router();

musicSugestionRouter.get('/teste', musicSugestionController.sugestMusicByWeather);

module.exports = musicSugestionRouter; 