// Commit objective - Support grabbing the header
// Goal - support parsing to json
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
    file: 'consolidated.json',
    format: 'json'
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
    let reformattedData;
    let data = fs.readFileSync(path + '/' + file, 'utf8');
    // sub workflow for csv
    reformattedData = parse(config, data, index);   // input: string | output: string if i/o formats both csv

    return reformattedData;
  });
  // TODO following needs to be in separate function
  if (config.output.format === 'csv') {
    consolidatedData = file_data.join('');
  }
  if (config.output.format === 'json') {
    consolidatedData = prepareJson(file_data);
  }
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
function parse(config, d, idx){
  let input = config.input.format;
  let output = config.output.format;
  let hdr = '';

  if (input === 'csv' && output === 'csv') {
    hdr = retrieveCsvHeaders(d);
    d = parseCsvIntoRows(d);      // input: string | output: array
    d = parseCsvRowsIntoCells(d)  // input: array  | output: 2d array (table)
    d = joinCsvCellsIntoRows(d)   // input: 2d array | output: array
    d = joinCsvRows(d);           // input: array  | output: string
    if (idx === 0) {
      hdr = retrieveCsvHeaders(d);
      return hdr + d;
    }
    return d;
  } else if (input === 'csv' && output === 'json') {
    hdr = retrieveCsvHeaders(d);
    hdr = hdr.split(',');
    d = parseCsvIntoRows(d);
    d = parseCsvRowsIntoCells(d);
    d = transformTableArrayIntoObjArray(hdr, d); // output: array of objs [{}, ...]
    return d;
  } else {
    return console.log('Operation not supported');
  }
}
// CSV parsing functions
// decompose
function retrieveCsvHeaders(d) {
  d = d.split('\n');
  return d.shift();
}
function parseCsvIntoRows(d) { //changed to have more accurate name
  d = d.split('\n');
  d.shift(); // strip header
  return d;
}
function parseCsvRowsIntoCells(d) {
  let table = [];
  table = d.map( (row) => {
    return row.split(',');
  });
  return table; // 2d array
}

function transformTableArrayIntoObjArray(hdr, d) {
  // d : 2d array
  let doc = [];
  doc = d.map( (arr) => {
    let obj = {};
    for (let i = 0; i < arr.length; i++){
        let key = hdr[i].trim();
        let val = arr[i].trim();
        if (val) {
          obj[ key ] = val;
        }
    }
    return obj;
  });
  //check last for empty obj (better way to do this?)
  if (Object.keys(doc[ doc.length - 1]).length === 0) {
    doc.pop(); // remove empty object from array
  }

  return doc;
}
// put back together
function joinCsvCellsIntoRows(d) {
  let rows = [];
  rows = d.map( (cells) => {
    return cells.join(',');
  });
  return rows;
}
function joinCsvRows(d) {
    return d.join('\n');
}

// JSON parsing functions
function prepareJson(d) {
  return JSON.stringify(d, null, 2);
}
