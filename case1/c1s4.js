// Case 1 | Section 4
const fs = require('fs');

var filenames = fs.readdirSync('data');
console.log(filenames);

//var tx = fs.readFileSync('data/Texas_GregAbbott.csv', 'utf8');
//var nm = fs.readFileSync('data/NewMexico_SusanaMartinez.csv', 'utf8');
//
//var consolidatedData = tx + nm;
//fs.writeFileSync('output/consolidated.csv', consolidatedData);
//console.log('File written to: ' + 'output/consolidated.csv');