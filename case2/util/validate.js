function compareHeaders(actual, target){
	if (actual === target) {
		return 'MATCH';
	}
	return 'DEVIATION';
};

module.exports = compareHeaders;