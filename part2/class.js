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
		this.state = record_obj.state;
	}
}

module.exports.CongressMember = CongressMember;
