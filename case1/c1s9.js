// Case 1 | Section 9
// Objective- Remove unnecessary header rows from every file added
//            after the first
const fs = require('fs');

var filenames = fs.readdirSync('data');

var consolidatedData = '';

filenames.forEach( (file, index, array) => {
	var data = fs.readFileSync('data/' + file, 'utf8');
	
  if (index === 0) {
    console.log( 'Files in array: ' + array.length );
    console.log( array );
  } else {
		data = data.split('\r\n');
		data.shift();
		data = data.join('\r\n');
	}
  console.log( '-Processed index [' + index + '] containing ' + file );

  consolidatedData+= data;
});

fs.writeFileSync('output/consolidated.csv', consolidatedData);

console.log('File written to: ' + 'output/consolidated.csv');