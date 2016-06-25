const fs = require('fs');

const data_path = 'data/case2/';

var filenames = fs.readdirSync(data_path);
var consolidatedData = '';

console.log(filenames);

filenames.forEach( (file, index) => {
	
	var file_data = fs.readFileSync(data_path + file, 'utf8');
	
	if (index > 0) {
		file_data = file_data.split('\r\n');
		file_data.shift();
		file_data = file_data.join('\r\n');
	}	
	
  consolidatedData+= file_data;
});

fs.writeFileSync('c2-l2-consolidated.csv', consolidatedData);