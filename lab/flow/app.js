//const nimble = require('./mod/nimble');
console.time('app');
var tasks = [
  processDirectory,
  processFileData,
  createFiles
];
var subroutines = [];
var completedTasks = 0;

next();

function next(err, result) {
  'use strict';
  if (err) {
    throw err;
  }
  var currentTask = tasks.shift();
  if (currentTask) {
    currentTask(result);
  } else {
    console.log('No more tasks to execute.');
    console.timeEnd('app');
  }
}

function checkIfComplete(results) {
  'use strict';
  completedTasks += 1;
  if (completedTasks === subroutines.length) {
    // do something
    console.log(results);
    next();
  }
}

function processDirectory() {
  'use strict';
  console.log('processDirectory()');
  next();
}
function processFileData() {
  'use strict';
  var i = 0, log = '';
  for (i; i < 4; i++) {
    var subroutine = (function() {
      return function() {
        log += ' processFileData()';
        checkIfComplete( log );
      }
    })();
    subroutines.push(subroutine);
  }
  for (var routine in subroutines) {
    subroutines[routine]();
  }
}

function createFiles() {
  'use strict';
  console.log('createFiles()');
  next();
}