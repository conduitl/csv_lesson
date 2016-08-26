// Case 2 | Section 22
// Objective- 
//   * move into modules-
//   *>> Validate
//   *>> Processing
//   * make functions-
//   ** Create Consolidated
//   * write JSON file
//   * use strict
//   * Put the input filename in the last column of the consolidated csv
const fs = require('fs'),
      
      dirPath = 'data/',
      targetHeaders = ['first name', 'last name', 'state', 'type', 'birthday', 'phone', 'email'],
      filenames = fs.readdirSync('data');

const validate = require('./util/validate'),
			Log      = require('./util/log'     ),
			programLog = new Log({
				path: 'output/',   // folder(s) must exist; does not create folder(s)
				filename: 'program_log'
			});

//create alias
function log (msg, formatting, to_console){
	return programLog.append(msg, formatting, to_console);
}

var consolidate = (function() {
  var data = '';
  return function (append_val) {
    if (append_val === undefined) {
      return data;
    }
    data+= append_val;
    return data;
  }
}());

processDirectory(filenames, dirPath);

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

// *********Task Functions**********
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

