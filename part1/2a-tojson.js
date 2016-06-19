var fs = require('fs'); 

var divider_lastname = /\s(?=\w+$)/g;

fs.readFile('output/1-multilineJS-output.csv', 'utf8', parseFile );
// (1)
function parseFile(err, data) {

	data = data.replace(/"/g, '');

	data = data.split(/\r\n/);
    data = data.map( element => {
      return element.split(',');
    });

	prepareFile('output/2a-tojson-output', 'json', data);
}

// (2)
function prepareFile(filename, type, two_dimensional_array) {
	
    var jsondata = JSON.stringify(two_dimensional_array, null, 4);

	createFile(filename, type, jsondata);
}

// (3)f
function createFile(filename, type, data) {
	fs.writeFile(filename + '.' + type, data, (err) => {
		if (err) throw err;
		console.log('File ' + filename + '.' + type + ' has been written.');
	});
}