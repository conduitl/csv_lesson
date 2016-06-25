// Objectives
// - Determine if headers from each input file matches our
//   target headers in the consolidated report
// - For each header that doesn't match, warn the console

const fs = require('fs');

const data_path = 'data/case3/';
const validate = require('./util/c3l6-validate');

const Log = require('./util/c3l6-log');
const programLog = new Log({
	path: 'logs/',   // folder(s) must exist; does not create folder(s)
	filename: 'program_log'
});

// create alias
function log (msg, formatting, to_console){
	return programLog.append(msg, formatting, to_console);
}

const target_headers = 'first name,last name,state,type,birthday,phone,email';

var filenames = fs.readdirSync(data_path);
var consolidatedData = '';

log('Files about to be read', ['-', 5]);
log( filenames.join('\r\n') );

log('Target file headers', ['*', 5]);
log(target_headers);

log('File headers found', ['*', 5]);
var test = log('File headers found' + '\r\n');

filenames.forEach( (file, index) => {
	
  var file_data = fs.readFileSync(data_path + file, 'utf8');
  var file_headers = '';
  var status = '';

  file_data = file_data.split('\r\n');

  file_headers = file_data.shift(); // peal off the header row so we can examine its contents
  status = validate(file_headers, target_headers);
  log(status + ': ' + file_headers + '---from ' + file);

  if (index === 0) {
    consolidatedData+= target_headers; //changed to use target headers -- what if first file read has the wrong headers?
  }
  file_data = file_data.join('\r\n');	
	
  consolidatedData+= file_data;
});

var logLocation = programLog.create();
console.log('Log file saved to:')
console.log(logLocation);
//fs.writeFileSync('c2-l2-consolidated.csv', consolidatedData);