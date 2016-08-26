// Case 2 | Section 24
// Objective- 
//   * Implement serial flow control
//   * move into modules-
//   *>> Processing - done
//   * make functions-
//   ** Create Consolidated
//	 ** Pull Log
//   ** Create Logs
//   * write JSON file
//   * use strict
//   * Put the input filename in the last column of the consolidated csv
const fs = require('fs'),
      
      dirPath = 'data/',
      targetHeaders = ['first name', 'last name', 'state', 'type', 'birthday', 'phone', 'email'],
      filenames = fs.readdirSync('data');

const validate    = require('./util/validate'),
			consolidate = require('./util/process' ),
			Log         = require('./util/log'     ),
			programLog = new Log({
				path: 'output/',   // folder(s) must exist; does not create folder(s)
				filename: 'program_log'
			});

var tasks = [
	processDirectory,
	processFileData
];

//create alias
function log (msg, formatting, to_console){
	return programLog.append(msg, formatting, to_console);
}

processDirectory(filenames, dirPath);
createFiles();

function createFiles(){
	fs.writeFileSync('output/consolidated.csv', consolidate() );
	console.log('File written to: ' + 'output/consolidated.csv');

	// consolidate validation log into program log
	var validationLog;
	validationLog = validate.log.report(['main', 'validation']);
	log(validationLog.main, 'main');
	log(validationLog.validation, 'validation');

	// create log files
	programLog.create(['summary', 'main', 'validation']);
	validate.log.create(['main', 'validation']);
}



//********* Flow Control ********************
function next(err, result) {
	if (err) throw err;
	var currentTask = tasks.shift();
	if (currentTask) {
		currentTask(result);
	}
}

// *********Task Functions**********
// processDirectory()
// Reads directory
// Logs directory contents
// Calls next step in workflow
function processDirectory(dir_files, dir_path){
  var data;
  
  dir_files.forEach( (file, index, array) => {
    if (index === 0) {
      log( 'Files in array: ' + array.length, 'summary' );
      consolidate(targetHeaders + '\r\n');
      log('---File headers---');
    }
    data = fs.readFileSync(dir_path + file, 'utf8');
    
    log(file, 'summary', false);
  
    processFileData(data, { name: file, index: index });
  });
}

function processFileData(data, context){
  var processed;
  
  processed = processCsv(data);

  validate(processed.headers, targetHeaders.join(), context);

  processed.data = processed.data.join('\r\n');
  consolidate( processed.data );
}



//********* CSV Processing Functions ********
function processCsv(data){
  var header_row;
  data = data.split('\r\n');
  header_row = data.shift();
  
  return { headers: header_row, data: data };
}



