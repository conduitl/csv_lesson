var fs = require('fs');

var path = '../data sets/by state/';

fs.readFile('states.json', 'utf8', (err, data) => {

  if (err) throw err;
  
  data = JSON.parse(data);
  
  console.log(data);
  
  for (var state in data) {
    var state_obj, csv = '';
    
    state_obj = data[state];
    
    // csv+= Object.keys(state_obj.legislators[0]).join() + '\r\n';
		csv+= 'first name,last name,state,type,birthday,phone,email\r\n';
    
    state_obj.legislators.forEach( legislator => {
    
      csv+= legislator.firstname + ',';
      csv+= legislator.lastname + ',';
      csv+= legislator.state + ',';
      csv+= 'Qualified,';
      csv+= legislator.birthday + ',';
      csv+= legislator.phone + ',';
      csv+= legislator.contact_form + '\r\n';
    
    }); 
    
		data[state].governor = data[state].governor.replace(' ', '');
		
    fs.writeFile(path + state + '_' + data[state].governor + '.csv', csv, (err) => {
      if (err) throw err;
    });
  }

});