"use strict";
class PersonnelRecord {
	constructor(record_obj) {
		this.user_id = record_obj.user_id,
		this.firstname = record_obj.firstname,
		this.lastname = record_obj.lastname
	}
	
	get name() {
		return this.firstname + ' ' + this.lastname;
	}
}

class SapPersonnelRecord extends PersonnelRecord {
	constructor(record_obj) {
		super(record_obj);
		this.personnel_no = record_obj.personnel_no;
	}
}

var object1 = {
	user_id: 'H014294',
	firstname: 'Eric',
	lastname: 'Williams',
	personnel_no: 123601
};


var sapRecord = new SapPersonnelRecord(object1);

console.log(sapRecord.name);

//var obj = {};
//obj.read = function( data ){
//	console.log('Read...');
//	this.data = data;
//	return this;
//}
//obj.write = function(){
//	console.log('Write...' + this.data);
//	return this;
//}
//
//obj.read('Hello World').write();
//console.log(
//  'Functional Programming'.substring(0, 10).toLowerCase() + ' is fun'
//);
