"use strict";
const Log = require('./c3l10-log');

var validationLog = new Log({
	path: 'logs/',   // folder(s) must exist; does not create folder(s)
	filename: 'validation_log'
});

//validationLog.verbose();

// create alias
function log (msg, formatting, to_console){
	return validationLog.append(msg, formatting, to_console);
}

function compare(actual, target, context){ // added context parameter
  
  log('Headers being examined in: ' + context );
  log(actual + '<--- file headers');
  
  actual = normalize(actual);
  target = normalize(target);
  
  log(actual + '<--- file headers after normalization');
  log(target + '<--- target headers'); 
  
  if (actual === target) {
      log('Verdict: MATCH\r\n');
      return 'MATCH';
  }
  log('Verdict: DEVIATION\r\n');
  validationLog.report('deviation', context 
                    + '\r\nNormalized headers = ' + actual + '\r\n\r\n');
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

