// naiveSearch counts the number of times a smaller string appears in a longer string
// Time complexity: O(n*m) where n is length of text and m is length of pattern

// Improved naive string search with better variable names and structure
function naiveSearch(text, pattern) {
    if (pattern.length === 0) return 0;
    if (pattern.length > text.length) return 0;
    
    let count = 0;
    
    // Check each possible starting position
    for (let i = 0; i <= text.length - pattern.length; i++) {
        let j = 0;
        
        // Check if pattern matches at position i
        while (j < pattern.length && text[i + j] === pattern[j]) {
            j++;
        }
        
        // If we matched the entire pattern
        if (j === pattern.length) {
            count++;
        }
    }
    
    return count;
}

// Alternative implementation with substring comparison
function naiveSearchSubstring(text, pattern) {
    if (pattern.length === 0) return 0;
    if (pattern.length > text.length) return 0;
    
    let count = 0;
    
    for (let i = 0; i <= text.length - pattern.length; i++) {
        if (text.substring(i, i + pattern.length) === pattern) {
            count++;
        }
    }
    
    return count;
}

// Version that also returns the positions where matches are found
function naiveSearchWithPositions(text, pattern) {
    if (pattern.length === 0) return { count: 0, positions: [] };
    if (pattern.length > text.length) return { count: 0, positions: [] };
    
    const positions = [];
    
    for (let i = 0; i <= text.length - pattern.length; i++) {
        let j = 0;
        
        while (j < pattern.length && text[i + j] === pattern[j]) {
            j++;
        }
        
        if (j === pattern.length) {
            positions.push(i);
        }
    }
    
    return {
        count: positions.length,
        positions: positions
    };
}

// Case-insensitive version
function naiveSearchCaseInsensitive(text, pattern) {
    return naiveSearch(text.toLowerCase(), pattern.toLowerCase());
}

// Version that finds overlapping matches
function naiveSearchOverlapping(text, pattern) {
    // This is the same as the basic naive search
    // It naturally finds overlapping matches
    return naiveSearch(text, pattern);
}

// Version that finds non-overlapping matches
function naiveSearchNonOverlapping(text, pattern) {
    if (pattern.length === 0) return 0;
    if (pattern.length > text.length) return 0;
    
    let count = 0;
    let i = 0;
    
    while (i <= text.length - pattern.length) {
        let j = 0;
        
        while (j < pattern.length && text[i + j] === pattern[j]) {
            j++;
        }
        
        if (j === pattern.length) {
            count++;
            i += pattern.length; // Skip past this match
        } else {
            i++;
        }
    }
    
    return count;
}

// Robust version with input validation
function naiveSearchRobust(text, pattern) {
    if (typeof text !== 'string' || typeof pattern !== 'string') {
        throw new Error('Both arguments must be strings');
    }
    
    return naiveSearch(text, pattern);
}

// Using built-in JavaScript methods (for comparison)
function naiveSearchBuiltIn(text, pattern) {
    if (pattern.length === 0) return 0;
    
    let count = 0;
    let position = 0;
    
    while ((position = text.indexOf(pattern, position)) !== -1) {
        count++;
        position++; // Move one position forward to find overlapping matches
    }
    
    return count;
}

// Advanced: KMP (Knuth-Morris-Pratt) algorithm for better performance
function kmpSearch(text, pattern) {
    if (pattern.length === 0) return 0;
    if (pattern.length > text.length) return 0;
    
    // Build failure function (partial match table)
    function buildFailureFunction(pattern) {
        const failure = new Array(pattern.length).fill(0);
        let j = 0;
        
        for (let i = 1; i < pattern.length; i++) {
            while (j > 0 && pattern[i] !== pattern[j]) {
                j = failure[j - 1];
            }
            if (pattern[i] === pattern[j]) {
                j++;
            }
            failure[i] = j;
        }
        
        return failure;
    }
    
    const failure = buildFailureFunction(pattern);
    let count = 0;
    let j = 0;
    
    for (let i = 0; i < text.length; i++) {
        while (j > 0 && text[i] !== pattern[j]) {
            j = failure[j - 1];
        }
        
        if (text[i] === pattern[j]) {
            j++;
        }
        
        if (j === pattern.length) {
            count++;
            j = failure[j - 1]; // Continue searching for overlapping matches
        }
    }
    
    return count;
}

// Test cases
console.log('=== BASIC TESTS ===');
console.log(naiveSearch("jojo rabbit", "jojo")); // 1
console.log(naiveSearch("hello world hello", "hello")); // 2
console.log(naiveSearch("aaaaaaa", "aa")); // 6 (overlapping)
console.log(naiveSearch("abcdef", "xyz")); // 0

console.log('\n=== WITH POSITIONS ===');
console.log('Positions in "hello world hello":', naiveSearchWithPositions("hello world hello", "hello"));
console.log('Positions in "aaaaaaa":', naiveSearchWithPositions("aaaaaaa", "aa"));

console.log('\n=== OVERLAPPING VS NON-OVERLAPPING ===');
console.log('Overlapping "aa" in "aaaaaaa":', naiveSearchOverlapping("aaaaaaa", "aa")); // 6
console.log('Non-overlapping "aa" in "aaaaaaa":', naiveSearchNonOverlapping("aaaaaaa", "aa")); // 3

console.log('\n=== CASE SENSITIVITY ===');
console.log('Case sensitive "Hello" in "hello world Hello":', naiveSearch("hello world Hello", "Hello")); // 1
console.log('Case insensitive "Hello" in "hello world Hello":', naiveSearchCaseInsensitive("hello world Hello", "Hello")); // 2

console.log('\n=== EDGE CASES ===');
console.log('Empty pattern:', naiveSearch("hello", "")); // 0
console.log('Pattern longer than text:', naiveSearch("hi", "hello")); // 0
console.log('Exact match:', naiveSearch("hello", "hello")); // 1
console.log('Single character:', naiveSearch("aaa", "a")); // 3

console.log('\n=== ALGORITHM COMPARISON ===');
const testCases = [
    ["hello world hello universe", "hello"],
    ["aaaaaaa", "aa"],
    ["abcdefg", "xyz"],
    ["ababcababa", "aba"]
];

testCases.forEach(([text, pattern], index) => {
    const naive = naiveSearch(text, pattern);
    const builtIn = naiveSearchBuiltIn(text, pattern);
    const kmp = kmpSearch(text, pattern);
    console.log(`Test ${index + 1}: Naive=${naive}, Built-in=${builtIn}, KMP=${kmp}`);
});

console.log('\n=== PERFORMANCE COMPARISON ===');
const longText = "a".repeat(10000) + "b".repeat(10000);
const searchPattern = "ab";

console.time('Naive Search O(n*m)');
naiveSearch(longText, searchPattern);
console.timeEnd('Naive Search O(n*m)');

console.time('Built-in indexOf');
naiveSearchBuiltIn(longText, searchPattern);
console.timeEnd('Built-in indexOf');

console.time('KMP Algorithm O(n+m)');
kmpSearch(longText, searchPattern);
console.timeEnd('KMP Algorithm O(n+m)');