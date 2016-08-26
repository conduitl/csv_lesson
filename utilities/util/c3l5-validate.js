function compare(actual, target){
    
    actual = normalize(actual);
    target = normalize(target);
  
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

module.exports = compare;