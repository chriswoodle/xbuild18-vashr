const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const debug = require('debug');
const log = debug('xbuild:server');
const logV = debug('xbuild-v:server');
const client = require('./client');
const output = require('./output');
const ibm = require('./ibm');
const handler = require('./handler');
const PORT = 7000;

app.get('/status', (req, res) => res.send('Up!'))

/*
Sample request
GET http://localhost:7000/data?AccountSid=ACcdd8451104f384f1901a6888c1b0e074&ApiVersion=2010-04-01&CallSid=CAe5333b17fb19fbcff5daadcdad159121&CallStatus=in-progress&Called=%2B19729941579&CalledCity=DALLAS&CalledCountry=US&CalledState=TX&CalledZip=75240&Caller=%2B13218775974&CallerCity=&CallerCountry=US&CallerState=FL&CallerZip=&Digits=%2A&Direction=inbound&From=%2B13218775974&FromCity=&FromCountry=US&FromState=FL&FromZip=&RecordingDuration=4&RecordingSid=RE61f2819a711154d8638aeaec9c82e3fd&RecordingUrl=https%3A%2F%2Fapi.twilio.com%2F2010-04-01%2FAccounts%2FACcdd8451104f384f1901a6888c1b0e074%2FRecordings%2FRE61f2819a711154d8638aeaec9c82e3fd&To=%2B19729941579&ToCity=DALLAS&ToCountry=US&ToState=TX&ToZip=75240

http://localhost:7000/data
?AccountSid=ACcdd8451104f384f1901a6888c1b0e074
&ApiVersion=2010-04-01
&CallSid=CAe5333b17fb19fbcff5daadcdad159121
&CallStatus=in-progress
&Called=%2B19729941579
&CalledCity=DALLAS
&CalledCountry=US
&CalledState=TX
&CalledZip=75240
&Caller=%2B13218775974
&CallerCity=
&CallerCountry=US
&CallerState=FL
&CallerZip=
&Digits=%2A
&Direction=inbound
&From=%2B13218775974
&FromCity=
&FromCountry=US
&FromState=FL
&FromZip=
&RecordingDuration=4
&RecordingSid=RE61f2819a711154d8638aeaec9c82e3fd
&RecordingUrl=https%3A%2F%2Fapi.twilio.com%2F2010-04-01%2FAccounts%2FACcdd8451104f384f1901a6888c1b0e074%2FRecordings%2FRE61f2819a711154d8638aeaec9c82e3fd
&To=%2B19729941579
&ToCity=DALLAS&ToCountry=US
&ToState=TX
&ToZip=75240
*/
app.get('/data', (req, res) => {
    log('Recieved request');
    logV(req.query)

    res.setHeader('Content-Type', 'text/plain');
    res.send('Thank you. ');
    log('200 /data');

    client.downloadRecording(req.query['RecordingUrl'], req.query['RecordingSid'], (filename) => {
        ibm.speechToText(filename, (text) => {
            log(`Interpreted speech: ${text}`);
            handler.handleSpeech(text);
        });
    });
});

app.use(bodyParser.json());

app.post('/tts', (req, res) => {
    log(`TTS Recieved request: ${req.body.text}`);
    output.play(req.body.text);
    res.send('Ok');
    log('200 /tts');
});

app.listen(PORT, () => console.log(`Base station up. Listening on port ${PORT}!`));

module.exports = {};