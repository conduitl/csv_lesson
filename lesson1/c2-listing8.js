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

function log(msg, formatting){
	if (formatting) {
		msg = format(msg, formatting[0], formatting[1] );
	}
	console.log(msg);
	logContent+= msg + '\r\n'; // it will be better to return this value rather than to mutate a global variable
}

function compareHeaders(actual, target){
	if (actual === target) {
		return 'MATCH';
	}
	return 'DEVIATION';
};

function format(msg, char, num) {
	var formatting = '', i;
	for (i = 0; i < num; i++) {
		formatting+= char;
	}
	return formatting + msg + formatting;
};

log('Files about to be read', ['-', 5]);
log( filenames.join('\r\n') );

log('Target file headers', ['*', 5]);
log(target_headers);

log('File headers found', ['*', 5]);
log('File headers found' + '\r\n');

filenames.forEach( (file, index) => {
	
  var file_data = fs.readFileSync(data_path + file, 'utf8');
  var file_headers = '';
  var status = '';

  file_data = file_data.split('\r\n');

  file_headers = file_data.shift(); // peal off the header row so we can examine its contents
  status = compareHeaders(file_headers, target_headers);
  log(status + ': ' + file_headers + '---from ' + file);

  if (index === 0) {
    consolidatedData+= target_headers; //changed to use target headers -- what if first file read has the wrong headers?
  }
  file_data = file_data.join('\r\n');	
	
  consolidatedData+= file_data;
});

//fs.writeFileSync('c2-l2-consolidated.csv', consolidatedData);
fs.writeFileSync('log.txt', logContent);