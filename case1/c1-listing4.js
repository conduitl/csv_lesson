const fs = require('fs');

const data_path = 'data/case1/';
const fileExt = '.csv';

// Texas
const tx = 'Texas';
const texasRep = 'Greg' + 'Abbott';
const texasLeads = tx + '_' + texasRep + fileExt;

// New Mexico
const nm = 'New-Mexico';
const newMexicoRep = 'Susana' + 'Martinez';
const newMexicoLeads = nm + '_' + newMexicoRep + fileExt;

var consolidatedData = '';

consolidatedData+= fs.readFileSync(data_path + texasLeads, 'utf8');
consolidatedData+= fs.readFileSync(data_path + newMexicoLeads, 'utf8');

fs.writeFileSync('c1-l4-consolidated.csv', consolidatedData);