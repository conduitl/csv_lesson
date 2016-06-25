// Objectives
// - Determine if headers from each input file matches our
//   target headers in the consolidated report
// - For each header that doesn't match, warn the console

const fs = require('fs');

const data_path = 'data/case3/';
const validate = require('./util/c3l10-validate');

const Log = require('./util/c3l10-log');
const programLog = new Log({
	path: 'logs/',   // folder(s) must exist; does not create folder(s)
	filename: 'program_log'
});

// configuration for testing
//programLog.verbose();
validate.log.verbose();

// create alias
function log (msg, formatting, to_console){
	return programLog.append(msg, formatting, to_console);
}

const target_headers = 'first name,last name,state,type,birthday,phone,email';

var filenames = fs.readdirSync(data_path);
var consolidatedData = '';

log('Files read', ['-', 5]); // get rid of the displayLogs argument
log( filenames.join('\r\n'));
log('\n');

log('Target file headers', ['*', 5]);
log( target_headers);
log('\n');

log('File headers found', ['*', 5]);
log('\n');

filenames.forEach( (file, index) => {
	
  var file_data = fs.readFileSync(data_path + file, 'utf8');
  var file_headers = '';
  var status = '';

  file_data = file_data.split('\r\n');

  file_headers = file_data.shift(); // peal off the header row so we can examine its contents
  status = validate(file_headers, target_headers, file); // added argument so logger in validate.js can tell us what is being compared in it's log
  log(status + ': ' + file_headers + '---from ' + file);

  if (index === 0) {
    consolidatedData+= target_headers; //changed to use target headers -- what if first file read has the wrong headers?
  }
  file_data = file_data.join('\r\n');	
	
  consolidatedData+= file_data;
});


//fs.writeFileSync('c2-l2-consolidated.csv', consolidatedData);

var report = validate.log.report('deviation');
log('\r\n Deviation Report');
log('', ['-', 10]);
log(report);

var plogLoc = programLog.create();
var vlogLoc = validate.log.create();
console.log('Program log file saved to:');
console.log(plogLoc);
console.log('validation.js log file save to:');
console.log(vlogLoc);
