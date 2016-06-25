function compare(actual, target){
    
    actual = normalize(actual);
    target = normalize(target);
  
	if (actual === target) {
		return 'MATCH';
	}
	return 'DEVIATION';
};

function normalize(string){
  string = string.replace(/ /g, '');
  return string;
}

module.exports = compare;