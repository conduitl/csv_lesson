// Case 1 | Section 6
const fs = require('fs');

var filenames = fs.readdirSync('data');

var consolidatedData;

console.log(filenames);
console.log( 'Number of files in directory: ' + filenames.length );
console.log( '  -Index [0] contains ' + filenames[0] );
console.log( '  -Index [1] contains ' + filenames[1] );
console.log( '  -Index [2] contains ' + filenames[2] ); 

consolidatedData+= fs.readFileSync('data/' + filenames[0], 'utf8');
consolidatedData+= fs.readFileSync('data/' + filenames[1], 'utf8');
consolidatedData+= fs.readFileSync('data/' + filenames[2], 'utf8');

fs.writeFileSync('output/consolidated.csv', consolidatedData);

console.log('File written to: ' + 'output/consolidated.csv');