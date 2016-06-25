const fs = require('fs');

const data_path = 'data/case1/';

var filenames = fs.readdirSync(data_path);

console.log(filenames);

//var consolidatedData = '';
//consolidatedData+= fs.readFileSync(data_path + texasLeads, 'utf8');
//consolidatedData+= fs.readFileSync(data_path + newMexicoLeads, 'utf8');
//
//fs.writeFileSync('c1-l4-consolidated.csv', consolidatedData);