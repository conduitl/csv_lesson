//const log = require('./c3l6-log');

function compare(actual, target){
    
    actual = normalize(actual);
    target = normalize(target);
  
    //log(actual);
  
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

//log.create('c3l6-validate');

module.exports = compare;