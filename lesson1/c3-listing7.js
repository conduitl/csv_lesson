// Objectives
// - Determine if headers from each input file matches our
//   target headers in the consolidated report
// - For each header that doesn't match, warn the console

const fs = require('fs');

const data_path = 'data/case3/';
const validate = require('./util/c3l7-validate');

const Log = require('./util/c3l7-log');
const programLog = new Log({
	path: 'logs/',   // folder(s) must exist; does not create folder(s)
	filename: 'program_log'
});

// configuration for testing
var displayLogs = false;

// create alias
function log (msg, formatting, to_console){
	return programLog.append(msg, formatting, to_console);
}

const target_headers = 'first name,last name,state,type,birthday,phone,email';

var filenames = fs.readdirSync(data_path);
var consolidatedData = '';

log('Files about to be read', ['-', 5], displayLogs);
log( filenames.join('\r\n'), null, displayLogs );

log('Target file headers', ['*', 5], displayLogs);
log( target_headers, null, displayLogs);

log('File headers found', ['*', 5], displayLogs);
log('File headers found' + '\r\n', null, displayLogs);

filenames.forEach( (file, index) => {
	
  var file_data = fs.readFileSync(data_path + file, 'utf8');
  var file_headers = '';
  var status = '';

  file_data = file_data.split('\r\n');

  file_headers = file_data.shift(); // peal off the header row so we can examine its contents
  status = validate(file_headers, target_headers);
  log(status + ': ' + file_headers + '---from ' + file, null, displayLogs);

  if (index === 0) {
    consolidatedData+= target_headers; //changed to use target headers -- what if first file read has the wrong headers?
  }
  file_data = file_data.join('\r\n');	
	
  consolidatedData+= file_data;
});

var plogLoc = programLog.create();
var vlogLoc = validate.log.create();
console.log('Program log file saved to:');
console.log(plogLoc);
console.log('validation.js log file save to:');
console.log(vlogLoc);
//fs.writeFileSync('c2-l2-consolidated.csv', consolidatedData);