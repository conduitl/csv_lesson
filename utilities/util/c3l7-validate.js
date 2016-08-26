"use strict";
const Log = require('./c3l7-log');

var validationLog = new Log({
	path: 'logs/',   // folder(s) must exist; does not create folder(s)
	filename: 'validation_log'
});

// create alias
function log (msg, formatting, to_console){
	return validationLog.append(msg, formatting, to_console);
}

function compare(actual, target){
    
   actual = normalize(actual);
   target = normalize(target);
   
   log(actual, null, false);
  
	if (actual === target) {
		return 'MATCH';
	}
	return 'DEVIATION';
};

function normalize(string){
  string = string.replace(/[\s-_]/g, '');
  string = string.toLowerCase();
  return string;
}
//var logLocation = validationLog.create();
//log.create('c3l6-validate');

module.exports = compare;
module.exports.log = validationLog;

