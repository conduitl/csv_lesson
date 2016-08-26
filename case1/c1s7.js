// Case 1 | Section 7
const fs = require('fs');

var filenames = fs.readdirSync('data');

var consolidatedData = '';

console.log(filenames);

filenames.forEach( file => {
  consolidatedData+= fs.readFileSync('data/' + file, 'utf8');
});

fs.writeFileSync('output/consolidated.csv', consolidatedData);

console.log('File written to: ' + 'output/consolidated.csv');