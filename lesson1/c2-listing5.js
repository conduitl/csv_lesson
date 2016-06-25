// Objectives
// - Determine if headers from each input file matches our
//   target headers in the consolidated report
// - For each header that doesn't match, warn the console

const fs = require('fs');

const data_path = 'data/case2/';
const target_headers = 'first name,last name,state,type,birthday,phone,email';

var filenames = fs.readdirSync(data_path);
var consolidatedData = '';
var reportingLog = '';

console.log('-----Files about to be read-----');
console.log(filenames);
console.log('\n');
reportingLog+='Files read' + '\r\n';
reportingLog+= filenames.join('\r\n');
reportingLog+= '\r\n';

console.log('-----Target file headers-----');
console.log(target_headers);
console.log('\n');
reportingLog+= 'Target file headers' + '\r\n';
reportingLog+= '\r\n';

console.log('-----File headers found-----');
reportingLog+= 'File headers found' + '\r\n';

filenames.forEach( (file, index) => {
	
  var file_data = fs.readFileSync(data_path + file, 'utf8');
  var file_headers = '';
  var status = '';

  file_data = file_data.split('\r\n');

  file_headers = file_data.shift(); // peal off the header row so we can examine its contents
  if (file_headers === target_headers) {
    status = 'MATCH';
  } else {
    status = 'DEVIATION';
  }
  console.log(status + ': ' + file_headers + '---from ' + file);
	reportingLog+= status + ': ' + file_headers + '---from ' + file + '\r\n';

  if (index === 0) {
    consolidatedData+= file_headers;
  }
  file_data = file_data.join('\r\n');	
	
  consolidatedData+= file_data;
});

//fs.writeFileSync('c2-l2-consolidated.csv', consolidatedData);
fs.writeFileSync('log.txt', reportingLog);