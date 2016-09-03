// Case 2 
const fs = require('fs');
const path = require('path');
console.time('workflow');
var workflow = [readDirectory, readFiles, createOutputFile]; //serial workflow
var settings = {
  input: {
    path: '_source-data'
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
  let files = fs.readdirSync(path);
  next(null, config, files);
}

function readFiles(config, files) {
  let path = config.input.path;
  let consolidatedData = '';

  files.forEach( (file, index, array) => {
    var data = fs.readFileSync(path + '/' + file, 'utf8');

    if (index === 0) {
      console.log( 'Files in array: ' + array.length );
      console.log( array );
    } else {
      data = data.split('\n');
      data.shift();
      data = data.join('\n');
    }
    //console.log( '-Processed index [' + index + '] containing ' + file );

    consolidatedData+= data;
  });

  next(null, config, consolidatedData);
}

function createOutputFile(config, data) {
  let path = config.output.path;
  let file = config.output.file;

  fs.writeFileSync(path + '/' + file, data);
  console.log('File written to: ' + path + '/' + file);
  next(null, config);
}

// Workflow management
function next(err, config, result) {
  if (err) throw err;
  var currentTask = workflow.shift();
  if (currentTask) {
    currentTask(config, result);
  } else {
    console.timeEnd('workflow');
  }
}

function execute( config ) {
  next(null, config);
}