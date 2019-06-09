const intentDetect = require('./intent_detection.js');
const answerList = require('./responses.json');
var _ = require('lodash');

var getBotResponse = async (inputToSend) => {
    return new Promise(async (resolve, reject) => {
        try {
            var intentResponse = await intentDetect.getIntent(inputToSend);
            if (intentResponse === 'null') {
                throw new Error('No results returned.');
            } else {
                var topIntent = intentResponse.topIntent.intent;
                var botAnswer = await getResponseForIntent(answerList, topIntent);
                console.log(botAnswer);
                resolve(botAnswer);
            }
        }
        catch (e) {
            reject(`error: ${e}`);
        }
    });
}

var getResponseForIntent = async (intentMap, intent) => {

    var returnResult = '';

    // TODO: THIS IS WHERE YOU CAN ADD CUSTOM INTENT HANDLERS
    // I.E. CALL ANOTHER SERVICE, SCREEN SCRAPE, ETC...

    if (intent == 'general_hello') {
        returnResult = 'Hello! This is from a special intent response.';
    } else {
        
        // Otherwise we use the standard Q&A mapping:

        var foundanswer = _.filter(intentMap.answers, function (q) {
            return q.intent == intent;
        });
        returnResult = foundanswer[0].answer
    }

    return (returnResult);
}

module.exports = { getBotResponse }