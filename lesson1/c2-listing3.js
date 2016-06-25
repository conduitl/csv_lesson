// Objectives
// - Determine if headers from each input file matches our
//   target headers in the consolidated report
// - For each header that doesn't match, warn the console

const fs = require('fs');

const data_path = 'data/case2/';

var filenames = fs.readdirSync(data_path);
var consolidatedData = '';

console.log('-----Files about to be read-----');
console.log(filenames);
console.log('\n');

console.log('-----File headers found-----');


filenames.forEach( (file, index) => {
	
  var file_data = fs.readFileSync(data_path + file, 'utf8');
  var file_headers = '';

  file_data = file_data.split('\r\n');

  file_headers = file_data.shift(); // peal off the header row so we can examine its contents
  console.log(file_headers + '---from ' + file);

  if (index === 0) {
    consolidatedData+= target_headers;
  }
  file_data = file_data.join('\r\n');	
	
  consolidatedData+= file_data;
});

//fs.writeFileSync('c2-l2-consolidated.csv', consolidatedData);