// flattenArray accepts an array of arrays and returns a new array with all values flattened

// Improved recursive approach using spread operator
function flatten(arr) {
    const result = [];
    
    for (const item of arr) {
        if (Array.isArray(item)) {
            result.push(...flatten(item));
        } else {
            result.push(item);
        }
    }
    
    return result;
}

// Modern approach using reduce and spread
function flattenReduce(arr) {
    return arr.reduce((acc, item) => {
        return Array.isArray(item) 
            ? [...acc, ...flattenReduce(item)]
            : [...acc, item];
    }, []);
}

// Native JavaScript flat() method (modern browsers)
function flattenNative(arr, depth = Infinity) {
    return arr.flat(depth);
}

// Stack-based iterative approach (avoids recursion depth limits)
function flattenIterative(arr) {
    const result = [];
    const stack = [...arr];
    
    while (stack.length > 0) {
        const next = stack.pop();
        
        if (Array.isArray(next)) {
            stack.push(...next);
        } else {
            result.push(next);
        }
    }
    
    return result.reverse();
}

// Robust version with input validation
function flattenRobust(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('Input must be an array');
    }
    
    const result = [];
    
    for (const item of arr) {
        if (Array.isArray(item)) {
            result.push(...flattenRobust(item));
        } else {
            result.push(item);
        }
    }
    
    return result;
}

// Test cases
const testArray1 = [1, 2, 3, [4, 5, 6]];
const testArray2 = [1, [2, [3, [4, 5]]], 6];
const testArray3 = [[1, 2], [3, [4, [5, 6]]]];

console.log('Improved recursive:', flatten(testArray1));
console.log('Reduce approach:', flattenReduce(testArray1));
console.log('Native flat():', flattenNative(testArray1));
console.log('Iterative approach:', flattenIterative(testArray1));

console.log('\nDeeply nested array:');
console.log('Original:', testArray2);
console.log('Flattened:', flatten(testArray2));

console.log('\nComplex nested array:');
console.log('Original:', testArray3);
console.log('Flattened:', flatten(testArray3));

console.log('\nEdge cases:');
console.log('Empty array:', flatten([]));
console.log('No nesting:', flatten([1, 2, 3]));
console.log('Mixed types:', flatten([1, 'hello', [2, 'world', [true, null]]]));