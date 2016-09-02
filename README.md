# Spreadsheet Automation with Node File System
#### A guide for those interested in learning a little code to speed up their workflow
Chances are that you perform or delegate a lot of tasks that could be automated. I know I do. I'm tired of doing a bunch of boring, tedious work just so I can put together all the information I need to solve whatever big, challenging, interesting problem I've been hired to solve. I spend a lot of time manipulating spreadsheets and so do my colleagues. Let's look at how we can automate some common tasks so we can free up our time for creative problem solving, learning, and other intellectual work that's both rewarding and important to moving ahead in our career. 

We're not all going to be coders and nor should we be. But we all consume IT services and many of us over the course of our careers either have or will requisition an IT project. The intent of this guide is to familiarize you with some software concepts so you can think about how software could automate your workflow and help you and the people who work for you focus on the challenging tasks and decision making that they've been educated, trained and groomed for. 

Along the way, you may find that you can save several (or perhaps even hundreds) of hours using the tools and code contained in this guide. 

If you are interesting in becoming a coder or already well on your way, you may use this guide to learn a little bit more about Node.js. I will point you to other coding resources throughout the guide that supplement the topic at hand. I also intend on writing more articles that get into the nitty gritty of some ways to use Node.js. Feedback and contributions to this repository are also most welcome. 

If you want to dive straight into the code examples, use the table of contents below.
##Table of Contents
###Topics
* [Reading files](#t1)
###Code Listings
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
This dream of "*a couple of commands and all my routine work is done*" is not something we can accomplish by ourselves. More sophisticated automation requires software development experts. However, you'll be surprised out how much you can accomplish and just how much of your routine work you can automate with a few tools and a little bit of guidance. 

Also, my goal is to help you become a better customer and consumer of IT services. My intent is to help you become more familiar with software concepts, be better able to articulate your requirements to professional software teams, and be able to evaluate whether or not you are working with the right software team so that you don't get taken. 

Last but not certainly not least, I'd like to show you some examples of what is possible with a little automation, so that you and the people who are working for you might be able to focus on the more meaningful (and lucrative) work, while automating the rest. Let's float the idea that sometimes thinking small in terms of automation can be more productive than thinking big. The Fortune 500 companies I've worked with rarely requisition a software development project that's under $250,000, yet I'll attempt to prove to you that a developer can write something in a weekend that will do more to improve the day-to-day productivity and job satisfaction of the typical knowledge worker than these mammoth projects typically do. 

##Getting Started
Before you begin, you will need to install Node.js and a code editor.

1. To install Node.js go to https://nodejs.org/, and download and install either the LTS or the current version. I use the current version.

2. If you don't have a code editor, I recommend installing [Visual Studio Code](https://code.visualstudio.com/).

#Case #1 - The 50 States Sales Organization
Throughout the guide, we'll take on case examples that mirror real world problems. In instances, I'll actually build the case from a real project example. 

The first one is simple and should be fairly relatable. We've all probably managed multiple lists of people at some point whether for tracking contacts, action item responsibilites, or simply understanding who's who in an organization. For now, let's pretend that we head up a sales organization in the US. We have a sales person who reports to us in every state. Each sales person has a list of leads in Excel and emails it to us prior to our staff meeting every week. Our assistant Joe puts these into a consolidated spreadsheet before the meeting. It's tedious merging 50 files, and the sales folks can't be bothered to give us consistent inputs despite our efforts to standardize. We're worried Joe is going to quit because he spends 40 hours a week doing tasks like this, and we'd like to be able to offer him more interesting work. 

To prepare this exercise, I needed a mock data set. It just so happens that our "sales folks" will be state governors and our "sales leads" will be state legislators. You can thank me later when you impress everyone at the next cocktail party by being able to name all your state congressmen and women. 

Download the mock data for case 1 by typing in [TODO] into a command terminal. If you're new to the command line see the following steps [TODO]. 

##Begin with the end in mind
Let's define what we want before we dive in. I have a problem solving workflow, but because I want us to have a quick win I won't belabor it yet. I've seen many projects crash and burn because no clear objectives or end game was defined. (Meanwhile, the accountable stakeholders all reported success because there were no objectives to measure against that could prove failure.)

We want a single csv file that contains all of our sales leads from all 50 states. The columns will be:

first name | last name | state | type | birthday | phone | email
--- | --- | --- | --- | --- | --- | --- |
John | Cornyn | TX | Qualified | 2/2/1952 | 202-224-2934 | http://www.cornyn.senate.gov/public/index.cfm?p=ContactForm

For now, let's assume our inputs from sales team will all come to us in exactly this format and the files will be named according to our determined naming convention. We'll write a script that merges all these files into one when Joe types a command into a terminal. 

I know, I know. We'll handle input variance remediation in Part 2. For now, Joe will have to remediate bad inputs himself before he runs a script which saves him about 15 minutes. We feel like we're saying, "We can't give you your paycheck this week, here's some spare change we found in the sofa." However, what's important now is proving to ourselves that we can automate something, and that we can learn how to do it rather quickly.

##Getting our hands dirty
Let's introduce you to Node.js, which is what we'll be using to do our work for us. 

Node.js allows you to run JavaScript on your machine or on a server. Developers call this a **runtime** environment. Prior to Node.js, the typical runtime environment for JavaScript was in the web browser. Node.js powers many commercial and enterprise applications. LinkedIn, for example, uses Node.js. JavaScript is the programming language of the web. Any web application or complex dynamic web site in existence relies on JavaScript. This makes it a compelling choice when choosing a language to learn. 

Node.js comes with several core modules. The one we'll be using is **File System**. This lets us perform file read and write operations on our machine. 

###Reading files
<a name="t1"></a>
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
If you don't have a lot of experience looking at code, my advice to you, quoting the *Hitchhiker's Guide to the Galaxy*, is __Don't Panic!__. Don't worry about understanding how everything works right away. Simply try to understand the broad strokes regarding what a particular line of code achieves. For now, try to look at the code with the same attitude we have regarding the appliances in our household. We don't worry too much about why the toaster was designed in such and such a way. We know how to plug it in, and we're familiar with the results it produces. That's good enough for us right now. Depending on your objectives, it may make sense to dive deeper, but one thing at a time. 

One of the fundamental design principles in Node is the ability to import and export modules. The Node installation comes with several prepackaged modules called *core* modules. In Step 1, we're importing File System abbreviated as "fs" by "requiring" it. Modules provide us with functions that help us do the things we want to do. 

In Step 2, we call on the `readFileSync` function that is part of the File System module. This allows us to read files on our hard drive. In the parenthesis, we tell the function the location and name of the file we want to read and the format to encode it in, `'utf8'`. (Don't worry about what the encoding means for now.) In return, the function gives us the contents of the file, putting it into our variable that we've named as `data`. 

In Step 3, we write `console.log(data)` to send the contents of our `data` variable to the terminal window.

Now it's time to run our little program. Open a command terminal and navigate to the directory with the **c1s1.js** file. Type `node c1s1.js`. 

You will see the following results:

![Listing 1 Results](/case1/doc-img/c1s1.png)

To decode the results logged to the terminal, understand that:

first name | last name | state
--- | --- | ---
John | Cornyn | TX

in a csv file translates into 

```
first name,last name,state
John,Cornyn,TX
```

in a plain text file.

This plain text representation is what we see in the terminal window.

###Writing files

We're moving toward our goal by taking little steps. The next one is to explore how we can use Node to create new files. 

To do this, we write one new line of code: 
`fs.writeFileSync('output/copyofTexasLeads.csv', data);`

We also modify our `console.log`. We'll be using our `console.log`s to tell us what our programs are doing as they execute. 

Our program now looks like this:

<a name="l2"></a>__Listing 2 - Copying a file__  | [return to top](#)
```
const fs = require('fs');

var data = fs.readFileSync('data/Texas_GregAbbott.csv', 'utf8');
fs.writeFileSync('output/copyOfTexasLeads.csv', data); //new
console.log('File written to: ' + 'output/copyOfTexasLeads.csv'); //updated
```

`writeFileSync` is another function provided to us by the File System module. In the paranthesis, we tell it 1) location and the name of the file we want created 2) the contents (data) we want this file to contain.  

Type `node c1s2.js` in the command terminal to run the program. You'll see: 

![Listing 2 - Command Terminal](/case1/doc-img/c1s2-a.png)

In your file explorer, navigate to the path that we specified for file creation. Look! There's a new file there. 

![Listing 2 - Newly Created File](/case1/doc-img/c1s2-b.png)
Now lets read two files and write the contents of both of the files into a new one. We'll rename the variable where we are storing the contents of the first file to 'tx', and we'll add a line to read a second file, storing it's contents in a variable labeled 'nm'. 

In the next line, we'll add the contents of the two files together. This is called concatenation. Note that if we were adding two numbers together we would get a sum e.g. 1 + 1 = 2, but when adding strings of characters to together the results are a concatenation of the two strings e.g. "Hello" + "World" = "HelloWorld". 

We store the concatenated file contents into `consolidatedData` and write the file to our hard drive the same way as before. 

<a name="l3"></a>__Listing 3 - Combining two files__  | [return to top](#)
```
const fs = require('fs');

var tx = fs.readFileSync('data/Texas_GregAbbott.csv', 'utf8');
var nm = fs.readFileSync('data/NewMexico_SusanaMartinez.csv', 'utf8');

var consolidatedData = tx + nm;
fs.writeFileSync('output/consolidated.csv', consolidatedData);
console.log('File written to: ' + 'output/consolidated.csv');
```
As before, type `node` followed by the name JavaScript file you wish to execute in the command terminal to run the program. In our example, it's `node c1s3.js`.

We open the consolidate.csv file and this is what we get: 

![consolidate.csv](/case1/doc-img/c1s3.png)

You can quickly locate where the contents of the second file begin by finding its header row. Of course, we don't want additional header rows in the middle of our table. We will do something about these a little bit later. 

> Notice that we could accomplish the following requirement "take 50 files in a directory, read the contents, and write a new file that combines those contents into a new file" using only the methods we've applied so far. (For the sake of argument, let's assume we've already solved the excess header row problem.) For each of the files, we could add another line `var ca = fs.readFileSync('data/California_JerryBrown.csv` and then add ` + ca` to the `consolidatedData` variable. We **will not** do this. If we did this, our process wouldn't work if one of our input files was named slightly differently than what is hardcoded in our program. Our process wouldn't handle any additional input files. Moreover, it's simply not efficient to write a line of code for every single file. 

> I suspect that many organizations get application code that's written in such an inflexible way. Hopefully our example is an exaggerated version of this, but maybe not. Consider that a project management approach that heavily favors **meeting requirements** as the overriding success criteria for viable product without testing product quality based on other factors might overlook this. Ever wonder why you have to submit a ticket to your IT department if you want such and such a system to do something slightly different. Even when they're willing to play ball, perhaps you suffer through a long ordeal to have your "enhancement" made. 

###Reading directories

We don't want to have to hardcode file names in our program so let's find out how to read contents of a folder. We will use the File System function `readdirSync`. We write `var filenames = fs.readdirSync('data');`. We just have to tell this function the location of our folder in the parenthesis. We declare the variable `filenames` to store the value that `readdirSync` returns to us. 

Notice we've added two forward slashes `//` in front of the rest of the code. This turns it into comments that Node will not read. We've done this because we want to isolate the new function in our program and better understand how it works.

<a name="l4"></a>__Listing 4 - Reading a directory__  | [return to top](#)
```
const fs = require('fs');

var filenames = fs.readdirSync('data');
console.log(filenames);
//var tx = fs.readFileSync('data/Texas_GregAbbott.csv', 'utf8');
//var nm = fs.readFileSync('data/NewMexico_SusanaMartinez.csv', 'utf8');
//
//var consolidatedData = tx + nm;
//fs.writeFileSync('output/consolidated.csv', consolidatedData);
//console.log('File written to: ' + 'output/consolidated.csv');
```

Run the program: `node c1s4.js`.

Our results:
![Listing 4 output](/case1/doc-img/c1s4-a.png)

> If you already know a little bit about Node, you may have noticed that we're using `readdirSync` and `readFileSync` rather than `readdir` and `readFile`. We're using the synchronous versions of these functions for simplicity sake. The beauty of Node is that it's asynchronous. Node can read a giant file that takes several minutes to process and in the meantime accomplish several other tasks. Other envionments tend to wait until a single process is finished before another begins. This means a single long running progress can put everything else on hold. 

> Writing asynchronous code is more complex, which is why we are sticking to the synchronous versions of these function for now.

The `readdirSync` function returns to us the file names in the form of an array. 

####Arrays

An array is a common data type. An array object contains a collection of indexed elements. Each of these elements can be retrieved using it's index number. 

![The array data type](/case1/doc-img/c1s4-b.png)

To retrieve data from an array, we use the index number for the element we want to retrieve. The name of the csv file for California is stored in the first index. Index numbers start at 0, so to retrieve "JerryBrown_California.csv" we will write the following code `filenames[0]`.

In the next listing, we've written code that explores how this works.

<a name="l5"></a>__Listing 5 - Understanding how directory names are stored__  | [return to top](#)
```JavaScript
const fs = require('fs');

var filenames = fs.readdirSync('data');
console.log(filenames);
// #1 Log to console to demonstrate how elements are retrieved from an array
console.log( 'Number of files in directory: ' + filenames.length );
console.log( '  -Index [0] contains ' + filenames[0] );
console.log( '  -Index [1] contains ' + filenames[1] );
console.log( '  -Index [2] contains ' + filenames[2] ); 
// #2 Use array retrieval rather than hardcoded values for file names
var ca = fs.readFileSync('data/' + filenames[0], 'utf8'); // California added to example
var nm = fs.readFileSync('data/' + filenames[1], 'utf8'); // 'data/' filepath is concatenated to array element
var tx = fs.readFileSync('data/' + filenames[2], 'utf8');
// #3 Everything else works as before
var consolidatedData = ca + nm + tx; // added California (ca) 
fs.writeFileSync('output/consolidated.csv', consolidatedData);
console.log('File written to: ' + 'output/consolidated.csv');
```

Run the program: `node c1s5.js`.

![Listing 5 Results](/case1/doc-img/c1s4-b.png)

1. We add the console logs simply to demonstrate retrieval from the array. In the first of these logs, you see `filenames.length`. Every array has a `length` property that tells you the number of elements it contains.

2. We retrieve the filenames from the array, using concatenation to attach them to the `'data/'` file path. These are provided to the `readFileSync` functions. In programming, inputs supplied to functions are referred to as **arguments**. For each `readFileSync` function, we've provided two arguments in the parenthesis. In the first `readFileSync`, the first argument is `'data/' + filenames[0]`, and the second is `'utf8'`.

3. The rest of our code has the same pattern as before. Notice that we've added California for consolidation into our output file. 

### Making our program scale

Declaring a variable for every file we wish to read is not a solution that can scale. To get ready to scale, we'll introduce the addition assignment operator `+=`. This operator says "Give the current value of this variable, add the following to it, and then give me back the results. In other words, instead of writing `x = x + 1`, we can write `x += 1`. In the next listing, we leverage `+=` on our `consolidateData` variable. First, we need to declare our `consolidatedData` as an empty string: `var consolidatedData = '';`, otherwise we be telling our program to add a value to something that is undefined.

<a name="l6"></a>__Listing 6 - The addition assignment operator__  | [return to top](#)
```JavaScript
const fs = require('fs');
var filenames = fs.readdirSync('data');
// #1 Initialize variable as empty string
var consolidatedData = '';

console.log(filenames);
// #2 Remove console.logs for array retrieval demonstration
// #3 Use addition assignment operator and remove variable declarations
//    previously used to store each file
consolidatedData+= fs.readFileSync('data/' + filenames[0], 'utf8');
consolidatedData+= fs.readFileSync('data/' + filenames[1], 'utf8');
consolidatedData+= fs.readFileSync('data/' + filenames[2], 'utf8');
// #4 Remove line below as it is no longer necessary
// var consolidatedData = ca + nm + tx;
fs.writeFileSync('output/consolidated.csv', consolidatedData);

console.log('File written to: ' + 'output/consolidated.csv');
```
Run the program `node c1s6.js`, and you'll see that it consolidates the files as before. We haven't expanded what the program can do yet, but we're about to. 

Learn more about [Assignment Operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Assignment_Operators).

Now, we're ready for a big step. No matter how many files are in our folder, whether it's 10 or 10,000, we want our program to be able to read them all and consolidate them into one file in our output folder. The next listing does precisely that.

The key is the forEach loop.

<a name="l7"></a>__Listing 7 - Consolidating the entire directory at once__  | [return to top](#)
```JavaScript
const fs = require('fs');

var filenames = fs.readdirSync('data');

var consolidatedData = '';

console.log(filenames);
// Loop through the array and for each file, read it and add the contents to consolidatedData
filenames.forEach( file => {
  consolidatedData+= fs.readFileSync('data/' + file, 'utf8');
});

fs.writeFileSync('output/consolidated.csv', consolidatedData);

console.log('File written to: ' + 'output/consolidated.csv');
```

Translated into English, the loop syntax says the following: For each element in the `filenames` array, refer to that element as `file` and then perform all operations on it that are specified in the curly braces `{}` following the arrow `=>`. The operations specified inside the loop are the same as what we specified in the previous listing, but we no longer have to repeat ourselves `n` number of times. Inside the loop `file` refers to the same file name in the array that `filename[n]` did in the previous listing. 

> As I stated previously, my intent in this guide is to focus on problem solving and solution design, demonstrating the power of automation using code and exploring software development concepts. There is much to explore about the loop syntax and there are various ways to write loops. I do not wish to deter the reader who is more interested in conceptual design and utility, rather than code mechanics. For this reason, from here on out, I'll simply translate the code logic into English and refer to reference materials for the reader who wishes to dive deeper.  

We are close to meeting our initial objective of consolidating all of the files in our directory into one output file. In fact, we are able to consolidate all the files, but we have a quality issue. The entire contents of every file, including the header row, is merged in our consolidated file. We don't want the header row repeated 50 times in our output. 

We will instruct the program as follows. If the file being read is the first one, push its contents into the consolidated file as is. For all the remaining files, remove the first row (the header row) and then push the rest into the consolidated file.

This will be the first time we actually manipulate the contents of the files as we process them. To prepare ourselve, we'll figure out how to get the program to tell us more about what is happening as its happening, especially as it loops through the files in our directory. 

This listing doesn't change anything regarding how the files are processed. The additions simply get the program to talk to us a little bit more. 

<a name="l8"></a>__Listing 8 - Examining loop execution__  | [return to top](#)
```JavaScript
const fs = require('fs');

var filenames = fs.readdirSync('data');

var consolidatedData = '';

filenames.forEach( (file, index, array) => { //#1
  if (index === 0) { //#2
    console.log( 'Files in array: ' + array.length ); //#3
    console.log( array ); //#4
  }
  console.log( '-Processing index [' + index + '] containing ' + file ); //#5

  consolidatedData+= fs.readFileSync('data/' + file, 'utf8');
});

fs.writeFileSync('output/consolidated.csv', consolidatedData);

console.log('File written to: ' + 'output/consolidated.csv');
```

1. This is a more difficult JavaScript pattern that takes some getting use to. The `forEach` function takes another function as an argument e.g. `filenames.forEach( doSomething )` where `doSomething` is a function. In this case the `(file, index, array) => {...}` is our function. Before the arrow `=>`, we have three parameters. The first one, `file`, refers to the array element being processed in the `filenames` array as before. `index` refers to the current index being processed in the array. `array` refers to the entire array itself. Learn more about [Arrow Functions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions).

2. We use the `index` parameter to tell us whether or not we are reading our first file. If the `index` is `0`, then we are. 

3. We use the `array` parameter to tell us the length of the array. This is valuable information and will be put to use later.

4. We also use the `array` parameter to log the contents of the array, which is the list of files in our folder. It makes sense to do this only one time. 

5. Lastly, we get the program to tell us which `index` is currently being process and which `file` that index corresponds to.  

Run the program: `node c1s8.js`.

We're ready to get the program to do some more heavy lifting. We'll add an `else` block that tells the program how to parse all the input files following the first (index: 0). 

<a name="l9"></a>__Listing 9 - Manipulating the file data__  | [return to top](#)
```JavaScript
const fs = require('fs');

var filenames = fs.readdirSync('data');

var consolidatedData = '';

filenames.forEach( (file, index, array) => {
	var data = fs.readFileSync('data/' + file, 'utf8');
	
  if (index === 0) {
    console.log( 'Files in array: ' + array.length );
    console.log( array );
  } else { //#1
		data = data.split('\r\n'); //#2
		data.shift(); //#3
		data = data.join('\r\n'); //#4
	}
  console.log( '-Processed index [' + index + '] containing ' + file );

  consolidatedData+= data;
});

fs.writeFileSync('output/consolidated.csv', consolidatedData);

console.log('File written to: ' + 'output/consolidated.csv');
```

1. The `else` block executes when the `if` statement isn't met, in this case where the `index` does not equal `0`. 

2. Inside the else, we split the rows of the csv file apart. Our `readFileSync` gives us the file contents as one big chunk of text. The comma separated values (csv) format separates rows with a `\r\n` designation. `\r` is for carriage return and `\n` is for new line. Individual cells within each row are separated with commas. The `.split('\r\n`) function call returns to use an array of rows. 

3. We take the array of rows and peal off the first one using `shift()`. 

4. Then we merge the array back together into a string that's in a valid csv format.

We've now met our objective: *consolidate all the files in a specified directory into one output file*. Copy additional files from the `_source-data` folder into the `data` folder and run the program: `node c1s9.js`. Try it with 10 files. Then with 20. You'll see that it handles additional files without additional effort on our part. 

When you have the files you want to consolidate in the the `/data` directory, run the program with `node c1s9.js`. You'll find the consolidated output file in the `output` directory. 

####Problem solving workflow
1. Define what you want
2. Draft a conceptual solution
3. Define constraints
4. Scope the work
