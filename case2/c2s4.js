// Case 2 | Section 4
// Objective- Log the file headers for examination
//          * part 2 - spruce up log
const fs = require('fs');

const targetHeaders = 'first name,last name,state,type,birthday,phone,email';

var filenames = fs.readdirSync('data');

var consolidatedData = '';

filenames.forEach( (file, index, array) => {
  var data = fs.readFileSync('data/' + file, 'utf8');
  var file_headers = '';
	
  if (index === 0) {
    console.log( 'Files in array: ' + array.length );
    console.log( array );
    
    consolidatedData+= targetHeaders + '\r\n';
    
    console.log('---File headers---');
  }
	
  data = data.split('\r\n');
  file_headers = data.shift();
  data = data.join('\r\n');
	
  //  console.log( '-Processed index [' + index + '] containing ' + file );
  console.log( file.substr(0, 8) + ' in [' + index + ']: ' + file_headers );

  consolidatedData+= data;
});

fs.writeFileSync('output/consolidated.csv', consolidatedData);

console.log('File written to: ' + 'output/consolidated.csv');