var fs = require('fs'); 

fs.readFile('output/3-objJS-output.json', 'utf8', parseFile );
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
  

// (3)f
function createFile(filename, type, data) {
  fs.writeFile(filename + '.' + type, data, (err) => {
    if (err) throw err;
    console.log('File ' + filename + '.' + type + ' has been written.');
  });
}