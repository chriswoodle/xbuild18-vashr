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
    if(data.includes('01 02 03 04')) {
        client.requestScan();
    }
    if(data.includes('7331')) {
        client.requestScan();
    }
});
