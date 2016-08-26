// Case 2 | Section 8
// Objective- Fix one type of input file format problem
//    * Choose format to fix i.e. solve for one input type
//    * Choose Alabama
//    * Decompose format problem - Missing last two columns - phone & email
//    * Need program to tell us which header is the problem
//    * Test for just that problem and solution | strip away the rest of the code temporarily
const fs = require('fs');

const targetHeaders = ['first name', 'last name', 'state', 'type', 'birthday', 'phone', 'email'];

var filenames = fs.readdirSync('data');

// ... Target header message for report
var targetHeaderMsg = 'Target headers: ';
targetHeaders.forEach( (header, index) => {
	targetHeaderMsg+= '[' 
      + String.fromCharCode(index + 65)
      + '] ' + header + ' | ';
});
// ... End target header message

function compare(input_arr, target_arr, context){
  target_arr.forEach( (target, index) => {
    var result = 'NOT a match';
      if (index === 0) {
        log('*********************************************', 'validation', false);
        log('Input file ' + context + ' remediation report', 'validation', false);
        log('---------------------------------------------', 'validation', false);
        log(targetHeaderMsg, 'validation', false);
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

var consolidatedData = '';
var report = 'REPORT\r\n------------------------------------\r\n';

filenames.forEach( (file, index, array) => {
  var data = fs.readFileSync('data/' + file, 'utf8');
  var status = '!!';
	
  if (index === 0) {
    log( 'Files in array: ' + array.length, 'summary' ); //s11 addition
    
    consolidatedData+= targetHeaders + '\r\n';
    
    log('---File headers---');
  }
  log(file, 'summary', false); // s11 addition
  data = data.split('\r\n');
  
  var headerRow = data.shift(); //s13 - this needs to stay in position
  var target_header_string = targetHeaders.join();
  
  if ( headerRow === target_header_string ) {
    status = 'ok';
  } else { //s13 added else
    // s13- Move down into else statement... only need to call compare if string comparison doesn't pass
    var headerArray = headerRow.split(',');
    compare(headerArray, targetHeaders, file);
    // end headers for file
  }
  
  data = data.join('\r\n');
	
  log( status + ' - ' + file.substr(0, 8) + ' in [' + index + ']: ' + headerRow );
  report+= status + ' - ' + file.substr(0, 8) + ' in [' + index + ']: ' + headerRow + '\r\n';

  consolidatedData+= data;
});

fs.writeFileSync('output/consolidated.csv', consolidatedData);

console.log('File written to: ' + 'output/consolidated.csv');

fs.writeFileSync('output/program_log.txt', log.summary + log.body + log.validation);