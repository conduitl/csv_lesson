// Case 1 | Section 6
const fs = require('fs');
var filenames = fs.readdirSync('data');
// #1 Initialize variable as empty string
var consolidatedData = '';

console.log(filenames);
// #2 Remove console.logs for array retrieval demonstration
// #3 Use addition assignment operator and remove variable declarations
//    previously used to store each file
consolidatedData+= fs.readFileSync('data/' + filenames[0], 'utf8');
consolidatedData+= fs.readFileSync('data/' + filenames[1], 'utf8');
consolidatedData+= fs.readFileSync('data/' + filenames[2], 'utf8');
// #4 Remove line below as it is no longer necessary
// var consolidatedData = ca + nm + tx;
fs.writeFileSync('output/consolidated.csv', consolidatedData);

console.log('File written to: ' + 'output/consolidated.csv');