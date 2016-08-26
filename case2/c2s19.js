// Case 2 | Section 19
// Objective- 
//   * make functions-
//   ** Process File
//   ** Create Consolidated
//   * use strict
//   * Put the input filename in the last column of the consolidated csv
const fs = require('fs'),
      
      dirPath = 'data/',
      targetHeaders = ['first name', 'last name', 'state', 'type', 'birthday', 'phone', 'email'],
      target_header_string = targetHeaders.join(),
      filenames = fs.readdirSync('data');

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
fs.writeFileSync('output/program_log.txt', log.summary + log.body + log.validation);
console.log('File written to: ' + 'output/consolidated.csv');

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

  makeValidationLog(processed.headers, target_header_string, context);

  processed.data = processed.data.join('\r\n'); //s16 note use of processed obj
  consolidate( processed.data ); //s17 note use of consolidate
}

function makeValidationLog(input, target, context){
  var is_match = false, status = '!!';
  
  is_match = compareHeaders(input, target, context); //s16 note use of processed obj
  status = is_match ? 'ok' : '!!';
  log( status + ' - ' + context.name.substr(0, 8) + ' in [' + context.index + ']: ' + input ); //s16 note use of processed obj
}

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
        log('Input file ' + context.name + ' remediation report', 'validation', false);
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