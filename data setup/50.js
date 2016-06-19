var fs = require('fs');

var path = '../data sets/master/';
var file_gov = 'governors.csv';
var file_leg = 'legislators-current.csv';

// regular expressions
var rx_nickname = /\w+(?="")/g;
var rx_lastname = /\w+$/g;
var rx_firstname = /^\w+/g;

// Files to read
// - state governors
// - state abbreviation list


// Current workflow
// - Read governors.csv and build an array of objects
// - Write json file - gov.json
// - Read states.csv and tack on the state info to governor json_data
findGovernors();

function findGovernors(){
  fs.readFile(path + file_gov, 'utf8', (err, data) => {
    if (err) throw err;
    parseFile(data);
  });
}


function parseFile(data) {
  fs.writeFile('govs.txt', data)
  data = data.split('\r\n');
  data = data.map( elem => {
    elem = elem.split(',');
    if (!elem[1]) return;
    
    var name = elem[1].match(rx_nickname);
    if (!name) {
      var name = elem[1].match(rx_firstname);
    }
    name = name.toString() + " ";
    name+= elem[1].replace(/"/g, '').match(rx_lastname).toString();
    elem[1] = name;
    elem = elem.slice(0, 2);
    var obj = {
      state: elem[0],
      governor: elem[1]
    };
    return obj;
  });
  
  //console.log(data);
  
  // * Call to add state data *
  reformatByState(data);
  
  data = JSON.stringify(data, null, 2);
  fs.writeFile('govs.json', data, err => {
    if (err) throw err;
  });

}

function reformatByState(data) {
  // I want to refactor the data so that it is one object map
  // root object is *states*
  var obj_map = {};
  data.forEach( obj => {
    if (obj && obj.state) {
      var key = obj.state; // temporarily store state value
      var copy = Object.assign({}, obj); // copy the object
      delete copy.state; // delete property on copied object to avoid duplication
      obj_map[ key ] = copy;
    }
  });
  
  fs.readFile(path + 'states.csv', 'utf8', (err, data) => {
    data = data.split('\r\n');
    data.shift(); //remove header row - format: state abbr, capital, state name
    data = data.map( elem => {
      elem = elem.match(/[\w\s]+/g);
      return elem;
    });
    //console.log(data);
    data.forEach( arr => {
      if ( arr && obj_map[ arr[2] ] ) {
        obj_map[ arr[2] ].abbr = arr[0];
        obj_map[ arr[2] ].capital = arr[1];
      }
    });
    
  
    // * Call to add legislators * //
    addLegislators(obj_map);
    
    
    
  });
  
}

function addLegislators(state_data){
  // read the file with the legislators
  fs.readFile(path + file_leg, 'utf8', (err, data) => {
  
    data = data.split('\r\n');
    console.log(state_data);
    data = data.map( elem => {
      elem = elem.split(',');
      
      var obj = {};
      obj.lastname = elem[0];
      obj.firstname = elem[1];
      obj.birthday = elem[2];
      obj.type = elem[4];
      obj.state = elem[5];
      obj.party = elem[7];
      obj.website = elem[8];
      obj.phone = elem[10];
      obj.contact_form = elem[11];
      
      for (var state in state_data) {

        if (state_data[state].abbr === obj.state) {
          console.log('Found');  
          console.log(state + ' ' + state_data[state].abbr);
          console.log('obj.state = ' + obj.state);
          if (state_data[state].legislators === undefined) {
            state_data[state].legislators = [];
          }
          state_data[state].legislators.push(obj);

          
          break;
        }
      }
      
      return obj;
    });
    
    data = JSON.stringify(state_data, null, 2);
  
    fs.writeFile('states.json', data, err => {
      if (err) throw err;

    });
  
  });
  

}
