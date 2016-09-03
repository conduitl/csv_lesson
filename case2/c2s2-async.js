// Case 2 

const fs = require('fs');
var workflow = [readDirectory, readFiles, createOutputFile]; //serial workflow
var folderPath = 'data';
execute(folderPath);

// Workflow 
// * readDirectory
// * readFiles
// * createOutputFile
function readDirectory(path) {
  fs.readdir('data', (err, files) => {
    if (err) throw err;
    next(null, files);
  });
}

function readFiles(files) {
  let supervisor = new Counter('readFile', 0, files.length);
  let consolidatedData = '';

  files.forEach( (file, index, array) => {
    fs.readFile( folderPath + '/' + file, 'utf8', (err,  data) => { // I'd rather not use the global..folderPath
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
        next(null, consolidatedData);
      }
    });
  });
}

function createOutputFile(data) {
  fs.writeFile('output/consolidated.csv', data, (err) => {
    if (err) throw err;
    console.log('File written to: ' + 'output/consolidated.csv');
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
function next(err, result) {
  if (err) throw err;
  var currentTask = workflow.shift();
  if (currentTask) {
    currentTask(result);
  }
}

function execute( input ) {
  next(null, input);
}
