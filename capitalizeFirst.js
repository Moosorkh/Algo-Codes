// Given an array of strings, capitalize the first letter of each string in the array

// Simple iterative approach (most readable and efficient)
function capitalizeFirst(array) {
    return array.map(str => str.charAt(0).toUpperCase() + str.slice(1));
}

// Alternative recursive approach (cleaner than original)
function capitalizeFirstRecursive(array) {
    if (array.length === 0) return [];
    if (array.length === 1) {
        return [array[0].charAt(0).toUpperCase() + array[0].slice(1)];
    }
    
    return [
        array[0].charAt(0).toUpperCase() + array[0].slice(1),
        ...capitalizeFirstRecursive(array.slice(1))
    ];
}

// More robust version with input validation
function capitalizeFirstRobust(array) {
    if (!Array.isArray(array)) {
        throw new Error('Input must be an array');
    }
    
    return array.map(item => {
        if (typeof item !== 'string') {
            throw new Error('All array elements must be strings');
        }
        return item.length > 0 ? item.charAt(0).toUpperCase() + item.slice(1) : item;
    });
}

// Test the functions
let arr = ['cat', 'dog', 'human', 'tiger'];

console.log('Simple approach:', capitalizeFirst(arr));
console.log('Recursive approach:', capitalizeFirstRecursive(arr)); 
console.log('Robust approach:', capitalizeFirstRobust(arr));

// Test edge cases
console.log('Empty array:', capitalizeFirst([]));
console.log('Single item:', capitalizeFirst(['hello']));
console.log('Empty strings:', capitalizeFirst(['', 'world']));