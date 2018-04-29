const fs = require("fs");
const request = require("request");

const requestScan = (host, type) => {
    const formData = {
    };
    request.post({ url: `http://${host}:7002/scan`, formData: formData }, (err, httpResponse, body) => {
        if (err) {
            return console.error('Error:', err);
        }
        console.log('Server responded with:', body);
    });
};

const requestTarget = (host, type) => {
    const formData = {
    };
    request.post({ url: `http://${host}:7002/goTo`, formData: formData }, (err, httpResponse, body) => {
        if (err) {
            return console.error('Error:', err);
        }
        console.log('Server responded with:', body);
    });
};

module.exports = {
    requestScan: requestScan,
    requestTarget: requestTarget
}