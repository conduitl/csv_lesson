var fs = require('fs');

fs.readFile('reversefirstlast-output.json', 'utf8', (err, data) => {
  data = JSON.parse(data);
  // sort list by state
  data.sort( (a, b) => { 
    
    if (a.state < b.state) return -1;
    if (b.state < a.state) return 1;
    return 0;
  
  } );
  
  // build csv from obj
  var csv = '', us_state, col_num = 1;
  
  data.forEach( (obj, idx) => {
    if (idx === 0) {
      us_state = obj.state;
      
      csv+= '"'; // opening quote for first cell
      csv+= us_state;
    }
    // when new us_state is identified then we need a new cell
    // note this only works when array of objects is grouped by state
    // i.e. all reps from same state are listed consecutively
    if (obj.state !== us_state && idx > 0) {
      us_state = obj.state;
      csv+= '"'; // closing quote, containing the cell
      if (col_num === 3) {
        csv+= '\r\n'; // start new row
        col_num = 1;
      } else {
        csv+= ','; // start new column
        col_num++; 
      }
      csv+= '"'; // opening quote, allowing newlines in cell
      csv+= us_state + '\n'; // US State is first line of new cell
    } else {
      // concat new line onto previous entry
      csv+= '\n' 
    }
    // add name
    csv+= obj.firstname + ' ' + obj.lastname;
  }); 
  
  fs.writeFile('reversemulti-output.csv', csv, (err) => {
    if (err) throw err;
  });
  
});