var fs = require('fs'); 

var divider_lastname = /\s(?=\w+$)/g;

fs.readFile('multilineJS-output.csv', 'utf8', parseFile );
// (1)
function parseFile(err, data) {

  data = data.replace(/"/g, '');

  data = data.split(/\r\n/);
  data = data.map( element => {
    return element.split(',');
  });

  prepareFile('objJS-output', 'json', data);
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