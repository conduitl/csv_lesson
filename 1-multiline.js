var fs = require('fs'); 

fs.readFile('reversemulti-output.csv', 'utf8', parseFile );
// (1)
function parseFile(err, data) {

	data = data.replace(/"/g, '');

	data = data.split(/,|\r\n/);
	console.log('Length of data array = ' + data.length)
	data.forEach( (element, index) => 
		console.log('-------- ARRAY ' 
			+ index + '--------\n' + element ) );

	data = data.map( (element) => {
		return element.split('\n');
	});

	prepareFile('multilineJS-output', 'csv', data);
}

// (2)
function prepareFile(name, type, two_dimensional_array) {
	var csv_string = '', state;

	two_dimensional_array.forEach( (element) => {
		state = element.shift();
		csv_string+= element.join(',' + state + '\r\n');
		csv_string+= ',' + state + '\r\n';
	});

	console.log(csv_string);

	createFile(name, type, csv_string);
}

// (3)
function createFile(name, type, data) {
	fs.writeFile(name + '.' + type, data, (err) => {
		if (err) throw err;
		console.log('File ' + name + '.' + type + ' has been written.');
	});
}