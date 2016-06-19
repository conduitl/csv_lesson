var fs = require('fs'); 
var classes = require('./class')
var CongressMember = classes.CongressMember;

fs.readFile('output/2-firstlastJS-output.csv', 'utf8', (err, data) => {
	if (err) throw err;
	
	data = data.split('\r\n');
	data = data.map( elem => elem.split(',') );
	
	data = data.map ( arr => {
		return new CongressMember ({
			firstname: arr[2],
			lastname: arr[1],
			state: arr[3]
		});
	});
	
	data.forEach( member => console.log(member.name));
	
  var json_data = JSON.stringify(data, null, 4);
	fs.writeFile('combine.json', json_data, err => {
		if (err) throw err;
	});

});

//var object1 = {
//	user_id: 'H014294',
//	firstname: 'Eric',
//	lastname: 'Williams',
//	personnel_no: 123601
//};
//
//var object2 = {
//	user_id: 'H014294',
//	firstname: 'Colleen',
//	lastname: 'Gonzalez',
//	personnel_no: 123601
//};
//
//var object3 = {
//	user_id: 'H014294',
//	firstname: 'Thomas',
//	lastname: 'Rundle',
//	personnel_no: 123601
//};
//
//var object4 = {
//	user_id: 'H014294',
//	firstname: 'Taresa',
//	lastname: 'Mikle',
//	personnel_no: 123601
//};
//
//var obj_arr = [object1, object2, object3, object4];
//
//var sapRecords = obj_arr.map( obj => {
//	return new CongressMember(obj);
//});
//
//sapRecords.forEach( record => {
//	return console.log(record.name);
//});


// Objectives
//    * Consistent functions that can be reused to achieve multiple goals
//    * Create new readfile functions that accepts additional parameters
//    * Consistent arguments for each function

//readFile('output/3-objJS-output', 'json', parseFile ); 
//
//function readFile(filepath, filetype, callback) {
//	fs.readFile( filepath + '.' + filetype, 'utf8', callback );
//} 
//
//// (1)
//function parseFile(err, data) {
//
//  data = JSON.parse(data); 
//
//  prepareFile('output/5-readJSON-output', 'csv', data);
//}
//
//// (2)
//function prepareFile(filename, type, arr_of_obj) {
//	var csv = '';
//	
//	arr_of_obj.forEach( (element) => {
//		csv+= element.firstname + ',';
//		csv+= element.lastname + ',';
//		csv+= element.state + '\r\n';
//	});
//
//  createFile(filename, type, csv);
//}
//  
//
//// (3)
//function createFile(filename, type, data) {
//  fs.writeFile(filename + '.' + type, data, (err) => {
//    if (err) throw err;
//    console.log('File ' + filename + '.' + type + ' has been written.');
//  });
//}

