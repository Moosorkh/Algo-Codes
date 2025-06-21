// Function to capitalize all the word elements of an array

// Simple iterative approach (most readable and efficient)
function capitalizeWords(array) {
    return array.map(word => word.toUpperCase());
}

// Alternative recursive approach (cleaner than original)
function capitalizeWordsRecursive(array) {
    if (array.length === 0) return [];
    if (array.length === 1) return [array[0].toUpperCase()];
    
    return [
        array[0].toUpperCase(),
        ...capitalizeWordsRecursive(array.slice(1))
    ];
}

// More robust version with input validation
function capitalizeWordsRobust(array) {
    if (!Array.isArray(array)) {
        throw new Error('Input must be an array');
    }
    
    return array.map(item => {
        if (typeof item !== 'string') {
            throw new Error('All array elements must be strings');
        }
        return item.toUpperCase();
    });
}

// Test the functions
console.log('Simple approach:', capitalizeWords(['cat', 'dog', 'fish'])); 
console.log('Recursive approach:', capitalizeWordsRecursive(['cat', 'dog', 'fish'])); 
console.log('Robust approach:', capitalizeWordsRobust(['cat', 'dog', 'fish']));

// Test edge cases
console.log('Empty array:', capitalizeWords([]));
console.log('Single item:', capitalizeWords(['hello']));
console.log('Mixed case:', capitalizeWords(['Hello', 'WORLD', 'tEsT']));