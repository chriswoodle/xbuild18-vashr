const request = require("request");
const debug = require('debug');
const log = debug('xbuild:client');
const logV = debug('xbuild-v:client');

const config = require('../config.json');
const keys = require('../keys.json');

const recognition = (type, x, y, callback) => {
    log(`recognition type: ${type}`)
    let url = '';
    if (type == 'swimming') {
        url = `https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=${keys.waston_api_key}&url=https://s3.amazonaws.com/xbuild-object/candidate.jpg&version=2018-03-19`;
    } else {
        url = `https://gateway-a.watsonplatform.net/visual-recognition/api/v3/classify?api_key=${keys.waston_api_key}&url=https://s3.amazonaws.com/xbuild-object/candidate.jpg&version=2018-03-19&classifier_ids=sharksv2_2027294388`;
    }
    request.get({ url: url }, (err, httpResponse, body) => {
        if (err) {
            return console.error('Error:', err);
        }
        logV('Server responded with:', body);
        body = JSON.parse(body);
        if (body.images &&
            body.images[0] &&
            body.images[0].classifiers &&
            body.images[0].classifiers[0] &&
            body.images[0].classifiers[0].classes) {
            if (body.images[0].classifiers[0].classes.length == 0) {
                log('Nothing found.');
                tts('No target found');
                return callback(false);
            }
            if (body.images[0].classifiers[0].classes.length == 1) {
                // shark or boat
                switch (body.images[0].classifiers[0].classes[0].class) {
                    case 'shark':
                        log('Found shark');
                        tts(`Target shark located at ${x}, ${y}`);
                        return callback(true);

                        break;
                    case 'boat':
                        log('Found boat');
                        tts(`Target boat located at ${x}, ${y}`);
                        return callback(true);
                        break;
                    default:
                        log('Nothing found.');
                        tss('No target found');
                        return callback(false);
                }
            } else {
                for (const recognizedClass of body.images[0].classifiers[0].classes) {
                    logV(recognizedClass.class);
                    if (recognizedClass.class == 'swimming') {
                        log('Found swimming');
                        tts(`Target swimmer located at ${x}, ${y}`);
                        return callback(true);
                    }
                }
                tss('No target found');
                return callback(false);
            }
        }
    });
};

const tts = (message) => {
    const options = {
        method: 'POST',
        url: `${config.voice_host}/tts`,
        headers:
            {
                'Content-Type': 'application/json'
            },
        body: { text: message },
        json: true
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        console.log(body);
    });
};

module.exports = {
    recognition: recognition
};