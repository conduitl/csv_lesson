fs = require('fs');
var classes = require('./class')
var CongressMember = classes.CongressMember;

var alpha = ['C', 'B', 'Z', 'f'];
var index;


// Changes excel columns to array indices
// uppercase alphabet is Unicode 65 (A) - 90 (Z)
function convert( alpha_arr ) {
	return alpha_arr.map( elem => {
		var code, idx;
		
		elem = elem.toUpperCase();
		code = elem.charCodeAt(0);
		idx = code - 65;
		
		return idx;
	});
}

var config = {
	input: {
		encoding: 'utf8'
	}
};

// case 1
// Read perfectly wellformed table with no headers
function read( config ) {
	fs.readFile('2-firstlastJS-output.csv', 'utf8', (err, data) => {
		if (err) throw err;
		
		// do something with the data
		
	});
}

function CsvDocument (data) {
	this.data = data;
}

CsvDocument.prototype.parse = function( data ) {
	// make a two dimensional array
	
}