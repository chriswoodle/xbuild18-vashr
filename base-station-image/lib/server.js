const express = require('express');
const app = express();
const fileUpload = require('express-fileupload');
const debug = require('debug');
const log = debug('xbuild:server');
const logV = debug('xbuild-v:server');
const aws = require('./aws');
const drone = require('./drone-client');
const client = require('./client');
const PORT = 7001;

app.use(fileUpload());

app.get('/status', (req, res) => res.send('Up!'))

app.post('/upload', function (req, res) {
    // Receive image from drone
    log(`Uploading from ${res.connection.remoteAddress}...`);
    if (!req.files) {
        log('400 No files were uploaded');
        return res.status(400).send('No files were uploaded.');
    }
    const x = req.body['x'];
    const y = req.body['y'];
    const type = req.body['type'];

    const image = req.files['image'];
    logV(image);
    const filename = `./images/${image.md5}.jpg`;
    // Use the mv() method to place the file somewhere on your server
    image.mv(filename, function (err) {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
        res.send('File uploaded!');
        log('200 /upload');
        log('uploading to s3...')
        aws.uploadToS3(filename, () => {
            client.recognition(type, (found) => {
                log(found);
                if(found) {
                    drone.requestTarget('10.9.4.118', type);
                }
            });
        });
    });
});

app.post('/complete', function (req, res) {
    // Receive image from drone
    log(`Marking complete from ${request.connection.remoteAddress}...`);

});

app.listen(PORT, () => console.log(`Base station up. Listening on port ${PORT}!`));

module.exports = {};