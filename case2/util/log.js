'use strict';
const fs = require('fs');

class Log {
	constructor(config) {
		this.filename = config ? config.filename || 'log' : 'log',
		this.path = config ? config.path || '' : '',
		this.data = {},
    this.console = false
	}
  // append() Objectives - Case 2 Update - 7/4/16
  // * Redesign 2nd parameter
  // *>> Accepts string or object
  // *----- If undefined, append to this.report.main
  // *----- If string, appends to a section for reporting
  //           e.g. log('Hello', 'welcome') --> append to this.report['welcome']
  // *----- If object, format must be:
  //          e.g. { section: 'welcome', formatting: ['*', 5] }
	append(msg, config, to_console) {
    var settings;  
      
		if (typeof config === 'object') {
      settings = config;
    } else if (typeof config === 'string') {
      settings = {
        section: config,
        formatting: undefined
      };
    } else {
      settings = {
        section: 'main',
        formatting: undefined
      };
    }
      
		if (settings.formatting) {
			msg = format(msg, formatting[0], formatting[1] );
		}
      
		if (to_console === true || this.console) { // If no arg, use default
			console.log(msg);
		}
      
    if (!this.data[settings.section]) {
      this.data[settings.section] = '';                 
    }
		this.data[settings.section]+= msg + '\r\n';
            
		return {
			message: msg,
			location: this.path + this.filename + '.txt',
			all: this.data
		}
	}
  // create() **********************************
  // * Writes log file in the sequence specified
  // > Arguments
  //   > sections | type: array
  //   - If no arguments provided
  //     Then create() will write data found in this.report.main
	create( sections ) {
      var report;
      if ( sections && Array.isArray(sections) ) {
        report = sections
          .map ( element => {
          return this.data[element];
        })
          .reduce( (previous, current) => {
          return previous + current;
        });        
      } else {
        report = this.data.main;
      }
      
		fs.writeFileSync(this.path + this.filename + '.txt', report);
		return this.path + this.filename + '.txt';
	}
	// report() Objectives - Case 2 Update - 7/4/16
	// * Redesign function to focus on reporting out
	//   rather than duplicating append() function
	// Returns
	// * Available sections to add to report
	// * Data from specified sections (properties) in sequence provided
	// * Data from one particular section specified
	// * All data in default sequence or last defined sequence
	report( sections ){
		var document;
		document = sections.map ( element => this.data[element] );
		return this.data;
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

function makeColumns(columns, separator) {
  // TODO
  // columns is an array e.g. [ 'col1', 'col2', 'col3']
  // separator e.g. '-' or ' ' or '_'
  
  // find longest value in first column
}

module.exports = Log;
