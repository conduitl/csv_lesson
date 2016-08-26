// Case 2 | Section 17
// Objective- 
//   * make and test util function...
//   *!* consolidateData - use a closure
//   * make functions-
//   ** Read Directory
//   ** Read Files
//   ** Process File
//   ** Create Consolidated
//   * use strict
//   * Put the input filename in the last column of the consolidated csv
const fs = require('fs'),
      
      dirPath = 'data/',
      targetHeaders = ['first name', 'last name', 'state', 'type', 'birthday', 'phone', 'email'],
      filenames = fs.readdirSync('data');


// *********Task Functions**********
//function processDirectory(dir_files, dir_path){
//  dir_files.forEach( (file, index, array) => {
//    data = fs.readFileSync(dir_path + file, 'utf8');
//  });
//}

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
    

filenames.forEach( (file, index, array) => {
  var data,
      is_match = false,
      status = '!!',
      processed, //s16 addition
      target_header_string;
  
  data = fs.readFileSync('data/' + file, 'utf8');
	
  if (index === 0) {
    log( 'Files in array: ' + array.length, 'summary' );
    consolidate(targetHeaders + '\r\n');
    log('---File headers---');
  }
  
  log(file, 'summary', false);
  
  processed = processCsv(data);
  
  target_header_string = targetHeaders.join();
  
  is_match = compareHeaders(processed.headers, target_header_string, file); //s16 note use of processed obj
  status = is_match ? 'ok' : '!!';
  
  processed.data = processed.data.join('\r\n'); //s16 note use of processed obj
  log( status + ' - ' + file.substr(0, 8) + ' in [' + index + ']: ' + processed.headers ); //s16 note use of processed obj
  consolidate( processed.data ); //s17 note use of consolidate
});

fs.writeFileSync('output/consolidated.csv', consolidate() );
fs.writeFileSync('output/program_log.txt', log.summary + log.body + log.validation);
console.log('File written to: ' + 'output/consolidated.csv');

//********* CSV Processing Functions ********
function processCsv(data){
  var header_row;
  data = data.split('\r\n');
  header_row = data.shift();
  
  return { headers: header_row, data: data };
}

//********* Utility Functions ***************
function compareHeaders(input_string, target_string, context) {
  // move into compare function, compare function can take advantage of recursion
  // make array of separators to break down csv format
  // e.g. ['\r\n', ',']
  if ( input_string === target_string ) {
    return true;
  }
  compare(input_string.split(','), target_string.split(','), context);
  return false;
}

function compare(input_arr, target_arr, context){
  target_arr.forEach( (target, index) => {
    var result = 'NOT a match';
      if (index === 0) {
        log('', 'validation', false);
        log('*********************************************', 'validation', false);
        log('Input file ' + context + ' remediation report', 'validation', false);
        log('---------------------------------------------', 'validation', false);
        log( displayArrayForLog(targetHeaders, 'Target Headers'), 'validation', false);
        log( displayArrayForLog(input_arr, 'Input Headers'), 'validation', false);
        log('---------------------------------------------', 'validation', false);
      }
    if (input_arr[index] === target) {
      result = 'a match';
    } else {
        log( 'index [' 
          + String.fromCharCode(index + 65) + '] "' 
          + input_arr[index] + '" is ' 
          + result + ' of target: ' + target, 
          'validation', false );
      }
  
  });
}

// s10 - adding log function b/c code is becoming complex from console.log & reporting additions
function log(msg, context, to_console) {
  if (log.body === undefined) {
    log.body = '';
  }
  if (to_console !== false) { // s11 // s12 what is logged to the console is still a mess. applying this param to clean it up
    console.log(msg);
  }
  
  //s11 - start using the context to build reporting
  if (context === undefined) {
    log.body+= msg + '\r\n';
  } else {
    if (log[context] === undefined) {
      log[context] = '';
    }
    log[context]+= msg + '\r\n';
  }
  
  return msg;
}

function displayArrayForLog(array, title){
  var string = title + ': ' || '';
  array.forEach( (element, index) => {
    string+= '['
      + String.fromCharCode(index + 65)
      + '] ' + element + ' | ';
  });
  return string;
}