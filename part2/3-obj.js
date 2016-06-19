var fs = require('fs'); 

var divider_lastname = /\s(?=\w+$)/g;

fs.readFile('output/1-multilineJS-output.csv', 'utf8', parseFile );
// (1)
function parseFile(err, data) {
  var clean_rx = /"/g;
  var row_rx = /\r\n/;
  var cell_rx = ',';
  
  
  
  parseFile.clean = function ( clean_rx ){
    return data.replace( clean_rx , '');
  }
  
  parseFile.split = function ( row_rx, cell_rx ) {
    return data.split( row_rx ).map( element => {
      return element.split(',');
    });
  }
  
  var cleaned_arr = parseFile.clean( clean_rx );
  var twoD_arr = parseFile.split( row_rx, cell_rx );
  
  prepareFile('output/3-objJS-output', 'json', twoD_arr);
}

// (2)
function prepareFile(filename, type, two_dimensional_array) {
  var 
    component_arr, 
    fullname, firstname, lastname, 
    array_of_objects = [],
    jsondata;
  
  two_dimensional_array.forEach( element => {
    var obj = {};
    
    fullname = element.shift();
    
    component_arr = fullname.split(divider_lastname);
    firstname = component_arr.shift();
    lastname = component_arr.shift();
    
    state = element.shift();
    
    obj.firstname = firstname;
    obj.lastname = lastname;
    obj.state = state;
    
    array_of_objects.push(obj);
  
  });
  


  jsondata = JSON.stringify(array_of_objects, null, 4);

  createFile(filename, type, jsondata);
}

// (3)f
function createFile(filename, type, data) {
  fs.writeFile(filename + '.' + type, data, (err) => {
    if (err) throw err;
    console.log('File ' + filename + '.' + type + ' has been written.');
  });
}