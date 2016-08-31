//const nimble = require('./mod/nimble');
console.time('app');
var tasks = [
  processDirectory,
  processFileData,
  createFiles
];
var subroutines = [];
var counter = 0;

//next();

function serialFunc() {
  console.log('Serial task executed');
}

iterate({iterations: 100, sync: true}, parallelFunc);

function iterate(config, callback) {
  let iterations = config.iterations;
  let sync       = config.sync;

  setCounter(iterations);
  
  if (sync) {
    nextIteration(serialFunc);
  } else {
    for (let i = 0; i < iterations; i++) {
      callback(i, checkIfComplete);
    }
  }
}
function serialFunc(callback) {
  let id = checkCounter();
  let timer = Math.random() * 1000;
  setTimeout( () => {
    console.log('Serial task ' + id +  ' executed after ' + timer + ' milliseconds.');
    nextIteration(serialFunc);
  }, timer);
}

function parallelFunc(id, callback) {
  let timer = Math.random() * 1000;
  setTimeout( () => {
    console.log('Parallel task ' + id +  ' executed after ' + timer + ' milliseconds.');
    decrementCounter();
    checkIfComplete();
  }, timer);
}

// track parallel flow
function checkIfComplete() {
  'use strict';
  let count = checkCounter();
  if (count === 0) {
    console.timeEnd('app');
  }
}

// track function calls
function setCounter(count) {
  counter = count;
}
function checkCounter() {
  return counter;
}
function decrementCounter() {
  counter--;
}

// track serial flow
function nextIteration(callback){
  let count = checkCounter();
  if (count > 0) {
    callback();
    decrementCounter();
  } else {
    console.timeEnd('app');
  }
}


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