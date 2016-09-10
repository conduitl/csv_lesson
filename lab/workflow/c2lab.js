// Commit objective - 
// Goal - write multiple outputs at once
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
    file: 'consolidated',
    formats: ['csv','json','html','svg']
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
  let outputs = config.output.formats;
  let input = config.input.format;

  // Remove this loop in final -- Achieve logic in more elegant, semantic way
  // * consolidate data only once in a single format
  // * read input files only once
  // * output logic in separate function
  for (let i = 0; i < outputs.length; i++ ) {

    // Read the data from the files and parse it
    file_data = files.map( (file, index, array) => {
      let reformattedData;
      let data = fs.readFileSync(path + '/' + file, 'utf8');
      // sub workflow for csv
      reformattedData = parse( [input, outputs[i] ], data, index);   // changed 1st arg to take array [input, output]
      return reformattedData;
    });

    // TODO following needs to be in separate function
    if (outputs[i] === 'csv') {
      consolidatedData = file_data.join('');
    }
    if (outputs[i] === 'json') {
      consolidatedData = prepareJson(file_data);
    }
    if (outputs[i] === 'html') {
      consolidatedData = file_data.join('');
      consolidatedData = '<html><head><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossorigin="anonymous"></head><body><table class="table">' + consolidatedData + '</table></body></html>';
    }
    if (outputs[i] === 'svg') {
      consolidatedData = file_data.join('');
      consolidatedData = '<html><head></head><body><table>' + consolidatedData + '</table></body></html>';
    }
    createOutputFile(config, consolidatedData, outputs[i]); // added arg for format is really ugly
  }
  // Next no longer works with loop
  // next(null, config, consolidatedData);
}

function createOutputFile(config, data, format) { // need to rethink how I approach format argument
  let path = config.output.path;
  let file = config.output.file;
  if (format === 'svg') { // Ugh... another ugly workaround :(
    file = file + '_svg';
    format = 'html';
  }
  fs.writeFileSync(path + '/' + file + '.' + format, data);
  console.log('File written to: ' + path + '/' + file + '.' + format);
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
function parse(io, d, idx){
  let input = io[0];
  let output = io[1];

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
  } else if (output === 'html') {
    // same steps as going to JSON
    hdr = retrieveCsvHeaders(d);
    hdr = hdr.split(',');
    d = parseCsvIntoRows(d);
    d = parseCsvRowsIntoCells(d);
    d = transformTableArrayIntoObjArray(hdr, d); // output: array of objs [{}, ...]
    // unique steps
    d = buildHtmlTable(d);
    return d;
  } else if (output === 'svg') {
    // same steps as going to JSON
    hdr = retrieveCsvHeaders(d);
    hdr = hdr.split(',');
    d = parseCsvIntoRows(d);
    d = parseCsvRowsIntoCells(d);
    d = transformTableArrayIntoObjArray(hdr, d); // output: array of objs [{}, ...]
    // unique steps
    d = buildSvg(d);
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
// make standard format [{},{},...]
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

// Html output
function buildHtmlTable(d) {
  // d: [{}, ...]
  let html = '';
  for (let i = 0; i < d.length; i++) {
    let row = '<tr>';
    for (let prop in d[i]) {
      row+= '<td>' + d[i][prop] + '</td>';
    }
    row+= '</tr>';
    html+=row;
  }
  return html;
}

// Svg output
function buildSvg(d) {
  let container = '<tr><td>' + d[0].state + '</td><td><svg height="20" width="1000">';
  let cx = 0;
  for (let i = 0; i < d.length; i++) {
    let circle = '';
    cx+= 15;
    circle = '<circle cx="' + cx + '" cy="8" r="5"  />';
    container+= circle;
  }
  container+= '<text x="' + (cx + 15) + '" y="14">'+ d.length + '</text></svg></td></tr>';
  return container;
}