// Case 2 

const fs = require('fs');
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
    next(null, config, files);
  });
}

function readFiles(config, files) {
  let path = config.input.path;
  let supervisor = new Counter('readFile', 0, files.length);
  let consolidatedData = '';

  files.forEach( (file, index, array) => {
    fs.readFile( path + '/' + file, 'utf8', (err,  data) => { // I'd rather not use the global..folderPath
      if (err) throw err;
      if (index === 0) {
        console.log('Files in array: ' + array.length );
        console.log( array );
      } else {
        data = data.split('\n');
        data.shift();
        data = data.join('\n');
      }

      consolidatedData+= data;
      supervisor.increment();
      console.log( supervisor.checkIfComplete() + ' current: ' + supervisor.current );
      if ( supervisor.checkIfComplete() ) {
        next(null, config, consolidatedData);
      }
    });
  });
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