//  Detects an intent given a sentence. 
// const dbg = require('../util/debug_utils.js');
const intentLuis = require('./intent_luis.js');
var getIntent = (input) => {
    return new Promise(async (resolve, reject) => {
        try {
            var luisResponse = await intentLuis.getIntentLUIS(input);
            console.log(luisResponse);
            resolve(luisResponse);
        }
        catch (e) {
            reject('Error in LUIS Service');
        }
    });
}

module.exports = {
    getIntent
};