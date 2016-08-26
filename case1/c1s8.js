// Case 1 | Section 8
const fs = require('fs');

var filenames = fs.readdirSync('data');

var consolidatedData = '';

filenames.forEach( (file, index, array) => {
  if (index === 0) {
    console.log( 'Files in array: ' + array.length );
    console.log( array );
  }
  console.log( '-Processing index [' + index + '] containing ' + file );

  consolidatedData+= fs.readFileSync('data/' + file, 'utf8');
});

fs.writeFileSync('output/consolidated.csv', consolidatedData);

console.log('File written to: ' + 'output/consolidated.csv');