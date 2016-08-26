const fs = require('fs');

var logContent = '';

function log(msg, formatting){
	if (formatting) {
		msg = format(msg, formatting[0], formatting[1] );
	}
	console.log(msg);
	logContent+= msg + '\r\n'; // it will be better to return this value rather than to mutate a global variable
}

function format(msg, char, num) {
	var formatting = '', i;
	for (i = 0; i < num; i++) {
		formatting+= char;
	}
	return formatting + msg + formatting;
};

log.create = function(){
	fs.writeFileSync('log9.txt', logContent);
}

module.exports = log;
