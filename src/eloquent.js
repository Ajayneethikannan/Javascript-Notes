// Function definitions are expressions
function greeting(name) {
    return `Hello ${name}!`;
}

// Function calls are also expressions
console.log(greeting('Ajay'));

/* 
Scope: Part of the program where a binding is visible
Bindings declared inside a function are called local bindings
Every time a function is called, new instances of these bindings are created
Bindings declared with let and const are also local to the block they were 
declared in
*/

let x = 10; // global variable
if (true) {
    let y = 30; // local to the block
    let z = 40; // local to the block
    console.log(x + y + z);
}
console.log(x);

/* 
Using var does not make the binding local to the block where it was declared
It just makes the binding local if they were declared inside a function
So it's better to use let and const to make sure they don't cause errors
*/
if (false) {
    var defined = 10;
}
console.log(defined);

/*
A function VALUE can do all the things other VALUES can do
We can use it in arbitrary expressions, and not just call it.
The BINDING which holds a function is also a regular BINDING, and it can 
be assigned new values also
*/
let safeMode = true;
let launchMissile = function () {
    console.log('Korea has launched a missile on USA');
}
if (safeMode) {
    launchMissile = function () {};
}

/*
Function declarations are a little different, they create the function, 
and assign the value to the binding created using the same name
*/
function name() {
    return 'Ajay';
}

/*
Arrow functions help in writing small function expressions less verbosely
*/
const square = x => x*x;
const cube = x => x**3;
console.log(square(3), cube(5));

/*
A recursive function to find a way to reach a number by either multiplying by 3 or 
by adding 5, starting from 1
*/
function find(target) { // scope rule used here
    function findWay(current, history) { // recursion used here
        if (current > target) return false;
        else if (current == target) return history;
        else {
            return findWay(current + 5, `(${history} + 5)`) ||
                   findWay(current * 3, `(${history} * 3)`);
        }
    }
    console.log(findWay(1, "1"));
}
find(13);

/*
A pure function is a function, which when called with the same arguments 
produces the same output
It does not depend on any global bindings whose values might change
*/

/*
Storing sequential data: Done by using Arrays
*/

/*
All javscript values have properties, except null and undefined
Two ways to access properties --> dot operator and square bracket
. --> Name is the literal name of the property
[] --> Expression is evaluated to get the property name
value.x fetches the property of value named “x”, value[x] tries to evaluate the expression x and uses the result, 
converted to a string, as the property name.
Arrays use numbers as property names, and you cannot use dot operators on them
*/


/*
Every object may have function values also as properties, and are called methods
*/
let nonLex = "duh";
console.log(typeof nonLex.toUpperCase);
console.log(nonLex.toUpperCase());

/*
Values of type object are just an arbitrary collection of properties
*/
let day1 = {
    squirrel: false,
    events: ['Reading', 'Walking']
};

/*
Object properties which do not have valid binding names, have to be quoted
*/
let umap = {
    'Hey!': 'A form of greeting',
    'One hundred and twenty five': 125
}

/*
Consider an object as an octopus with tentacles, these represent the bindings
delete operator cuts off a tentacle from such an octopus.
*/

let randomObject = {
    name: 'Ajay',
    greet: 'Hello'
}

delete randomObject.name;

/*
Important methods for objects
*/

Object.keys(randomObject) // return the keys stored in an object in a string array
Object.assign(randomObject, {rock: 'hard'}); // copy values  from one object into another object. (Shallow copy)

/*
Arrays can be thought of octopuses with their tentacles in a neat row :)
*/


/*
Numbers, strings and booleans are immutable --> You cannot change their values
Strings, you can produce new values from them, but you cannot change the characters in an existing string.
*/

/*
Objects are mutable but.
You can change the value of an object
You can change their properties and methods,
that is you can change their content
*/

let journal = [];

const addEntry = (events, squirrel) => journal.push({events, squirrel});

addEntry(["work", "touched tree", "pizza", "running",
          "television"], false);
addEntry(["work", "ice cream", "cauliflower", "lasagna",
          "touched tree", "brushed teeth"], false);
addEntry(["weekend", "cycling", "break", "peanuts",
          "beer"], true);

function tableFor(event, journal) {
    let table = [0, 0, 0, 0];

    for(let i=0; i<journal.length; i++) { // index 0 [no squirrel, no event] 1 [event, no squirrel], 2 [no event, squirrel], 3 [event, squirrel]
        let entry = journal[i], index = 0;
        if (entry.events.includes(event)) index += 1;
        if (entry.squirrel) index += 2;

        table[index] += 1;
    }
    return table;
}

function phi(table) {
    return (table[3] * table[0] - table[2] * table[1]) /
      Math.sqrt((table[2] + table[3]) *
                (table[0] + table[1]) *
                (table[1] + table[3]) *
                (table[0] + table[2]));
}

/*
for loop with of: Loop over elements of the value given after of
*/
function allEvents(journal) {
    let events = [];
    for (let entry of journal) {
        for (let event of entry.events) {
            if (!events.includes(event)) events.push(event);
        }
    }
    return events;
}

// Finally to see the correlations
for (let event of allEvents(journal)) {
    console.log(event + ":", phi(tableFor(event, journal)));
}

/*
Other important array methods

Array.prototype.shift --> Remove first element of array
Array.prototype.unshift --> Add element to first position in array
These 2 are inefficient methods

Array.prototype.indexOf(element, start index) --> return first index of an element in array
Array.prototype.lastIndexOf(element, start index) --> last index of an element

Array.prototype.slice(start, [end]) --> Returns a new array from start index, to end index
Array.prototype.concat --> combine two arrays
*/

/*
Interesting string methods

String.prototype.indexOf(string of any size) --> Search for strings inside a string (not very efficient, may need to use KMP)
String.prototype.trim --> remove whitespaces
String.prototype.repeat --> Repeat a string
*/


/*
... operator --> put after last argument in a function
Called the spread operator
can be made any number of arguments and access them too
*/

function max(...numbers) {
    let result = -Infinity;
    for(let number of numbers) {
        if (result < number) result = number;
    }
    return number;
}

/*
... Can also be used to spread out the array in a function call
Similar to * in python
*/

function printResult (first, second, ...others) {
    console.log(`${first} got first!`);
    console.log(`${second} got second!`);
    console.log('Here are the others ', others);
}

let results = ["Snape", "James", "Sirius", "Lupin", "Tom"] ;
printResult(...results);

/*
There exists only one Math object.
It acts as a namespace for holding all the related functions and properties.
*/

function generateBinary(num) {
    // Get binary representation of that number
    let binary = '';
    if (!num) { console.log('0'); return; }
    let length = Math.floor( Math.log2(num) + 1 );
    // binary = binary.split().reverse().join(); // String does not have reverse method
    let count = 0;
    function backtrack(history) {
        if (count > num) return;
        if (history.length == length) { console.log(history); count++; }
        else {
            backtrack(history + '0');
            backtrack(history + '1');
        }
    }
    backtrack('');
}

/*
Functions are also values
Function bindings hold values of type functions, which can also be invoked
*/

// Arrays --> properties --> functions as properties (methods) --> Objects
// Bindings inside an object called as Properties
// Bindings inside an object whose value types are functions are called methods

/*
Strings, numbers, booleans are immutable
Their values cannot be changed. Their values can be combined to produce new values, but we cannot
modify their values.
Object values can be modified. They are mutable.
By changing their values, I mean we can change their content.
We can change their properties.

Even if two objects have same properties, comparing them returns false.
Javascript does not have a default deep comparision operation
*/

/*
Destructuring examples
*/

// Destructuring array
function determinant([one, two, three, four]) {
    return one*three - two*four;
}
console.log('Determinant', determinant([1, 2, 3, 4]));

// Destructuring objects
function greetPerson({name, language}) {
    if (language == 'ENG') console.log(`Hello ${name}!`);
    else console.log(`Hola ${name}!`);
}
const person = {
    name: 'Ajay',
    language: 'ENG',
    place: 'Coimbatore'
}
greetPerson(person);

/*
JSON


Properties only grasp their value, and do not contain it.
Objects and arrays are stored in computer's memory as sequences of bits,
which store the addresses (the place in memory) of their contents.

These means they dont have a flat representation.
If we want to save the data in a file or send it online, we need all
the data contained in the object in a single representation

So we use Javascript object notation for this.

Serializing the data --> Making the object have a flat description

1. All property names have to be surrounded by double quotes
2. Only simple data expressions are allowed. No function calls, bindings, or anything involving computation
3. Comments not allowed.

*/


/*
HIGHER ORDER FUNCTIONS
*/

/*
Abstractions hide details and give us the ability to talk about 
problems at a higher level
Using abstraction we can focus only on the parts needed at the time.
*/

/*
Plain functions are good for abstraction, but sometimes they fall 
short
*/

/*
Functions that operate on other functions, by taking functions as arguments
or by returning new functions are called as higher order functions

Normal functions - Provide abstraction over normal values (strings, numbers, objects)
Higher order functions - Provide abstraction over ACTIONS.
*/

// Function that creates a new function

function createMultiplier(multiplier) {
    const func = number => multiplier * number;
    return func;
}
console.log(createMultiplier(10)(100));


// Wrap around functions and add new concepts to them 

function noise(func) {
    return (...args) => { // Collect the args here
        console.log('The arguments are ', args);
        let result = func(...args);
        console.log('The result was ', result);
        return result;
    }
}
const min = noise(Math.min);
let minimum = min(1, 2, 3);


// Some higher order functions

// Filtering arrays
import SCRIPTS from './scripts.js';

// SCRIPTS store the scripts information

// Some High order functions

// Filter --> Choose elements from the array based on a conditional action
function filter(array, test_func) {
    let result = [];
    for (let ele of array) {
        if (test_func(ele)) result.push(ele);
    }
    return result;
}
console.log(filter(SCRIPTS, script => script.living)); // return only the living scripts


// Map --> To transform the elements of the array
function map(array, func) {
    let result = [];
    for (let ele of array) {
        result.push(func(ele));
    }
    return result;
}
console.log(map(SCRIPTS, script => script.name));

// Reduce --> A summarising function
function reduce(array, func, start) {
    if (start == undefined) {
        if (array.length) start = array[0];
        else return;
    }
    let current = start;
    for (let ele of array) {
        current = func(current, ele);
    }
    return current;
}

console.log(reduce([1 , 2, 3, 4], (a, b) => a*b, 1));

function characterCount(script) { // Notice the use of destructuring
    return script.ranges.reduce((count, [from, to]) => {
        return count + (to - from);
    }, 0);
}

console.log(SCRIPTS.map(script => characterCount(script)));


// Reduce can also be used to calculate max, min values easily

max = SCRIPTS.reduce((current, script) => {
    current = (characterCount(script) < characterCount(current)) ? current: script;
    return current;
});

console.log(max);


// Some --> Higher order function, which takes a test function and tell you whether that function returns true for any of the elements in the array.

/*
Difference between destructuring and spread operator

Destructuring is used to create new bindings that will point to the respective bindings
STORED INSIDE the object with the same name
Or to create new bindings that will point to the bindings STORED 
INSIDE the array within the same correspoding position according to the indexing.

*/



/*
COMPOSABILITY OF FUNCTIONS

Using higher order functions, you can easily combine the different operations such as
filter, then map, then reduce together. This is called composability.
Immediately after applying map, you can apply the other functions simultaneously
There is proper code separation for each action, instead of using one while loop, and different conditional statements.
Here intermediate values are also represented as coherent units.

Here we have to make the distinction between speed and readability.
Normal code using loops and branching might be much faster sometimes, and will be useful when we are working on large data.
Meaning the less abstract style might be worth the extra speed.

It improves code separation for proper understanding, less code.
*/



/*
A little about unicode characters
Javascript strings use UTF - 16 format
Most the of the unicode characters are represented using a single 16 bit code
Uncommon symbols, such as chinese characters, emojis use 2 sets of 16 bit codes. ( a pair of 16 bit code so 32 bit) to represent
This breaks usual string methods as string.length and string indexing

So preferably use for of loop for looping over strings.
Use String.prototype.codePointAt(index) to get entire characters properly.

*/





/*
The Secret life of objects
*/

function greet() {
    console.log(`Hello my name is ${this.name}!`);
}

let obj = {
    type: 'cat',
    name: 'Ajay'
};

greet.call(obj);

function normalize() {
    console.log(this.coords.map(n => n/this.length));
}

normalize.call({
    coords: [1, 2, 3],
    length: 3
});

