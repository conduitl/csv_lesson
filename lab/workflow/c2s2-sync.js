// Case 2 
const fs = require('fs');
const path = require('path');
console.time('workflow');
var workflow = [readDirectory, readFiles, createOutputFile]; //serial workflow
var settings = {
  input: {
    path: '_source-data',
    format: 'csv'
  },
  output: {
    path: 'output',
    file: 'consolidated.csv',
    format: 'csv'
  }
};
execute(settings);
// Workflow 
// * readDirectory
// * readFiles | iterates over files
// * createOutputFile
function readDirectory(config) {
  let path = config.input.path;
  let files = fs.readdirSync(path);
  console.log('Files: ' + files.length);
  console.log(files);
  next(null, config, files);
}

function readFiles(config, files) {
  let path = config.input.path;
  let file_data = [];
  let consolidatedData = '';

  file_data = files.map( (file, index, array) => {
    var data = fs.readFileSync(path + '/' + file, 'utf8');
    // sub workflow for csv
    data = parse(config, data);   // input: string | output: string if i/o formats both csv

    return data;
  });

  consolidatedData = file_data.join('');

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

// Sub workflow inside iterator
// * function parse - identify input format, select appropriate parse
function parse(config, d){
  let input = config.input.format;
  let output = config.output.format;

  if (input === 'csv' && output === 'csv') {
    d = parseCsv(d);   // input: string | output: array
    d = prepareCsv(d); // input: array  | output: string
    return d;
  } else {
    return console.log('Operation not supported');
  }
}
function parseCsv(d) {
    d = d.split('\n');
    d.shift();
    return d;
}
function prepareCsv(d) {
    return d = d.join('\n');
}
