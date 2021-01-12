const spotifyWebApi = require('../modules/spotifyWebApiModule');
const weatherApi = require('../modules/musicSugestionModule')

exports.sugestMusicByWeather = async function (req, res) {

    const scopes = [
        'ugc-image-upload',
        'user-read-playback-state',
        'user-modify-playback-state',
        'user-read-currently-playing',
        'streaming',
        'app-remote-control',
        'user-read-email',
        'user-read-private',
        'playlist-read-collaborative',
        'playlist-modify-public',
        'playlist-read-private',
        'playlist-modify-private',
        'user-library-modify',
        'user-library-read',
        'user-top-read',
        'user-read-playback-position',
        'user-read-recently-played',
        'user-follow-read',
        'user-follow-modify'
    ];

    return res.redirect(spotifyWebApi.getSpotifyWebApi().createAuthorizeURL(scopes));
}

exports.spotifyCallBack = async function (req, res) {
    const error = req.query.error;
    const code = req.query.code;

    if (error) {
        console.error('Callback Error:', error);
        res.send(`Callback Error: ${error}`);
        return;
    }

    spotifyWebApi.getSpotifyAccessToken(code);

    return res.json(code);
}

exports.testes = async function (req, res){
    //spotifyWebApi.getPlay();
    weatherApi();
    return res.send("ok");
}