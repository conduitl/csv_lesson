// Case 1 | Section 2
const fs = require('fs');

var data = fs.readFileSync('data/Texas_GregAbbott.csv', 'utf8');
fs.writeFileSync('output/copyOfTexasLeads.csv', data);
console.log('File written to: ' + 'output/copyOfTexasLeads.csv');