const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQAg3TmwI80FsVfhuDG1tvi2WyMO_e2eNkPjPd7WvBE3FjtBFOEzVDJMwow4AFDH6XdsiNQMD847nVOkWCnxtuT-6XM6KB6TRnk_0Ff4hRjDF_Kjp0a3mTlD2C-vB2hZ9rtss_XkXMUlNHi-94Kc6ux1nOhr1OHUnIqSJUth4klQ13Fohk4qb2eb-d6ElUn0GQnP_Mjd0u7odtzyoT9ijT5guwp5OIBrKpDrR2HvFVD4NIjkqV2J-3bCsTl_rfIkgtmSB02OnvR9TMxka3qi4iA1g5A7cWjetM_vCRdWn1X1doQ";

const spotifyApi = new SpotifyWebApi({
    redirectUri: 'http://localhost:3000/callback',
    clientId: '0e55063ad2d54ebb9234e51dfccc091b',
    clientSecret: '0954504b10fe4a3796ef102beaa9b6b0'
});

const getSpotifyWebApi = function () {
    return spotifyApi;
}

const getSpotifyAccessToken = function (code) {

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

const getPlay = async function () {

    const newSpotfyApi = new SpotifyWebApi();

    newSpotfyApi.setAccessToken(token);

    const me = await newSpotfyApi.getMe();

    getPlayList(me.body.id, newSpotfyApi);
}

let getPlayList = async function(userId, api){

    const data = await api.getUserPlaylists(userId);

    for (let playlists of data.body.items){
        console.log(playlists.name + " " + playlists.id);

        let tracks = await getPlayListTracks(playlists.id, api);
        console.log(tracks)
    }

    console.log(data.body);
}

let getPlayListTracks = async function(playlistId, api){

    const data = await api.getPlaylistTracks(playlistId,{
        offset: 1,
        limit: 100,
        fields: 'items'
    })

    console.log(data.body);
}

module.exports =
{
    getSpotifyWebApi,
    getSpotifyAccessToken,
    getPlay
};