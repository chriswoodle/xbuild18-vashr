const debug = require('debug');
const log = debug('xbuild:aws');
const logV = debug('xbuild-v:aws');
const spawn = require('child_process').spawn;

const uploadToS3 = (file, callback) => {
    const python = spawn('python', ['upload.py', file], { cwd: './' });
    python.stdout.on('data', (data) => {
        log(`stdout: ${data}`);
    });

    python.stderr.on('data', (data) => {
        log(`stderr: ${data}`);
    });

    python.on('close', (code) => {
        log(`File upload complete.`);
        logV(`child process exited with code ${code}`);
        callback(true);
    });
};

module.exports = {
    uploadToS3: uploadToS3
}