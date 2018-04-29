const debug = require('debug');
const log = debug('xbuild:handler');
const logV = debug('xbuild-v:handler');
const output = require('./output');
const client = require('./client');

const config = require('../config.json');

const handleSpeech = (text) => {
    if (config.keywords && new RegExp(config.keywords.join("|")).test(text)) {
        // If speech text contains at least one of the keywords
        log('key word found');
        if (text.includes('shark') || text.includes('sharp')) {
            output.play('Incoming shark alert');
            client.droneSetType('shark');
        }
        if (text.includes('medical')) {
            output.play('Medical emergency alert');
            client.droneSetType('medical');
        }
        if (text.includes('drowning')) {
            output.play('Drowning person alert');
            client.droneSetType('drowning');
        }
    }
};

module.exports = {
    handleSpeech: handleSpeech
}