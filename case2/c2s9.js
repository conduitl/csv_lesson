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
        report+= '\r\n';
        report+= 'Input file ' + context + ' remediation report' + '\r\n';
        report+= '---------------------------------------------' + '\r\n';
        report+= targetHeaderMsg + '\r\n';
      }
    if (input_arr[index] === target) {
      result = 'a match';
    } else {
        report+= 'index [' 
          + String.fromCharCode(index + 65) + '] "' 
          + input_arr[index] + '" is ' 
          + result + ' of target: ' + target 
          + '\r\n';
      }
    console.log('index [' + index + '] "' + input_arr[index] + '" is ' + result + ' of target: ' + target);
  });
}




var consolidatedData = '';
var report = 'REPORT\r\n------------------------------------\r\n';

filenames.forEach( (file, index, array) => {
  var data = fs.readFileSync('data/' + file, 'utf8');
  var file_headers = '';
  var status = '!!';
	
  if (index === 0) {
    console.log( 'Files in array: ' + array.length );
    report+= 'Files in array: ' + array.length + '\r\n';
    console.log( array );
    report+= array + '\r\n';
    
    consolidatedData+= targetHeaders + '\r\n';
    
    console.log('---File headers---');
    report+= '---File headers---' + '\r\n';
  }
	
  data = data.split('\r\n');
  
  var headerRow = data.shift();
  // headers for file
  console.log('---Comma separated headers---');
  console.log(headerRow + '\r\n');
  console.log(typeof headerRow);
  var headerArray = headerRow.split(',');

  console.log('---Array of headers---');
  console.log(headerArray);

  compare(headerArray, targetHeaders, file);
  
  // end headers for file
  if ( file_headers === targetHeaders ) {
    status = 'ok';
  }
  
  data = data.join('\r\n');
	
  console.log( status + ' - ' + file.substr(0, 8) + ' in [' + index + ']: ' + file_headers );
  report+= status + ' - ' + file.substr(0, 8) + ' in [' + index + ']: ' + file_headers + '\r\n';

  consolidatedData+= data;
});

fs.writeFileSync('output/consolidated.csv', consolidatedData);

console.log('File written to: ' + 'output/consolidated.csv');

fs.writeFileSync('output/program_log.txt', report);

console.log(report);