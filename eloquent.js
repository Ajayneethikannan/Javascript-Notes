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