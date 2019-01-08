ADVANCED JAVASCRIPT:
syntax parsers
lexical environment:
    where its written matters
execution contexts:
    there are lot of lexical environments. which one is currently running is managed by execution contexts.
name value pairs and objects:
    name may be defined more than once, but has only one value within a context. name mapped to a value
    An object is a collection of name value pairs
    each value can be a collection of another name value pairs
    
    
JAVASCRIPT AND UNDEFINED:
Creation of an execution context:
    global Object - global execution  context
    this variable is created
    reference to outer environment
    "hoisting" - variables are setup , initial to undefined
UNDEFINED:
    not defined is not the same as undefined
    if a variable is not created , ReferenceError is raised
    which means a is not present in the memory
    if a variable is declared, its allocated a memory space, 
    and is equal to undefined.
    setting deliberately to undefined can become messy as , it will confuse us during debugging.
    
    
EXECUTION CONTEXT PHASES:   
    1.Creation phase: global object, this, reference to outer environment, and hoisting
    2.Then is execution phase:
    running the code line by line
during the creation of the execution context, initially,  even if variables are given values, the initial value is undefined.
and then, the code runs line by line 
during this  time, if the variable is called before its defined, then its value is undefined, there is no chance of reference error if the variables are 
    
SINGLE THREADED , SYNCHRONOUS EXECUTION
    Single threaded:
    Javascript behaves in a single threaded manner - one process at a time
    Synchronous:
    One line at a time

Function Invocation and the execution stack:
    (Very important)
INVOCATION:
    running a function
    done by parenthesis, you are asking the engine to run the function 
    process:
    during the running of the code,
        first the global execution context is created, and space alloted for variables and functions
        this global execution context is pushed into the execution stack
        then , when a function is invoked, the engine creates a new execution context , which again creates a this variable, allots space for its variables and its functions
        this execution context is pushed into the execution stack
        when the function is finishedm it is popped from the execution context
        even when a function is invoking itself, a new execution context is created.
        
FUNCTIONS, CONTEXT AND VARIABLE ENVIRONMENTS:
    Variable environment: where is a variable living?
        
THE SCOPE CHAIN: 
    Every execution context has a reference to the global execution context.
    when we do something with a variable, javascript does more than checking the variable environment
    the reference to the outer environment is always necassarily , the execution context right below in the stack.
    heres where lexical environment plays an important role.
    when you ask for a variable , and the engine is unable to find the variable in the local variable environment, the engine then searches for it in the outer environment , using the reference. This reference depends where the function was defined, which , depending lexically, and not dynamically. 
    when you invoke a function, the engine creates the execution context, and the reference to the outer environment is created, which depends on where the function is physically located. The syntax parser knows where the function is physically written in the javascript file. 
    Now, if the var is not present in the outer environment, then the variable is searched for,  in the reference to the outer environment, of the current outer environment, and this chain keeps on going down. This is called the Scope Chain.

SCOPE, ES6, and let:
    SCOPE:
        where a variable is available in your code. 
    let: 
        new way of declaring variables in ES6:
        allows block scoping in javscript

WHAT ARE ARROW FUNCTIONS?
    arrow function are shorthand for an anonymous function that keep the current context

WHAT ARE COMPUTED PROPERTY NAMES IN JAVASCRIPT?
    obj[name] = value;
can be set as 
    return {
    [name] = value
    }
    
WHAT ABOUT ASYNCHRONOUS CALLBACKS?
    Think about the javascript engine itself
    rendering engine, 
    javascript engine, 
    HTTP request engine, 
    all are interconnected, to the javascript engine

similar to the execution stack, there is an event queue, 
    for eg, if someone clicks, a click event is added to the event queue, 
    when the stack is empty , the javascript engine checks the event queue periodically, and it creates an execution context.
    IMPORTANT: 
    the event queue is checked only after the execution stack is empty.
    but, asynchronouly events can be added when any code is running
Asynchronous callbacks are essentially whats happening the execution stack
Thus the javascript engine handles the asynchronous events synchronously.


Dynamic typing:
   You dont tell the engine what type of data it is holding, 
   Then the javascript engine will dynamically decide the type of the data. 
There are 6 primitive types: 
WHAT ARE PRIMITIVE TYPES:
    A single value (doesnt include objects)
1 undefined  you shouldnt set a value to this
2 null represents lack of existence
3 boolean 
4 number - only floating point numbers
5 string a sequence of characters, yes this is a primitive in javascript
6 symbol used in ES6 


OPERATORS:
    A special function that is written differently 
than other functions 
Takes in two inputs, returns one output.

OPERATOR PRECEDENCE AND ASSOCIATIVITY are also important


COERCION:
converting a value from one type to another

IMPORTANT :
Number(false) = 0
Number(null) = 0
Number(undefined) = NaN - not a Number
Boolean(undefined) = false
So coercion is dangerous
Strict comparisons avoid coercion


Objects and functions are very similar to each other
So discussed together.
Objects are collection of name value pairs
Objects contain properties and methods.
    only reference to the value is stored
    eg
    person['firstName'] = 'Ajay';
    memory is alloted for 'Ajay' and its location is stored in person['firstName'] 
    

WHAT IS A NAMESPACE:
    A container for variables and functions
    typically used to keep variables and functions of the same name separate
FAKING  NAMESPACES IN JAVASCRIPT:
    By enclosing the functions and variables in objects


FUNCTIONS ARE OBJECTS:
    
    FIRST CLASS FUNCTIONS:
        everything you can do with other functions, can be done with it.
    Function: a special type of object, and has some special properties. 
    primitives, objects, and functions can be attached to it 
    
    
    properties:
        name(optional)
        code(special property where code is stored, it can be invoked meaing called with braces())
    How to think about functions:
        It is an object , with special properties, such as name and code attached to it. The code property is invokable. 
        Primitives, objects and functions can be attached to it. 
THE IMPLICIT BINDING RULE:

        the implicit binding rule says
that it’s that object that should be used for the function call’s this binding. 

Problems caused by implicit this binding:
    When an implicitly bound function loses that binding,
    which usuall means it falls back to the default binding of the global object or undefined ,  depending on strict mode.


BY VALUE, AND BY REFERENCE:
    if its a primitive value in javascript, a copy of the primitive value is placed in a separate location in the memory. This is called passing by reference. 
    if its an object, even when its passed to a function ,
    both the variables point to the same value in memory. 
    this is called passing by reference. 

MUTATE: to change something 
IMMUTABLE: cannot be mutated , cannot be changed


ALL PRIMITIVE TYPES ARE BY VALUE, ALL OBJECTS ARE BY REFERENCE - VERY IMPORTANT

OBJECTS, FUNCTIONS and this:

When an execution context is created, 
    variable environment,
    reference to outer environment,
    and the keyword this

When you are just invoking the function, this variable points to the window object, also the global execution context, even variables for the global execution context can be created.


    
Javascript can create arrays of anything
even functions can be stored in arrays. 


ARGUMENTS:
    When you execute a function, 
        the execution context sets up ,
        variable environment, 
        this,
        outer environment,
        and also a special keyword called arguments
        arguments an array of all the values passed. 
        arguments.length, for example can be used. 
Spread is also present in javascript, similar to python
rg: function(name, ...other)
The parameters that are passed to the function, accessible through this variable.

even if all the parameters are not passed , the variables are assigned value, undefined during hoisting,
unlike other functions
You can skip passing of arguments.


This allows for powerful features, including default values. 

SYNTAX PARSERS:
    converts code into something the computer can understand,
    it decodes the code character by character, guessing the syntax, and even making changes.

DANGEROUS ASIDE semicolon insertion:

AUTOMATIC SEMICOLON INSERTION:
    anywhere where the compiler expects a semi colon, the compiler adds a semicolon, and this can cause un debuggable errors. 
    mainly after return if it does not identify a semi colon, 
    it will automatically add before the answer , which in this case may  be present in the previous line. 


WHITESPACE:
invisible characters that create literal space in the code 

IMMEDIATELY INVOKED FUNCTION EXPRESSION:
    iife:
difference between defining functions :
function greet(name)
{  
    console.log('hello' + name);
}

var greetFunc = function(name)
{
    console.log('Hello' + name);
    
}

greetFunc('John');

DIFFERENCE:
normally defined functions are created during creation of execution context itself,
but the latter is put in memory only when the line is reached during execution.


THIS IS AN IIFE: 
var greetFunc = function(name)
{
    console.log('Hello' + name);
    
}();
creates the function object on the fly, and then the function is invoked, and then the result is used to set the value of the greeting variable,

Whats the use of this IIFE?


ANYTHING INSIDE PARANTHESES IN JAVASCRIPT IS AN EXPRESSION. 
functions can also be written inside the parantheses. 


UNDERSTANDING CLOSURES:
    When we create a function, which in turn returns a function, and if we use a variable which was in the outer function but not declared in the inner function, still the inner function is able to use the variable defined outside,even though the execution context of the outer function would have been removed from the execution stack. 
    So how does the inner function still able to refer to the outer variables? 
    Answer: 
     Because our inner function has a reference to the outer environment, and in this case, even though the execution context has gone way, the memory space is still existing,
this is called closure. This allows our function to use the  variables defined outside. 


when we invoke the functions in the array as in the example ,those  functions still have access to the variable of the outer environment , as they are still stored in the memory. 
when we invoke the functions in the array as in the example ,those  functions still have access to the variable of the outer environment , as they are still stored in the memory. 






SCOPE AND CLOSURE:
    Javascript is in fact a compiled language.But it is not compiled that well in advance. 

Roughly three steps are involved in compilation: 
    Tokenizing: dividing the code into chunks
    Parsing: Forming a stream of tokens and coverting them into an AST(Abstract Syntax tree)
    Code generation: Machine Code is generated with the ASTs.
    

Any snippet of Javascript code has to be compiled (usually right before) its execution!
    
Understanding scope:


FUNCTION FACTORIES: 
    every time a function is called a new execution context is created , and new memory space is set up for the execution context 


CLOSURES AND CALLBACKS: 
    
   CALLBACK FUNCTIONS: 
     a function which you give to another function to be run, when the other function is finished is called callback function.

     
function statements(declarations) vs function expressions in javascript


function declarations are hoisted whereas function expressions are not
function expressions can have anonymous name.

named function expressions are used when you want to refer to the function inside the same function (for example recursion)


Function currying:
        The process of binding a function along with a default value is called as function currying
Every function has three methods which are 
call 
apply 
bind


bind creates a copy of the existing function  and assigns the this variable of the function internally


IIFEs
Immediately invoked function expressions
   If you try to declare a function as an expression just like you would do with primitives or objects, the syntax parser will consider it as an Error
3;  valid statement
{ name: 'ajay'}; valid statement
function()
{
console.log("unexpected token")}; syntax parser raises an error
not a valid javascript expression

how to trick the syntax parser to think its not a function expression

wrap the function in parantheses
(function()
{
    console.log('no error');
})

creates a function object on the fly
functional programming

Classical vs prototypical inheritance
    one object gets access to the properties and methods of another object
classical inheritance
    Very verbose, and large
prototypal inheritance
    very flexible, 
    extensible
    easy to understand

Prototype Chain
    Where we have access to a specific property or a function in memory in an object 
    Objects can share the same prototype - their proto points in the same place

Reflection:
    An object can look at itself, listing and changing its properties and methods

Building objects
function construtors , new and the history of javascript
    javascript was written for the browsers ,
    the name javascript came to attract the java developers
    main reason marketing
    new keyword was originally in java,
    so was introduced to cater to the java developers
    
function constructors and the keyword new

The working of new: 
when new is read by the syntax parser , immediately an empty new object is created , similar to how var a = {};
and the function which follows the variable is called, with setting the this variable in the function as the empty object

as long as you dont return anything in the constructor function ,
we get the new object returned


Function constructor
A normal function which is used to create objects
The this variable points to a new empty object and that object is returned from the function automatically


Function constructors and prototype:

Every function has a prototype object which has a property called constructor which points to the function object itself


Important
example

function objmaker()
{
    this.name = 'ajay';
    this.location = 'IITR';
}

let obj = new objmaker();

obj.__prpto__  == objmaker.prototype
obj.__proto__.constructor == objmaker.prototype.construtor  
objmaker.prototype.constructor == objmaker; true


Since Object is a function (works as a constructor) It must have been made using Function constructor
Therefore Function.prototype = Object.__proto__



Since Function is a function object , it must have been made  by the Function constructor itself
Therefore, 
Function.__proto__.constructor == Function
Function.__proto__ == Function.prototype




For ease of thinking while writing code, 
    whenever you modify the prototype prototype property of a function, you are giving those properties and functions to the objects created using this constructor function 
    essentially instances of that type of object

Whenever you apply properties on a primitive data type js converts the primitive into an object , essentially wraps it around in an object of that type

ES6 and classes
    classes in other programming languages are not objects

Syntactic sugar 
    A different way to type something that doesnt change how something works under the hood

Every javascript engine implements the strict mode differently

Learning from others good code is an open source  education


Deep dive into the source code of jQuery

does not add many features to js but makes it syntactically easier and also uniform across all the browsers

allows easier manipulation of the DOM

greetr framework

when given a first name, last name, and optional language, it should generate formal and informal greetings

support english and foreign languages

reusable library framework

easy to type structure

and also support jQuery

Lessons from jQuery
    creating chainable methods
    
    using aliases to simplify the code 
    
    enable creating objects without the new keyword

    

Structuring Safe Code:
    exposing only what we need to the global environment
    
