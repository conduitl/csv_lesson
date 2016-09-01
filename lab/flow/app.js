//const nimble = require('./mod/nimble');
var fs = require('fs');

console.time('app');

//Objective
// 8/31/16
// Apply flow control to reading of data files (states csvs)

var counter = 0;
var taskId = 0;
var workflow = [task];

readDirectory( workflow.shift() );
console.log('after (outside)');

function readDirectory(callback) {
  fs.readdir('../data', (err, files) => {
    if (err) throw err;
    let len = files.length;

    console.log(files);
    
    iterate( {iterations: len, sync: true}, callback);
  });
  console.log('after (inside)');
  
}

function cbTest() {
  console.log('after (calback)');
}

//iterate({iterations: 100, sync: false}, parallelFunc);

function iterate(config, callback) {
  let iterations = config.iterations;
  let sync       = config.sync;

  setCounter(iterations);
  
  if (sync) {
      nextIteration(callback);
  } else {
    for (let i = 0; i < iterations; i++) {
      callback(i, checkIfComplete);
    }
  }
}

function task(callback) {
  let id = createTaskId();
  let timer = Math.random() * 1000;
  setTimeout( () => {
    console.log('Task ' + id +  ' executed after ' + timer + ' milliseconds.');
    nextIteration(callback);
  }, timer);
}
function sync(callback) {
  
  
}
// track serial flow
function nextIteration(callback){
  let count = checkCounter();
  if (count > 0) {
    callback(callback);
    decrementCounter();
  } else {
    console.timeEnd('app');
  }
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

// track tasks executed
function createTaskId() {
  return taskId++;
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