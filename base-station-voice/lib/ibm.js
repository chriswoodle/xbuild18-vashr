const SpeechToTextV1 = require('watson-developer-cloud/speech-to-text/v1');
const TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');

const debug = require('debug');
const log = debug('xbuild:ibm');
const logV = debug('xbuild-v:ibm');
const fs = require('fs');

const keys = require('../keys.json');
const config = require('../config.json');

const watsonSpeechToText = new SpeechToTextV1({
    username: keys.username_stt,
    password: keys.password_stt,
    url: 'https://stream.watsonplatform.net/speech-to-text/api/'
});

const speechToText = (file, callback) => {
    logV(file);
    var params = {
        audio: fs.createReadStream(file),
        content_type: 'audio/wav',
        keywords: config.keywords,
        keywords_threshold: config.keywords_threshold, // keywords_threshold must be set if keywords list is not empty.
        model: 'en-US_NarrowbandModel' // This 8000hz audio input requires a narrow band model.  See https://<STT_API_ENDPOINT>/v1/models for a list of available models.
    };

    watsonSpeechToText.recognize(params, function (err, res) {
        if (err)
            console.log(err);
        else
            logV(JSON.stringify(res, null, 2));
        if (res.results && res.hasOwnProperty('result_index')
            && res.results[res['result_index']]
            && res.results[res['result_index']].alternatives
            && res.results[res['result_index']].alternatives[0]
            && res.results[res['result_index']].alternatives[0].transcript) {
            callback(res.results[res.result_index].alternatives[0].transcript);
        }
        else {
            callback(null);
        }
    });
}

const textToSpeech = (message, callback) => {
    var watsonTextToSpeech = new TextToSpeechV1({
        username: keys.username_tts,
        password: keys.password_tts,
        url: 'https://stream.watsonplatform.net/text-to-speech/api/'
    });

    var params = {
        text: message || 'Hello from IBM Watson',
        voice: 'en-US_AllisonVoice', // Optional voice
        accept: 'audio/wav'
    };

    // Synthesize speech, correct the wav header, then save to disk
    // (wav header requires a file length, but this is unknown until after the header is already generated and sent)
    watsonTextToSpeech
        .synthesize(params, function (err, audio) {
            if (err) {
                console.log(err);
                return;
            }
            watsonTextToSpeech.repairWavHeader(audio);
            fs.writeFileSync('./recordings/generated.wav', audio);
            if(callback) callback();
            return;
        });
}

module.exports = {
    speechToText: speechToText,
    textToSpeech: textToSpeech
};