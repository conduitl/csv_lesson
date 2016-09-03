// Case 2
//TODO
// - Use validation module
const fs = require('fs');
const validate = require('./util/validate');

var workflow = [readDirectory, readFiles, createOutputFile]; //serial workflow
var settings = {
  input: {
    path: 'data'
  },
  output: {
    path: 'output',
    file: 'consolidated.csv'
  }
};
execute(settings);
// Workflow 
// * readDirectory
// * readFiles
// * createOutputFile
function readDirectory(config) {
  let path = config.input.path;
  fs.readdir(path, (err, files) => {
    if (err) throw err;
    console.log('Files in dir: ' + files.length );
    console.log( files );
    next(null, config, files);
  });
}

function readFiles(config, files) {
  let path = config.input.path;
  let supervisor = new Counter('readFile', 0, files.length);
  let consolidatedData = '';

  files.forEach( (file, index, array) => {
    fs.readFile( path + '/' + file, 'utf8', (err,  data) => { 
      if (err) throw err;
      if (index > 0) {
        data = data.split('\n');
        data.shift();
        data = data.join('\n');
      }

      consolidatedData+= data;

      supervisor.increment();
      if ( supervisor.checkIfComplete() ) {
        next(null, config, consolidatedData);
      }
    });
  });
}
// TODO - Move all csv processing into separate function from readFiles
// * Challenge is managing the subworkflow inside the loop
function parseCsv(){

}

function createOutputFile(config, data) {
  let path = config.output.path;
  let file = config.output.file;
  fs.writeFile(path + '/' + file, data, (err) => {
    if (err) throw err;
    console.log('File written to: ' + path + '/' + file);
  });
}

class Counter {
  constructor(name, min, max) {
    this.name = name;
    this.min = min;
    this.max = max;
    this.current = 0;
  }
  get total() {
    return this.max;
  }
  increment() {
    return this.current++;
  }
  checkIfComplete() {
    return this.current === this.max;
  }
}



// Workflow management
function next(err, config, result) {
  if (err) throw err;
  var currentTask = workflow.shift();
  if (currentTask) {
    currentTask(config, result);
  }
}

function execute( config ) {
  next(null, config);
}


// Previous todos
//   * move into modules-
//   * make functions-
//   ** Create Consolidated
//	 ** Pull Log
//   ** Create Logs
//   * write JSON file
//   * use strict
//   * Put the input filename in the last column of the consolidated csv