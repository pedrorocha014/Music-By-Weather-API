const SpotifyWebApi = require('spotify-web-api-node');

const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000/callback',
    clientId: '0e55063ad2d54ebb9234e51dfccc091b',
    clientSecret: '0954504b10fe4a3796ef102beaa9b6b0'
});

const getSpotifyWebApi = function(){
    return spotifyApi;
}

const getSpotifyAccessToken = function(code){

    spotifyApi
        .authorizationCodeGrant(code)
        .then(data => {
            const access_token = data.body['access_token'];
            const refresh_token = data.body['refresh_token'];
            const expires_in = data.body['expires_in'];

            spotifyApi.setAccessToken(access_token);
            spotifyApi.setRefreshToken(refresh_token);

            console.log('access_token:', access_token);
            console.log('refresh_token:', refresh_token);

            console.log(
                `Sucessfully retreived access token. Expires in ${expires_in} s.`
            );

            setInterval(async () => {
                const data = await spotifyApi.refreshAccessToken();
                const access_token = data.body['access_token'];

                console.log('The access token has been refreshed!');
                console.log('access_token:', access_token);
                spotifyApi.setAccessToken(access_token);
            }, expires_in / 2 * 1000);
        });
}

module.exports = {getSpotifyWebApi, getSpotifyAccessToken};