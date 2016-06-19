var fs = require('fs'); 

// Objectives
//    * Consistent functions that can be reused to achieve multiple goals
//    * Create new readfile functions that accepts additional parameters
//    * Consistent arguments for each function

readFile('output/3-objJS-output', 'json', parseFile ); 

function readFile(filepath, filetype, callback) {
	fs.readFile( filepath + '.' + filetype, 'utf8', callback );
} 

// (1)
function parseFile(err, data) {

  data = JSON.parse(data); 

  prepareFile('output/5-readJSON-output', 'csv', data);
}

// (2)
function prepareFile(filename, type, arr_of_obj) {
	var csv = '';
	
	arr_of_obj.forEach( (element) => {
		csv+= element.firstname + ',';
		csv+= element.lastname + ',';
		csv+= element.state + '\r\n';
	});

  createFile(filename, type, csv);
}
  

// (3)
function createFile(filename, type, data) {
  fs.writeFile(filename + '.' + type, data, (err) => {
    if (err) throw err;
    console.log('File ' + filename + '.' + type + ' has been written.');
  });
}

