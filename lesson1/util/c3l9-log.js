'use strict';
const fs = require('fs');

class Log {
	constructor(config) {
		this.filename = config ? config.filename || 'log' : 'log',
		this.path = config ? config.path || '' : '',
		this.data = '',
        this.console = false
	}
	append(msg, formatting, to_console) {
		if (to_console === undefined) {
			to_console = this.console;
		}
		if (formatting) {
			msg = format(msg, formatting[0], formatting[1] );
		}
		if (to_console) {
			console.log(msg);
		}
		this.data+= msg + '\r\n';
		return {
			message: msg,
			location: this.path + this.filename + '.txt',
			all: this.data
		}
	}
	create() {
		fs.writeFileSync(this.path + this.filename + '.txt', this.data);
		return this.path + this.filename + '.txt';
	}
   verbose(){
        return this.console = true;
   }
}

function format(msg, char, num) {
	var formatting = '', i;
	for (i = 0; i < num; i++) {
		formatting+= char;
	}
	return formatting + msg + formatting;
};

module.exports = Log;
