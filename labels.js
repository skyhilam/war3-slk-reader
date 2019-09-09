const fs = require('fs');

let rawdata = fs.readFileSync('labels.json');
module.exports = JSON.parse(rawdata);


