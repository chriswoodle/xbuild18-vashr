const debug = require('debug');
const log = debug('xbuild:drone');
const logV = debug('xbuild-v:drone');
const spawn = require('child_process').spawn;

// sudo python DScan1.py
// this does the scan for the real drone
// 4 locations
// 3 locations
// takes 2 pictures
// 00.jpg
// 11.jpg
const scan = (callback) => {
    const python = spawn('python', ['/home/pi/DScan1.py'], { cwd: './' });
    python.stdout.on('data', (data) => {
        log(`stdout: ${data}`);
    });

    python.stderr.on('data', (data) => {
        log(`stderr: ${data}`);
    });

    python.on('close', (code) => {
        log(`Scan complete.`);
        logV(`child process exited with code ${code}`);
        callback(true);
    });
};

// sudo python MoveTo.py 11
// moves the real drone to location 11 and it stays there for 60 seconds, then returns to 00
// takes 4 seconds to move to location
const moveTo = (callback) => {
    const python = spawn('python', ['/home/pi/MoveTo.py', '11'], { cwd: './' });
    python.stdout.on('data', (data) => {
        log(`stdout: ${data}`);
    });

    python.stderr.on('data', (data) => {
        log(`stderr: ${data}`);
    });

    python.on('close', (code) => {
        log(`Move complete.`);
        logV(`child process exited with code ${code}`);
        callback(true);
    });
};

// sudo python FlybaseFP.py
// does scan for virtual drone
// 2 virtual drones
// takes pictures at 4 locations
// 00.jpg
// 01.jpg
// 11.jpg
// 10.jpg
const flybaseFP = (callback) => {
    const python = spawn('python', ['/home/pi/xbuild_demo/flytbase_py_wrapper/FlybaseFP.py'], { cwd: './' });
    python.stdout.on('data', (data) => {
        log(`stdout: ${data}`);
    });

    python.stderr.on('data', (data) => {
        log(`stderr: ${data}`);
    });

    python.on('close', (code) => {
        log(`Move complete.`);
        logV(`child process exited with code ${code}`);
        callback(true);
    });
};

module.exports = {
    scan: scan,
    moveTo: moveTo,
    flybaseFP: flybaseFP
}