const fs = require("fs");
const request = require("request");

const config = require('../config.json');

const upload = (file, x, y, type) => {
    const formData = {
        image: fs.createReadStream(file),
        x: x,
        y: y,
        type: type
    };
    request.post({ url: `${config.host}/upload`, formData: formData }, (err, httpResponse, body) => {
        if (err) {
            return console.error('upload failed:', err);
        }
        console.log('Upload successful!  Server responded with:', body);
    });
};

const sendComplete = (type) => {
    const formData = {
        type: type
    };
    request.post({ url: `${config.host}/complete`, formData: formData }, (err, httpResponse, body) => {
        if (err) {
            return console.error('complete failed:', err);
        }
        console.log('Marked complete!  Server responded with:', body);
    });
};

module.exports = {
    upload: upload,
    sendComplete: sendComplete
}