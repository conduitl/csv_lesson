// Case 2 | Section 5
// Objective- Write a log file
const fs = require('fs');

const targetHeaders = 'first name,last name,state,type,birthday,phone,email';

var filenames = fs.readdirSync('data');

var consolidatedData = '';
var report = '';

filenames.forEach( (file, index, array) => {
  var data = fs.readFileSync('data/' + file, 'utf8');
  var file_headers = '';
  var status = '!!';
	
  if (index === 0) {
    console.log( 'Files in array: ' + array.length );
    report+= 'Files in array: ' + array.length + '\r\n';
    console.log( array );
    report+= array + '\r\n';
    
    consolidatedData+= targetHeaders + '\r\n';
    
    console.log('---File headers---');
    report+= '---File headers---' + '\r\n';
  }
	
  data = data.split('\r\n');
  file_headers = data.shift();
  
  if ( file_headers === targetHeaders ) {
    status = 'ok';
  }
  
  data = data.join('\r\n');
	
  console.log( status + ' - ' + file.substr(0, 8) + ' in [' + index + ']: ' + file_headers );
  report+= status + ' - ' + file.substr(0, 8) + ' in [' + index + ']: ' + file_headers + '\r\n';

  consolidatedData+= data;
});

fs.writeFileSync('output/consolidated.csv', consolidatedData);

console.log('File written to: ' + 'output/consolidated.csv');

fs.writeFileSync('output/program_log.txt', report);