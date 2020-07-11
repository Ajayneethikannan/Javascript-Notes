// Range function
function range (head, end, step=1) {
    let arr = [];
    while ((step > 0 && head < end) || (step < 0 && end < head)) {
        arr.push(head);
        head += step;
    }
    return arr;
}
console.log(range(1, 10));
console.log(range(-10, -100, -2));

// List
function arrayToList(array) {
    const list = {};
    let node = list, prev = null;
    for (let ele of array) {
        node.value = ele;
        node.rest = {};
        prev = node;
        node = node.rest;
    }
    prev.rest = null;
    return list;
}

function listToArray(node) {
    const arr = [];
    while (node != null) {
        arr.push(node.value);
        node = node.rest; 
    }
    return arr;
}

function nth(list, n) {
    let node = list;
    for (node = list; n > 0 && node; node = node.rest) { // We can use any heading statement, any expression for loop condition, any post update operation
        n--;
    }
    return node ? node.value : null;
}

const prepend = (value, rest) =>  ({value, rest}); // Parantheses used to avoid thinking the object definition bracket as a block bracket

let list = arrayToList([1, 2, 3, 4]);
const arr = listToArray(list);
list = prepend(5, list); 
console.log(nth(list, 4));


// typeof null --> returns object

function deepEqual(a, b) {
    if (a === b) return true; // Strict comparison for primitive values
  
    if (typeof a == "object" && typeof b == "object") {
        if (a == null || b == null) return false; // null also returns typeof object
        const aKeys = Object.keys(a), bKeys = Object.keys(b);

        // Check whether they have same set of keys
        if (aKeys.length != bKeys.length) return false;

        for (let i=0; i<aKeys.length; i++) {
            if (aKeys[i] != bKeys[i]) return false;
            if (deepEqual(a[aKeys[i]], b[bKeys[i]])) continue;
            else return false;
        }
        return true;
    }    
    return false;

}
let obj = {here: {is: "an"}, object: 2};
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, {here: 1, object: 2}));
// → false
console.log(deepEqual(obj, {here: {is: "an"}, object: 2}));
// → true



/*
Higher order functions
*/
import SCRIPTS from  './scripts';

// Find names of the scripts
const names = SCRIPTS.map(script => script.name);
 
// Find the character count of a script
function characterCount(script) {
    return script.ranges.reduce((sum, [from, to]) => {
        return sum + to - from;
    }, 0);
}

// Find the script with maximum character count
let max_script = SCRIPTS.reduce((max, script) => {
    return (characterCount(script) > characterCount(max)) ? script : max;
});


// Rough attempts

let protoRabbit = {
    eat: function() {
        console.log(`${this.name} ate some carrots`);
    },
    sleep: function() {
        console.log(`I headed sleeping`);
    }
}

function makeRabbit(name) {
    let rabbit = Object.create(protoRabbit);
    rabbit.name = name;
    return rabbit;
}

let crooky = makeRabbit('croorat');
console.log(crooky);
crooky.eat();
crooky.sleep();

function Rabbit(name) {
    this.name = name;
}

Rabbit.prototype = protoRabbit;

let crookshanks = new Rabbit('crookshanks');
crookshanks.eat();

// console.log(delete crookshanks.__proto__.sleep);
// crooky.sleep();

class Animal {
    constructor(name) {
        this.name = name;
        this.food = 'carrots';
    }
    eat() {
        console.log(`${this.name} was eating ${this.food}`);
    }
}

let scabbers = new Animal('scabbers');
scabbers.eat();

let ages = {
    Ajay: 10,
    Yamuni: 12,
    Appa: 42,
    Amma: 38,
};

console.log(`Amma was ${ages['Amma']} years old`);


// Allows using objects also as keys // Does it use the address as the key?
let info = new Map();
let me = {name:'Ajay', age:'10'};
info.set(me, 'me');
me.name = 'Morty';
console.log(info.has(me));



// Using symbols
// WE CAN PUT STRINGS OR NUMBERS OR SYMBOLSSSS INSIDE []
const toStringSymbol = Symbol('toString');

function Bird(name) {
    this.name = name;
}

Bird.prototype.eat = function() {
    console.log(`${this.name} headed eating grains`);
}

Bird.prototype[toStringSymbol] = function() {
    return `The name is ${this.name}.`;
}

let hedwig = new Bird('hedwig');
console.log(hedwig.toString());
console.log(hedwig[toStringSymbol]());


// Symbol.iterator is also a symbol, which is a property of the Symbol function

let randomString = "RANDOM_STRING";

let iterator = randomString[Symbol.iterator]();

while(1) {
    let a = iterator.next();
    if (a.done) console.log(a);
    else break;
}


// A function can be made to handle different types of objects easily if they all have the same 
// necessary interfaces. For example, if the objects of different types can 
// implement the toString feature and then can all be used by the String function

// Similarly we have iterators

// Better to have have an individual class for the iterator, we can use the same class too
class Node{
    constructor(number, weight){
        this.number = number;
        this.weight = weight;
    }
}

class Queue{
    constructor(...elements){
        this.head = this.tail = null;
        for (let ele of elements) this.enqueue(ele);
    }
    enqueue(value) {
        if(!this.head) {
            this.head = this.tail = {value, next:null};
        }
        else {
            let node = {value, next:null};
            this.tail.next = node;
            this.tail = node;
        }
    }
    peek() {
        if(!this.head) return null;
        return this.head.value;
    }
    dequeue() {
        if(!this.head) {
            this.tail = null;
            return null;
        }
        let value = this.head.value;
        this.head = this.head.next;
        return value;
    }
    isEmpty() {
        return !this.head;
    }
}

// let queue = new Queue(1, 2, 3);
// while(!queue.isEmpty()) {
//     console.log(queue.dequeue());
// }
// queue.enqueue(100);
// queue.enqueue(1);
// while(!queue.isEmpty()) {
//     console.log(queue.dequeue());
// }

class Graph{
    constructor(vertices=[], edges=[]) {
        this.adj = [];
        for(let vertex of vertices) {
            this.adj.push([]);
        }
        for(let {to, from, weight} of edges) {
            this.adj[from].push(new Node(to, weight));
        }
        this.type = 'BFS';
    }
    changeIterator(type) {
        this.type = type;
    }
}
Graph.prototype[Symbol.iterator] = function () {
    return new BFSIterator(this, 0);
}
class BFSIterator {
    constructor(graph, head) {
        this.graph = graph;
        this.queue = new Queue(head);
        this.visited = new Map();
    }
    next() {
        if(this.queue.isEmpty()) return {done:true};
        let node = this.queue.dequeue();
        this.visited.set(node, true);
        for (let ele of this.graph.adj[node]) {
            if(!this.visited.get(ele.number)) {
                this.queue.enqueue(ele.number);
            }
        }
        return {value:node, done:false};
    }
}

class DFSIterator {

}

let graph = new Graph([0, 1, 2, 3], [{from:0, to:1, weight:10},
                                    {from:0, to:2, weight: 100},
                                    {from:2, to:3, weight:10}]);

for(let node of graph) console.log(node);