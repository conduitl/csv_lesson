# Spreadsheet Automation with Node File System
#### A guide for those interested in learning a little code to speed up their workflow

1. [Reading a csv](#l1)
2. [Copying a file](#l2)
3. [Combining two files](#l3)
4. [Reading a directory](#l4)
5. [Understanding how directory names are stored](#l5)
6. [The addition assignment operator](#l6)
7. [Consolidating the entire directory at once](#l7)
8. [Understanding how the loop works](#l8)
9. [Manipulating the file data](#l9)

##Background
Working as a management consultant, I spend a lot of my time collecting data, interpreting information, making plans, and preparing findings for presentations and reports. I enjoy digging into my client's challenging problems, talking through them with stakeholders, and presenting solutions. However, for every hour of face time, there are several hours of preparation, which, for the sake of discussion, lets call planning, analysis, and design work. This is as it should be, of course, but let's also separate these efforts into two buckets based on the requisite skills and experience for performing the work: A) active problem solving (high skill) and B) routine tasks (low skill).

I enjoy the **"A"** efforts, and my unique ability in the __"A"__ arena is in theory why my clients hire me. The same could be said of all professionals, whether you are a project manager, chemist, petroleum engineer, service manager, software developer etc., using your active problem solving skills to form decisions (designs are decisions) which then translate into action-- that is the value proposition of your expertise.

However, underpinning my planning, analysis, and design activities are countless hours of tedious __"B__ work, which I do myself or delegate to someone else, while feeling a little guilty about it. This work often materializes in form of spreadsheets. Perhaps, there are 10 of them open and I'm furiously copying and pasting values, reformatting, sorting and filtering. Perhaps, some of the files are from SAP or some other ERP system. Perhaps, I'm cross-referencing a slide deck from some director, a whitepaper from some engineer, and a SharePoint list. Perhaps, I have a headache. Maybe I shouldn't have to do this or have to ask anyone else to do it ever again?  

Perhaps, I could just type a few lines into a command terminal and the information I need reorganizes itself. Now, I arrive at the whole point of this GitHub repository. Let's explore how we can make this happen. We'll have to keep reading, designing, and talking to people, but perhaps excessive copying-pasting will be a thing of the past, and we won't have to replace the **Ctrl**, **C**, and **V** keys quite so frequently on our keyboard.

We have put together a JavaScript programming lesson that shows you how to automate your spreadsheets.

The lesson focuses on problem solving and solution design, rather than language syntax and code. The lessons demonstrate how to write an application that processes spreadsheets, helping you quickly organize information that could save you hundreds of hours of manual copying and pasting. 

The first case we will solve is as follows. You have a sales team and each one of them covers a state. They each have a list of leads that they send you every week. 

The challenge is that you want a consolidated list from your sales team. Putting this together every week takes several hours because each member of your team sends their list in a slightly different format and you are copying and pasting from 50 different spreadsheets.

####Problem solving workflow
1. Define what you want
2. Draft a conceptual solution
3. Define constraints
4. Scope the work

####Define what you want
First there's the output itself.. Then let's set parameters around how much effort is acceptable to get that output.

It is important to begin with the end in mind. Even the best of us tend to get distracted. Start your project with a clear picture of the end product. You will find this invaluable, especially on complex, large projects. In this scenario, it's really easy to define the end product because we already have it. It's a spreadsheet that contains all the sales leads for our organization maintained by our 50 individual sales team members. It must have the following columns: first name, last name, state, type, birthday, phone, email, and contact owner. 

We also need to define what we want the process to look like. 

We want one spreadsheet that includes all leads submitted by each of the 50 members of our sales team. 
The table includes eight columns - First Name, Last Name, State, Birthday, Phone Number, Email, Lead Status, and Sales Contact

Process parameters... What amount of effort am I willing to spend in order to get the output I want? 
I want to be able to accomplish the task a few seconds by typing in a few commands into the command line.

Input parameters... What am I going to tell my sales team to provide to me each week so that I can get the output I want (the consolidated report with the eight columns of information)?

<a name="l1"></a>__Listing 1 - Reading a csv__  | [return to top](#)
```
const fs = require('fs');
            
var data = fs.readFileSync('data/Texas_GregAbbott.csv', 'utf8');
console.log(data);
```

<a name="l2"></a>__Listing 2 - Copying a file__  | [return to top](#)
```
const fs = require('fs');

var data = fs.readFileSync('data/Texas_GregAbbott.csv', 'utf8');
fs.writeFileSync('output/copyOfTexasLeads.csv', data);
console.log('File written to: ' + 'output/copyOfTexasLeads.csv');
```

<a name="l3"></a>__Listing 3 - Combining two files__  | [return to top](#)
```
const fs = require('fs');

var tx = fs.readFileSync('data/Texas_GregAbbott.csv', 'utf8');
var nm = fs.readFileSync('data/NewMexico_SusanaMartinez.csv', 'utf8');

var consolidatedData = tx + nm;
fs.writeFileSync('output/consolidated.csv', consolidatedData);
console.log('File written to: ' + 'output/consolidated.csv');
```
<a name="l4"></a>__Listing 4 - Reading a directory__  | [return to top](#)
```
const fs = require('fs');

var filenames = fs.readdirSync('data');
console.log(filenames);
```
<a name="l5"></a>__Listing 5 - Understanding how directory names are stored__  | [return to top](#)
```
const fs = require('fs');

var filenames = fs.readdirSync('data');
console.log(filenames);

console.log( 'Number of files in directory: ' + filenames.length );
console.log( '  -Index [0] contains ' + filenames[0] );
console.log( '  -Index [1] contains ' + filenames[1] );
console.log( '  -Index [2] contains ' + filenames[2] ); 

var ca = fs.readFileSync('data/' + filenames[0], 'utf8');
var nm = fs.readFileSync('data/' + filenames[1], 'utf8');
var tx = fs.readFileSync('data/' + filenames[2], 'utf8');

var consolidatedData = ca + nm + tx;
fs.writeFileSync('output/consolidated.csv', consolidatedData);
console.log('File written to: ' + 'output/consolidated.csv');
```
<a name="l6"></a>__Listing 6 - The addition assignment operator__  | [return to top](#)
```
const fs = require('fs');

var filenames = fs.readdirSync('data');

var consolidatedData;

console.log(filenames);
console.log( 'Number of files in directory: ' + filenames.length );
console.log( '  -Index [0] contains ' + filenames[0] );
console.log( '  -Index [1] contains ' + filenames[1] );
console.log( '  -Index [2] contains ' + filenames[2] ); 

consolidatedData+= fs.readFileSync('data/' + filenames[0], 'utf8');
consolidatedData+= fs.readFileSync('data/' + filenames[1], 'utf8');
consolidatedData+= fs.readFileSync('data/' + filenames[2], 'utf8');

fs.writeFileSync('output/consolidated.csv', consolidatedData);

console.log('File written to: ' + 'output/consolidated.csv');
```

Learn more about [Assignment Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators)

<a name="l7"></a>__Listing 7 - Consolidating the entire directory at once__  | [return to top](#)
```
const fs = require('fs');

var filenames = fs.readdirSync('data');

var consolidatedData = '';

console.log(filenames);

filenames.forEach( file => {
  consolidatedData+= fs.readFileSync('data/' + file, 'utf8');
});

fs.writeFileSync('output/consolidated.csv', consolidatedData);

console.log('File written to: ' + 'output/consolidated.csv');
```
<a name="l8"></a>__Listing 8 - Understanding how the loop works__  | [return to top](#)
```
const fs = require('fs');

var filenames = fs.readdirSync('data');

var consolidatedData = '';

filenames.forEach( (file, index, array) => {
  if (index === 0) {
    console.log( 'Files in array: ' + array.length );
    console.log( array );
  }
  console.log( '-Processing index [' + index + '] containing ' + file );

  consolidatedData+= fs.readFileSync('data/' + file, 'utf8');
});

fs.writeFileSync('output/consolidated.csv', consolidatedData);

console.log('File written to: ' + 'output/consolidated.csv');
```
<a name="l9"></a>__Listing 9 - Manipulating the file data__  | [return to top](#)
```
const fs = require('fs');

var filenames = fs.readdirSync('data');

var consolidatedData = '';

filenames.forEach( (file, index, array) => {
	var data = fs.readFileSync('data/' + file, 'utf8');
	
  if (index === 0) {
    console.log( 'Files in array: ' + array.length );
    console.log( array );
  } else {
		data = data.split('\r\n');
		data.shift();
		data = data.join('\r\n');
	}
  console.log( '-Processed index [' + index + '] containing ' + file );

  consolidatedData+= data;
});

fs.writeFileSync('output/consolidated.csv', consolidatedData);

console.log('File written to: ' + 'output/consolidated.csv');
```
