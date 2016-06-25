// Objectives
// - Determine if headers from each input file matches our
//   target headers in the consolidated report
// - For each header that doesn't match, warn the console

const fs = require('fs');

const data_path = 'data/case2/';
const target_headers = 'first name,last name,state,type,birthday,phone,email';

var filenames = fs.readdirSync(data_path);
var consolidatedData = '';
var logContent = '';

function log(msg){
	console.log(msg);
	logContent+= msg + '\r\n';
}

log('-----Files about to be read-----');
log( filenames.join('\r\n') );

log('-----Target file headers-----');
log(target_headers);

log('-----File headers found-----');
log('File headers found' + '\r\n');

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
  log(status + ': ' + file_headers + '---from ' + file);

  if (index === 0) {
    consolidatedData+= file_headers;
  }
  file_data = file_data.join('\r\n');	
	
  consolidatedData+= file_data;
});

//fs.writeFileSync('c2-l2-consolidated.csv', consolidatedData);
fs.writeFileSync('log.txt', logContent);