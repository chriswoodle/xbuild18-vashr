const request = require('request');
const fs = require('fs');
const debug = require('debug');
const log = debug('xbuild:client');
const logV = debug('xbuild-v:client');
const config = require('../config.json');

const downloadRecording = (url, id, callback) => {
    if (!fs.existsSync('./recordings')) {
        fs.mkdirSync('./recordings');
    }
    download(url, `./recordings/recording-${id}.wav`, callback)
}

const download = (uri, filename, callback) => {
    request.head(uri, function (err, res, body) {
        logV('content-type:', res.headers['content-type']);
        logV('content-length:', res.headers['content-length']);
        var r = request(uri).pipe(fs.createWriteStream(filename));
        r.on('close', () => {
            callback(filename);
        });
        r.on('error', error => {
            console.log(error);
        });
    });
};

const droneSetType = (type) => {
    log('Sending type...')
    const options = {
        method: 'post',
        body: {
            type: type
        },
        json: true,
        url: `${config.drone_host}/type`
    }
    request(options, function (err, res, body) {
        if (err) {
            log('error posting json: ', err)
        }
        // log('statusCode: ', res.statusCode)
    })
};

module.exports = {
    downloadRecording: downloadRecording,
    droneSetType: droneSetType
};