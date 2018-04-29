const request = require('request');
const debug = require('debug');
const log = debug('xbuild:client');
const logV = debug('xbuild-v:client');
const config = require('../config.json');

const requestScan = () => {
    log('Requesting scan...')
    const options = {
        method: 'post',
        body: {},
        json: true,
        url: `${config.drone_host}/scan`
    }
    request(options, function (err, res, body) {
        if (err) {
            log('error posting json: ', err)
        }
    })
};

module.exports = {
    requestScan: requestScan
}