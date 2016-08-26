const fs = require('fs');

const data_path = 'data/case1/';

var filenames = fs.readdirSync(data_path);
var consolidatedData = '';

console.log(filenames);

filenames.forEach( (file) => {
  consolidatedData+= fs.readFileSync(data_path + file, 'utf8');
});

fs.writeFileSync('c1-l7-consolidated.csv', consolidatedData);