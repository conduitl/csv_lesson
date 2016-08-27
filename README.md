# Spreadsheet Automation with Node File System
#### A guide for those interested in learning a little code to speed up their workflow
Chances are that you perform or delegate a lot of tasks that could be automated. I know I do. I'm tired of doing a bunch of boring, tedious work just so I can put together all the information I need to solve whatever big, challenging, interesting problem I've been hired to solve. I spend a lot of time manipulating spreadsheets and so do my colleagues. Let's look at how we can automate some common tasks so we can free up our time for creative problem solving, learning, and other intellectual work that's both rewarding and important to moving ahead in our career. 

We're not all going to be coders and nor should we be. But we all consume IT services and many of us over the course of our careers either have or will requisition an IT project. The intent of this guide is to familiarize you with some software concepts so you can think about how software could automate your workflow and help you and the people who work for you focus on the challenging tasks and decision making that they've been educated, trained and groomed for. 

Along the way, you may find that you can save several (or perhaps even hundreds) of hours using the tools and code contained in this guide. 

If you are interesting in becoming a coder or already well on your way, you may use this guide to learn a little bit more about Node.js. I will point you to other coding resources throughout the guide that supplement the topic at hand. I also intend on writing more articles that get into the nitty gritty of some ways to use Node.js. Feedback and contributions to this repository are also most welcome. 

If you want to dive straight into the code examples, use the table of contents below.

##Contents - Code Listings
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
Working as a management consultant, I spend a lot of my time collecting data, interpreting information, making plans, and preparing findings for presentations and reports. I enjoy digging into my client's challenging problems, talking through them with stakeholders, and presenting solutions. However, for every hour of face time, there are several hours of preparation. For the sake of discussion, lets call this planning, analysis, and design work. Overall, this is time well spent, of course, but only some of it consists of A) active problem solving (high skill) and the rest of it is comprised of B) routine tasks (low skill) that are necessary (or are they?) but don't require a lot of brain power.

I enjoy the **"A"** efforts, and my unique ability in the __"A"__ arena is, in theory, why my clients hire me. The same could be said of all professionals, whether you are a project manager, chemist, petroleum engineer, service manager, software developer, etc. Using active problem solving skills to form decisions (designs are decisions), which then translate into action-- **that** is the value proposition of your expertise.

However, underpinning these planning, analysis, and design efforts are countless hours of tedious __"B__ work, which I do myself or delegate to someone else, while feeling a little guilty about it. This work often materializes in form of spreadsheets. Perhaps, there are 10 of them open and I'm furiously copying and pasting values, reformatting, sorting and filtering. Perhaps, some of the files are from SAP or some other ERP system. Perhaps, I'm cross-referencing a slide deck from some director, a whitepaper from some engineer, and a SharePoint list. Perhaps, I have a headache. Maybe I shouldn't have to do this or have to ask anyone else to do it ever again?  

Perhaps, I could just type a few lines into a command terminal and the information I need reorganizes itself. Now, I arrive at the whole point of this GitHub repository. Let's explore how we can make this happen. We'll have to keep reading, designing, and talking to people, but perhaps excessive copying-pasting will be a thing of the past, and we won't have to replace the **Ctrl**, **C**, and **V** keys quite so frequently on our keyboard.

A mid-level technical manager once bragged to me that he'd used Excel to its limit, meaning he'd made a table with 65,000 something lines. Let's see if we can hold how we measure our work to a higher standard. 

The first case we will solve is as follows. You have a sales team and each one of them covers a state. They each have a list of leads that they send you every week. 

##Purpose
This dream of "A couple of commands and all my routine work is done" is not something we can accomplish by ourselves. More sophisticated automation requires software development experts. However, you'll be surprised out how much you can accomplish and just how much of your routine work you can automate with a few tools and a little bit of guidance. 

Also, my goal is to help you become a better customer and consumer of IT services. My intent is to help you become more familiar with software concepts, be better able to articulate your requirements to professional software teams, and be able to evaluate whether or not you are working with the right software team so that you don't get taken. 

Last but not certainly not least, I'd like to show you some examples of what is possible with a little automation, so that you and the people who are working for you might be able to focus on the more meaningful (and lucrative) work, while automating the rest. 

##Case #1

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
