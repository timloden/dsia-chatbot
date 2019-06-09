//  Detects an intent using LUIS given a sentence. 
const axios = require('axios');

// NOTE FOR HEROKU/AZURE NEEDS TO BE SET AS ENV VARIABLE
const pvtkeys = require('../../pvt-keys/pvt-keys.js');

var luisRootURLDSIA = `https://westus.api.cognitive.microsoft.com/luis/v2.0/apps/${pvtkeys.LUIS_APP_ID_DSIA_EN}?verbose=true&timezoneOffset=-360&subscription-key=${pvtkeys.LUIS_API_KEY}&q=`;

var getIntentLUIS = (input) => {
    return new Promise((resolve, reject) => {
        var luisURL = luisRootURLDSIA + input;
        console.log(`Calling LUIS`);
        console.log(`LUISURL: ${luisURL}`);
        axios.get(luisURL).then((response) => {
            if (response.data.query === 'null') {
                throw new Error('No results returned.');
            } else {
                var luisResp = response.data;
                resolve({
                    topIntent: luisResp.topScoringIntent,
                    allIntents: luisResp.intents,
                    entities: luisResp.entities
                });
            }
        }).catch((e) => {
            if (e) {
                reject(`error: ${e}`);
            }
        });
    });
}

module.exports = {
    getIntentLUIS: getIntentLUIS
}