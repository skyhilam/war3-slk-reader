const { spawn } = require('child_process');


module.exports = (source, output) => {
    return new Promise((resolve, reject) => {
        const ls = spawn('python', ['t.py', source, output]);

        ls.stderr.on('data', (data) => {
            reject({data})
        });

        ls.on('close', (code) => {
            resolve({code})
        });
    })


}
