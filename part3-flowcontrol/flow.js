var fs = require('fs');

function readTexas(){
  fs.readFile('Texas_Greg Abbott.csv', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  next();
}

function readCali(){
  fs.readFile('California_Jerry Brown.csv', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  next();
}

function readFlorida(){
  fs.readFile('Florida_Rick Scott.csv', 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
  });
  next();
}

var tasks = [
    readTexas,
    readCali,
    readFlorida
  ];

function next(err, result) {
  if (err) throw err;
  var currentTask = tasks.shift();
  if (currentTask) {
    currentTask(result);
  }
}
next();