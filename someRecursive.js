// someRecursive function accepts an array and a callback.
// Returns true if ANY single value in the array returns true when passed to the callback

// Improved recursive version with better variable names
function someRecursive(array, callback) {
    // Base case: empty array
    if (array.length === 0) return false;

    // If current element passes the test, return true
    if (callback(array[0])) return true;

    // Recursively check the rest of the array
    return someRecursive(array.slice(1), callback);
}

// Optimized version using index to avoid array slicing
function someRecursiveOptimized(array, callback, index = 0) {
    // Base case: reached end of array
    if (index >= array.length) return false;

    // If current element passes the test, return true
    if (callback(array[index])) return true;

    // Recursively check next element
    return someRecursiveOptimized(array, callback, index + 1);
}

// Iterative version (for comparison)
function someIterative(array, callback) {
    for (let i = 0; i < array.length; i++) {
        if (callback(array[i])) return true;
    }
    return false;
}

// Version that also returns the first matching element and its index
function someRecursiveWithDetails(array, callback, index = 0) {
    if (index >= array.length) {
        return { found: false, element: null, index: -1 };
    }

    if (callback(array[index])) {
        return { found: true, element: array[index], index: index };
    }

    return someRecursiveWithDetails(array, callback, index + 1);
}

// Version using helper function pattern
function someRecursiveHelper(array, callback) {
    function helper(arr, cb, i = 0) {
        if (i >= arr.length) return false;
        if (cb(arr[i])) return true;
        return helper(arr, cb, i + 1);
    }

    return helper(array, callback);
}

// Robust version with input validation
function someRecursiveRobust(array, callback) {
    if (!Array.isArray(array)) {
        throw new Error('First argument must be an array');
    }

    if (typeof callback !== 'function') {
        throw new Error('Second argument must be a function');
    }

    return someRecursiveOptimized(array, callback);
}

// Version that can handle nested arrays (deep search)
function someRecursiveDeep(array, callback) {
    if (array.length === 0) return false;

    const current = array[0];

    // If current element is an array, search recursively within it
    if (Array.isArray(current)) {
        if (someRecursiveDeep(current, callback)) return true;
    } else {
        // Test the current element
        if (callback(current)) return true;
    }

    // Continue with the rest of the array
    return someRecursiveDeep(array.slice(1), callback);
}

// Tail-call optimized version (though JS doesn't guarantee TCO)
function someRecursiveTailCall(array, callback, index = 0) {
    while (index < array.length) {
        if (callback(array[index])) return true;
        index++;
    }
    return false;
}

// Test callback functions
const isOdd = x => x % 2 !== 0;
const isEven = x => x % 2 === 0;
const isGreaterThan10 = x => x > 10;
const isString = x => typeof x === 'string';
const isNegative = x => x < 0;

console.log('=== BASIC TESTS ===');
console.log('someRecursive([2,4,6], isOdd):', someRecursive([2, 4, 6], isOdd)); // false
console.log('someRecursive([3,4,6], isOdd):', someRecursive([3, 4, 6], isOdd)); // true
console.log('someRecursive([2,4,6], isEven):', someRecursive([2, 4, 6], isEven)); // true
console.log('someRecursive([1,3,5], isEven):', someRecursive([1, 3, 5], isEven)); // false

console.log('\n=== ALGORITHM COMPARISON ===');
const testArray = [2, 4, 6, 8, 9, 10];
console.log('Original recursive:', someRecursive(testArray, isOdd));
console.log('Optimized recursive:', someRecursiveOptimized(testArray, isOdd));
console.log('Iterative:', someIterative(testArray, isOdd));
console.log('Helper pattern:', someRecursiveHelper(testArray, isOdd));

console.log('\n=== WITH DETAILS ===');
console.log('Details for odd in [2,4,6,8,9,10]:', someRecursiveWithDetails(testArray, isOdd));
console.log('Details for >10 in [1,2,3]:', someRecursiveWithDetails([1, 2, 3], isGreaterThan10));

console.log('\n=== DIFFERENT CALLBACK TYPES ===');
console.log('Has number > 10:', someRecursive([5, 8, 15, 3], isGreaterThan10)); // true
console.log('Has string:', someRecursive([1, 2, 'hello', 4], isString)); // true
console.log('Has negative:', someRecursive([1, 2, 3, -1], isNegative)); // true

console.log('\n=== EDGE CASES ===');
console.log('Empty array:', someRecursive([], isOdd)); // false
console.log('Single element (true):', someRecursive([3], isOdd)); // true
console.log('Single element (false):', someRecursive([2], isOdd)); // false
console.log('All elements pass:', someRecursive([1, 3, 5], isOdd)); // true
console.log('No elements pass:', someRecursive([2, 4, 6], isOdd)); // false

console.log('\n=== DEEP ARRAY SEARCH ===');
console.log('Nested arrays:', someRecursiveDeep([2, [4, [6, 7]], 8], isOdd)); // true
console.log('Deeply nested:', someRecursiveDeep([[[[2]]], [4, [6]]], isOdd)); // false

console.log('\n=== BUILT-IN COMPARISON ===');
// Compare with JavaScript's native Array.some()
const arrays = [
    [2, 4, 6],
    [3, 4, 6],
    [1, 2, 3, 4, 5],
    [],
    [10, 20, 30]
];

arrays.forEach((arr, index) => {
    const recursive = someRecursive(arr, isOdd);
    const native = arr.some(isOdd);
    const match = recursive === native;
    console.log(`Test ${index + 1}: Recursive=${recursive}, Native=${native}, Match=${match}`);
});

console.log('\n=== PERFORMANCE COMPARISON ===');
const largeArray = Array.from({ length: 10000 }, (_, i) => i * 2); // All even numbers
largeArray.push(1); // Add one odd number at the end

console.time('Recursive (slice)');
someRecursive(largeArray, isOdd);
console.timeEnd('Recursive (slice)');

console.time('Recursive (index)');
someRecursiveOptimized(largeArray, isOdd);
console.timeEnd('Recursive (index)');

console.time('Iterative');
someIterative(largeArray, isOdd);
console.timeEnd('Iterative');

console.time('Native Array.some()');
largeArray.some(isOdd);
console.timeEnd('Native Array.some()');

console.log('\n=== CUSTOM CALLBACKS ===');
// More complex callback examples
console.log('Has prime number:', someRecursive([4, 6, 8, 7, 10], num => {
    if (num < 2) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
        if (num % i === 0) return false;
    }
    return true;
})); // true (7 is prime)

console.log('Has palindrome string:', someRecursive(['hello', 'world', 'racecar'], str => {
    return str === str.split('').reverse().join('');
})); // true ('racecar' is palindrome)