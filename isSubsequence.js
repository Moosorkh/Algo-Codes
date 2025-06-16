// isSubsequence checks if characters in the first string form a subsequence 
// of the second string (maintaining relative order but not necessarily consecutive)

// Improved two-pointer approach with better variable names
function isSubsequence(subsequence, text) {
    // Empty subsequence is always found
    if (subsequence.length === 0) return true;
    
    let subIndex = 0;
    
    for (let textIndex = 0; textIndex < text.length; textIndex++) {
        if (text[textIndex] === subsequence[subIndex]) {
            subIndex++;
            // If we've matched all characters in subsequence
            if (subIndex === subsequence.length) return true;
        }
    }
    
    return false;
}

// Recursive approach
function isSubsequenceRecursive(subsequence, text, subIndex = 0, textIndex = 0) {
    // Base case: found all characters in subsequence
    if (subIndex === subsequence.length) return true;
    
    // Base case: reached end of text without finding all subsequence characters
    if (textIndex === text.length) return false;
    
    // If characters match, advance both pointers
    if (subsequence[subIndex] === text[textIndex]) {
        return isSubsequenceRecursive(subsequence, text, subIndex + 1, textIndex + 1);
    }
    
    // If no match, advance only text pointer
    return isSubsequenceRecursive(subsequence, text, subIndex, textIndex + 1);
}

// Using built-in methods (less efficient but more readable)
function isSubsequenceBuiltIn(subsequence, text) {
    if (subsequence.length === 0) return true;
    
    let textIndex = 0;
    
    for (const char of subsequence) {
        textIndex = text.indexOf(char, textIndex);
        if (textIndex === -1) return false;
        textIndex++; // Start searching from next position
    }
    
    return true;
}

// Case-insensitive version
function isSubsequenceCaseInsensitive(subsequence, text) {
    return isSubsequence(subsequence.toLowerCase(), text.toLowerCase());
}

// Robust version with input validation
function isSubsequenceRobust(subsequence, text) {
    if (typeof subsequence !== 'string' || typeof text !== 'string') {
        throw new Error('Both inputs must be strings');
    }
    
    return isSubsequence(subsequence, text);
}

// Advanced: Find all starting positions where subsequence can be found
function findSubsequencePositions(subsequence, text) {
    if (subsequence.length === 0) return [0];
    
    const positions = [];
    
    for (let startPos = 0; startPos <= text.length - subsequence.length; startPos++) {
        let subIndex = 0;
        
        for (let textIndex = startPos; textIndex < text.length && subIndex < subsequence.length; textIndex++) {
            if (text[textIndex] === subsequence[subIndex]) {
                if (subIndex === 0) {
                    // Record the starting position of this potential match
                    var matchStart = textIndex;
                }
                subIndex++;
            }
        }
        
        if (subIndex === subsequence.length) {
            positions.push(matchStart);
        }
    }
    
    return positions;
}

// Test cases
console.log('Basic tests:');
console.log(isSubsequence('is', 'this is a text')); // true
console.log(isSubsequence('not', 'this is a text')); // false
console.log(isSubsequence('ace', 'abcde')); // true (a-c-e in order)
console.log(isSubsequence('aec', 'abcde')); // false (e comes before c)

console.log('\nRecursive approach:');
console.log(isSubsequenceRecursive('abc', 'aabbcc')); // true
console.log(isSubsequenceRecursive('axc', 'ahbgdc')); // false

console.log('\nBuilt-in methods approach:');
console.log(isSubsequenceBuiltIn('hello', 'hxexlxlxo')); // true
console.log(isSubsequenceBuiltIn('world', 'hello world')); // true

console.log('\nCase-insensitive:');
console.log(isSubsequenceCaseInsensitive('IS', 'This Is A Text')); // true
console.log(isSubsequenceCaseInsensitive('NOT', 'this is a text')); // false

console.log('\nEdge cases:');
console.log(isSubsequence('', 'any text')); // true (empty subsequence)
console.log(isSubsequence('a', '')); // false (non-empty sub in empty text)
console.log(isSubsequence('', '')); // true (both empty)
console.log(isSubsequence('abc', 'abc')); // true (exact match)
console.log(isSubsequence('abc', 'cba')); // false (wrong order)

console.log('\nAdvanced - find all positions:');
console.log('Positions of "is" in "this is a text":', 
    findSubsequencePositions('is', 'this is a text'));

console.log('\nPerformance comparison:');
const longText = 'a'.repeat(10000) + 'b'.repeat(10000) + 'c'.repeat(10000);
const subseq = 'abc';

console.time('Two-pointer approach');
console.log('Two-pointer result:', isSubsequence(subseq, longText));
console.timeEnd('Two-pointer approach');

console.time('Recursive approach');
console.log('Recursive result:', isSubsequenceRecursive(subseq, longText));
console.timeEnd('Recursive approach');