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

However, underpinning these planning, analysis, and design efforts are countless hours of tedious __"B"__ work, which I do myself or delegate to someone else, while feeling a little guilty about it. This work often materializes in spreadsheets. Perhaps, there are 10 of them open and I'm furiously copying and pasting values, reformatting, sorting and filtering. Perhaps, some of the files are from SAP or some other ERP system. Perhaps, I'm cross-referencing a slide deck from some director, a whitepaper from some engineer, and a SharePoint list. Perhaps, I have a headache. Maybe I shouldn't have to do this or have to ask anyone else to do it ever again?  

Perhaps, I could just type a few lines into a command terminal and the information I need reorganizes itself. Now, I arrive at the whole point of this GitHub repository. Let's explore how we can make this happen. We'll have to keep reading, designing, and talking to people, but perhaps excessive copying-pasting will be a thing of the past, and we won't have to replace the **Ctrl**, **C**, and **V** keys quite so frequently on our keyboard.

A mid-level technical manager once bragged to me that he'd used Excel to its limit, meaning he'd made a table with 65,000 something lines. Let's see if we can hold how we measure our work to a higher standard. 

##Purpose
This dream of "A couple of commands and all my routine work is done" is not something we can accomplish by ourselves. More sophisticated automation requires software development experts. However, you'll be surprised out how much you can accomplish and just how much of your routine work you can automate with a few tools and a little bit of guidance. 

Also, my goal is to help you become a better customer and consumer of IT services. My intent is to help you become more familiar with software concepts, be better able to articulate your requirements to professional software teams, and be able to evaluate whether or not you are working with the right software team so that you don't get taken. 

Last but not certainly not least, I'd like to show you some examples of what is possible with a little automation, so that you and the people who are working for you might be able to focus on the more meaningful (and lucrative) work, while automating the rest. Let's float the idea that sometimes thinking small in terms of automation can be more productive than thinking big. Consider that many Fortune 500 compaonies I've worked with rarely requisition a software development project that's under $250,000, yet I'll attempt to prove to you that a developer can write something in a weekend that will do more to improve the day-to-day productivity and job satisfaction of the typical knowledge worker than these mammoth projects typically do. 

##Getting Started
Before you begin, you will need to install Node.js and a code editor.

1. To install Node.js go to https://nodejs.org/, and download and install either the LTS or the current version. I use the current version.

2. If you don't have a code editor, I recommend installing [Visual Studio Code](https://code.visualstudio.com/).

##Case #1
Throughout the guide, we'll take on case examples the mirror real world problems. In instances, I'll actually build the case from a real project example. 

The first one is simple and should be fairly relatable. We've all probably managed multiple lists of people at some point whether for tracking contacts, action item responsibilites, or simply understanding who's who in an organization. For now, let's pretend that we head up a sales organization in the US. We have a sales person who reports to us in every state. Each sales person has a list of leads in Excel and emails it to us prior to our staff meeting every week. Our assistant Joe puts these into a consolidated spreadsheet before the meeting. It's tedious merging 50 files, and the sales folks can't be bothered to give us consistent inputs despite our efforts to standardize. We're worried Joe is going to quit because he spends 40 hours a week doing tasks like this, and we'd like to be able to offer him more interesting work. 

To prepare this exercise, I needed a mock data set. It just so happens that our "sales folks" will be state governors and our "sales leads" will be state legislators. You can thank me later when you impress everyone at the next cocktail party by being able to name all your state congressmen and women. 

Download the mock data for case 1 by typing in [TODO] into a command terminal. If you're new to the command line see the following steps [TODO]. 

###Begin with the end in mind
Let's define what we want before we dive in. I have a problem solving workflow, but because I want us to have a quick win I won't belabor it yet. I've seen many projects crash and burn because no clear objectives or end game was defined. (Meanwhile, the accountable stakeholders all reported success because there were no objectives to measure against that could prove failure.)

We want a single csv file that contains all of our sales leads from all 50 states. The columns will be:

first name | last name | state | type | birthday | phone | email
--- | --- | --- | --- | --- | --- | --- |
John | Cornyn | TX | Qualified | 2/2/1952 | 202-224-2934 | http://www.cornyn.senate.gov/public/index.cfm?p=ContactForm

For now, let's assume our inputs from sales team will all come to us in exactly this format and the files will be named according to our determined naming convention. We'll write a script that merges all these files into one when Joe types a command into a terminal. 

I know, I know. We'll handle input variance remediation in Part 2. For now, Joe will have to remediate bad inputs himself before he runs a script which saves him about 15 minutes. We feel like we're telling him that the bad news is we can't give him his paycheck this week; meanwhile the good news is that we found some spare change in the sofa to tide him over. However, what's important now is proving to ourselves that we can automate something, and that we can learn how to do it rather quickly.

###Getting our hands dirty
Let's introduce you to Node.js, which is what we'll be using to do our work for us. 

Node.js allows you to run JavaScript on your machine or on a server. Developers call this a **runtime** environment. Prior to Node.js, the typical runtime environment for JavaScript was in the web browser. Node.js powers many commercial and enterprise applications. LinkedIn, for example, uses Node.js. JavaScript is the programming language of the web. Any web application or complex dynamic web site in existence relies on JavaScript. This makes it a compelling choice when choosing a language to learn. 

Node.js comes with several core modules. The one we'll be using is **File System**. This lets us perform file read and write operations on our machine. 

We'll start small by figuring out how to read one file using Node.js. We're taking the following steps: 

1. Import Node's File System module.

2. Read our file and store it to a variable.

3. Use this variable to log the file's contents to the terminal window.

<a name="l1"></a>__Listing 1 - Reading a csv__  | [return to top](#)
```
const fs = require('fs'); //#1
            
var data = fs.readFileSync('data/Texas_GregAbbott.csv', 'utf8'); //#2
console.log(data); //#3
```
If you don't have a lot of experience looking at code, my advice to you, quoting the *Hitchhiker's Guide to the Galaxy*, is __Don't Panic!__. Don't worry about understanding how everything works right away. Simply try to understand the broad strokes regarding what a particular line code achieves. Think of it for now like the appliances you use in your household. We don't worry too much about why the toaster was designed in such and such a way; we know how to plug it in, and we're familiar with the results it produces. That's good enough for us right now. Depending on your objectives, it may make sense to dive deeper, but one thing at a time. 

One of the fundamental design principles in Node is the ability to import and export modules. The Node installation comes with several prepackaged modules called *core* modules. In Step 1, we're importing File System abbreviated as "fs" by "requiring" it. Modules provide us with functions that help us do the things we want to do. 

In Step 2, we call on the readFileSync function that is part of the File System module. This allows us to read files on our hard drive. In the parenthesis, we tell the function the location and name of the file we want to read and the format to encode it in, *'utf8'*. (Don't worry about what this means for now.) In return, the function gives us the contents of the file, putting it into our variable that we've named as **data**. 

In Step 3, we write `console.log(data)` to send the contents of our **data** variable to the terminal window.  

![Listing 1 Results](/case1/doc-img/c1s1.png)

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
####Problem solving workflow
1. Define what you want
2. Draft a conceptual solution
3. Define constraints
4. Scope the work
