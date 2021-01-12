const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQA7fVclfD2-yELyUV74mn0I3ef1OrRiuL-tO607_cFtzI4XwclimSdWugvW3BVwBW16weezXid2gNfR5yqYzYcWeA_LVoFidE5W2-a1zXJjC63BzshZUfxA2qjDfV7rxfnVfd1gXnyFVjCoTtAzDOEogNx2DGVrD5WeViTfkr_jn0i8yeURMi7AlLQEc0ylZM-mxQHZLbIUT5A-LqMIjSlO8HdVRyL7t2FSySfi2zoktdtB85gS9udo850eQ_TN1wLq38EnQ2kn9_Q61nuyh49x3XMbADVNcCrkAPwXOyE31Yg";

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