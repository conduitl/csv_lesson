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


fs.readFile(data_path + texasLeads, 'utf8', (err, txData) => {
  if (err) throw err;
  
  fs.readFile(data_path + newMexicoLeads, 'utf8', (err, nmData) => {
    if (err) throw err;
    
    var consolidated_data = txData + nmData;
  
    fs.writeFile('c1-l3-consolidated.csv', consolidated_data, (err) => {
      if (err) throw err;
    });
  });
});
            
