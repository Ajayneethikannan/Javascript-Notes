// Range function
function range (start, end, step=1) {
    let arr = [];
    while ((step > 0 && start < end) || (step < 0 && end < start)) {
        arr.push(start);
        start += step;
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
    for (node = list; n > 0 && node; node = node.rest) { // We can use any starting statement, any expression for loop condition, any post update operation
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