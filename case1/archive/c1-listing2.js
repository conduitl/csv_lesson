const fs = require('fs');

const data_path = 'data/case1/';
const fileExt = '.csv';

const tx = 'Texas';
const texasRep = 'Greg' + 'Abbott';
const texasLeads = tx + '_' + texasRep + fileExt;


fs.readFile(data_path + texasLeads, 'utf8', (err, data) => {
  if (err) throw err;
  console.log(data);
  
  fs.writeFile('consolidated.csv', data, (err) => {
    if (err) throw err;
  });
});
            
