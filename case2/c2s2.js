// Case 2 | Section 2
// Objective- Define target headers rather than using headers
// from first file processed
const fs = require('fs');

const targetHeaders = 'first name,last name,state,type,birthday,phone,email';

var filenames = fs.readdirSync('data');

var consolidatedData = '';

filenames.forEach( (file, index, array) => {
	var data = fs.readFileSync('data/' + file, 'utf8');
	
  if (index === 0) {
    console.log( 'Files in array: ' + array.length );
    console.log( array );
		consolidatedData+= targetHeaders;
  }
	
	data = data.split('\r\n');
	data.shift();
	data = data.join('\r\n');
	
  console.log( '-Processed index [' + index + '] containing ' + file );

  consolidatedData+= data;
});

fs.writeFileSync('output/consolidated.csv', consolidatedData);

console.log('File written to: ' + 'output/consolidated.csv');