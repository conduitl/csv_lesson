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

	prepareFile('output/2-firstlastJS-output', 'csv', data);
}

// (2)
function prepareFile(filename, type, two_dimensional_array) {
	var csv_string = '', state, fullname, first, last;

	two_dimensional_array.forEach( (element) => {
      
        fullname = element.shift().split( divider_lastname );
        console.log( 'Fullname is ' + fullname );
        first = fullname[0];
        last = fullname[1];
        fullname = fullname.join(' ');
		state = element.shift();
      
        csv_string+= fullname + ',' + first + ',' 
          + last + ',' + state + '\r\n';
      
	});

	console.log(csv_string);

	createFile(filename, type, csv_string);
}

// (3)f
function createFile(filename, type, data) {
	fs.writeFile(filename + '.' + type, data, (err) => {
		if (err) throw err;
		console.log('File ' + filename + '.' + type + ' has been written.');
	});
}