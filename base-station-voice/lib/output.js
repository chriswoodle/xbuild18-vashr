const request = require('request');
const fs = require('fs');
const debug = require('debug');
const log = debug('xbuild:output');
const logV = debug('xbuild-v:output');
const player = require('node-wav-player');
const ibm = require('./ibm');
const play = (message) => {
    ibm.textToSpeech(message, () => {
        player.play({
            path: './recordings/generated.wav',
        }).then(() => {
            log('The wav file started to be played successfully.');
        }).catch((error) => {
            log(error);
        });
    });
};

module.exports = {
    play: play
}