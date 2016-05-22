var fs = require('fs'); 

var workflow = [parseFile, prepareFile, createFile];

var config = {
	inputfile : {
		name : 'malformed',
		type : 'csv'
	},
	outputfile : {
		name : 'workflow-output',
		type : 'csv'
	}
};

var step = 0;

(function(params, workflow, step){
	var filename = params.inputfile.name + params.inputfile.type;
	  
	
	fs.readFile(filename, 'utf8', (err, data) => { 
		workflow[step](params, workflow, step);
	});
}())

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

	prepareFile('workflow-output', 'csv', data);
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