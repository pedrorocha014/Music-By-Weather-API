const weather = require('openweather-apis');

const getPlayList = function(){

    weather.setLang('pt');
    weather.setCity('Salvador');
    weather.setUnits('metric');
    weather.setAPPID('b77e07f479efe92156376a8b07640ced');

    weather.getTemperature(function(err, temp){
		console.log(temp);
	});
}

module.exports = getPlayList;