const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const debug = require('debug');
const log = debug('xbuild:server');
const logV = debug('xbuild-v:server');
const drone = require('./drone');
const client = require('./client');
const serial = require('./serial');
const PORT = 7002;

app.use(bodyParser.json());

app.get('/status', (req, res) => res.send('Up!'))

let type = '';
app.post('/type', function (req, res) {
    log('Type...');
    type = req.body.type;
    res.send('Ok');
    log('200 /type');
});

app.post('/scan', function (req, res) {
    log('Scan...');
    log(type);
    res.send('Ok');
    log('200 /scan');
    // Start drone scanning
    if (type == 'shark' || type == 'boat') {
        drone.flybaseFP(() => {
            client.upload('/home/pi/00.jpg', 0, 0, type);
            client.upload('/home/pi/01.jpg', 0, 1, type);
            client.upload('/home/pi/10.jpg', 1, 0, type);
            client.upload('/home/pi/11.jpg', 1, 1, type);
        });
    }
});

app.post('/realDrone', function (req, res) {
    log('starting real drone scan...');
    res.send('Ok');
    log('200 /scan');
    // Start drone scanning
    drone.scan();
});

app.post('/goTo', function (req, res) {
    log('Starting drone...');
    serial.deploySkyCrane();
    res.send('Ok');
    log('200 /goTo');
});

app.post('/reset', function (req, res) {
    log('Resetting sky crane...');
    serial.resetSkyCrane();
    res.send('Ok');
    log('200 /reset');
});


app.listen(PORT, () => console.log(`Drone running up. Listening on port ${PORT}!`));

module.exports = {};