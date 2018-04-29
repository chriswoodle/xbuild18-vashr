const SerialPort = require('serialport');
const debug = require('debug');
const log = debug('xbuild:serial');
const logV = debug('xbuild-v:serial');
const client = require('./client');

const config = require('../config.json');
config.baudRate = parseInt(config.baudRate);
log(config);
const port = new SerialPort(config.serialport, { baudRate: config.baudRate });

port.on('open', function () {
    log('Port opened');
});

port.on('data', function (data) {
    log('Data:', data);
    log('----:', data.toString());
});

const deploySkyCrane = () => {
    port.write('D', function (err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        log('sky crane deploying');
    });
};

const resetSkyCrane = () => {
    port.write('R', function (err) {
        if (err) {
            return console.log('Error on write: ', err.message);
        }
        log('sky crane resetting');
    });
};

module.exports = {
    deploySkyCrane: deploySkyCrane,
    resetSkyCrane: resetSkyCrane
}