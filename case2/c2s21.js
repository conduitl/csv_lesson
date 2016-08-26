// Case 2 | Section 21
// Objective- 
//   * Implement serial flow control
//   * move into modules-
//   *>> Processing
//   * make functions-
//   ** Create Consolidated (for writing the file)
//   * write JSON file
//   * use strict
//   * Put the input filename in the last column of the consolidated csv
const fs = require('fs'),
      
      dirPath = 'data/',
      targetHeaders = ['first name', 'last name', 'state', 'type', 'birthday', 'phone', 'email'],
      target_header_string = targetHeaders.join(),
      filenames = fs.readdirSync('data');

// S20 NEW
const Log = require('./util/log');
// S21 NEW
const validate = require('./util/validate');
const programLog = new Log({
	path: 'output/',   // folder(s) must exist; does not create folder(s)
	filename: 'program_log'
});
// S20 NEW
// create alias
function log (msg, formatting, to_console){
	return programLog.append(msg, formatting, to_console);
}

var consolidate = (function() { //s17 - new
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

// S20 NEW
console.log(programLog);
programLog.create(['summary', 'main', 'validation']);

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

  validate(processed.headers, target_header_string, context);

  processed.data = processed.data.join('\r\n'); //s16 note use of processed obj
  consolidate( processed.data ); //s17 note use of consolidate
}



//********* CSV Processing Functions ********
function processCsv(data){
  var header_row;
  data = data.split('\r\n');
  header_row = data.shift();
  
  return { headers: header_row, data: data };
}

