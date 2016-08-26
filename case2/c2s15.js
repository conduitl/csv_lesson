// Case 2 | Section 15
// Objective- 
//   * Clean the code.. var declarations
//   * Move util functions to the bottom
//   * use strict
//   * Put the input filename in the last column of the consolidated csv
const fs = require('fs'),

      targetHeaders = ['first name', 'last name', 'state', 'type', 'birthday', 'phone', 'email'],
      filenames = fs.readdirSync('data');

var consolidatedData = '';

filenames.forEach( (file, index, array) => {
  var data,
      is_match = false,
      status = '!!',
      headerRow,
      headerArray,
      target_header_string;
  
  data = fs.readFileSync('data/' + file, 'utf8');
	
  if (index === 0) {
    log( 'Files in array: ' + array.length, 'summary' );
    consolidatedData+= targetHeaders + '\r\n';
    log('---File headers---');
  }
  
  log(file, 'summary', false);
  // csv row and cell splitting to be separated into a function
  data = data.split('\r\n');
  
  headerRow = data.shift();
  target_header_string = targetHeaders.join();
  
  is_match = compareHeaders(headerRow, target_header_string, file);
  status = is_match ? 'ok' : '!!';
  
  data = data.join('\r\n');
  log( status + ' - ' + file.substr(0, 8) + ' in [' + index + ']: ' + headerRow );
  consolidatedData+= data;
});

fs.writeFileSync('output/consolidated.csv', consolidatedData);
fs.writeFileSync('output/program_log.txt', log.summary + log.body + log.validation);
console.log('File written to: ' + 'output/consolidated.csv');


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