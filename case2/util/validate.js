"use strict";
const Log = require('./log');

var validationLog = new Log({
	path: 'logs/',   // folder(s) must exist; does not create folder(s)
	filename: 'validation_log'
});

//validationLog.verbose();

// create alias
function log (msg, formatting, to_console){
	return validationLog.append(msg, formatting, to_console);
}

// Workflow
// 1) validate
// 2) compareHeaderRow
// 3) compareColumns

// 7/7/16 Objectives
// - Logging capability to roll up info into program log as
//   well as create an independent log for the module
// - Implement in Case 2 / Merge functionality
// - Add back in normalize capability
// - Consider having actual and target parameters
//   merged into a single array parameter (or perhaps an object)
function validate(input, target, context){
  var is_match = false, status = '!!';
  
  is_match = compareHeaderRow(input, target, context);
  status = is_match ? 'ok' : '!!';
	log( status + ' - ' + context.name.substr(0, 8) + ' in [' + 			context.index + ']: ' + input );
}


function compareHeaderRow(input_string, target_string, context) {
  // move into compare function, compare function can take advantage of recursion
  // make array of separators to break down csv format
  // e.g. ['\r\n', ',']
  if ( input_string === target_string ) {
    return true;
  }
  compareColumns(input_string.split(','), target_string.split(','), context);
  return false;
}

function compareColumns(input_arr, target_arr, context){
  target_arr.forEach( (target, index) => {
    var result = 'NOT a match';
      if (index === 0) {
        log('', 'validation', false);
        log('*********************************************', 'validation', false);
        log('Input file ' + context.name + ' remediation report', 'validation', false);
        log('---------------------------------------------', 'validation', false);
        log( displayArrayForLog(target_arr, 'Target Headers'), 'validation', false);
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

function normalize(string){
  string = string.replace(/[\s-_]/g, '');
  string = string.toLowerCase();
  return string;
}

//********* Utility Functions ***************
function displayArrayForLog(array, title){
  var string = title + ': ' || '';
  array.forEach( (element, index) => {
    string+= '['
      + String.fromCharCode(index + 65)
      + '] ' + element + ' | ';
  });
  return string;
}

module.exports = validate;
module.exports.log = validationLog;

