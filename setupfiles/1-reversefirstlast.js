var fs = require('fs');

fs.readFile('multilineJS-output.csv', 'utf8', (err, data) => {
  data = data.split('\r\n'); // split into rows
  data = data.map( (element) => {
    return element.split(',');
  });
  console.log(data);
  
  createJson('reversefirstlast-output.json', data);
});

function createJson(filename, two_dimensional_array) {
  var array_of_objects = [];
  
  two_dimensional_array.forEach( (element) => {
    array_of_objects.push({
      firstname: element[0],
      lastname: element[1],
      state: element[2]
    });
  
  });
  
  var jsondata = JSON.stringify(array_of_objects, null, 4);
  
  fs.writeFile(filename, jsondata, (err) => {
    if (err) throw err;
  });
  
}