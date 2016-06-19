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

class CongressMember extends PersonnelRecord {
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

var object2 = {
	user_id: 'H014294',
	firstname: 'Colleen',
	lastname: 'Gonzalez',
	personnel_no: 123601
};

var object3 = {
	user_id: 'H014294',
	firstname: 'Thomas',
	lastname: 'Rundle',
	personnel_no: 123601
};

var object4 = {
	user_id: 'H014294',
	firstname: 'Taresa',
	lastname: 'Mikle',
	personnel_no: 123601
};

var obj_arr = [object1, object2, object3, object4];

var sapRecords = obj_arr.map( obj => {
	return new CongressMember(obj);
});

sapRecords.forEach( record => {
	return console.log(record.name);
});


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
