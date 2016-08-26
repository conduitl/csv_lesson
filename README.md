# Spreadsheet Automation with Node File System
#### A guide for those interested in learning a little code to speed up their workflow

* [Listing 1 - Reading a csv](#l1)
* [Listing 2 - Copying a file](#l2)
* [Listing 3 - Combining two files](#l3)
* [Listing 4 - Reading a directory](#l4)

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
