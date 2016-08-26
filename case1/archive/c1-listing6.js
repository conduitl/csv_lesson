const fs = require('fs');

const data_path = 'data/case1/';

var filenames = fs.readdirSync(data_path);

console.log(filenames);

var consolidatedData = '';
consolidatedData+= fs.readFileSync(data_path + filenames[0], 'utf8');
consolidatedData+= fs.readFileSync(data_path + filenames[1], 'utf8');

fs.writeFileSync('c1-l6-consolidated.csv', consolidatedData);