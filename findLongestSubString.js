// Find the length of the longest substring with all unique characters

// Improved sliding window approach with clearer variable names
function findLongestSubstring(str) {
    if (str.length === 0) return 0;
    
    let left = 0;
    let charIndexMap = {};
    let maxLength = 0;
    
    for (let right = 0; right < str.length; right++) {
        const char = str[right];
        
        // If character is seen and is within current window, move left pointer
        if (char in charIndexMap && charIndexMap[char] >= left) {
            left = charIndexMap[char] + 1;
        }
        
        // Update character's last seen index
        charIndexMap[char] = right;
        
        // Update max length if current window is larger
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// Alternative implementation using Set for clearer logic
function findLongestSubstringSet(str) {
    if (str.length === 0) return 0;
    
    let left = 0;
    let right = 0;
    let maxLength = 0;
    const charSet = new Set();
    
    while (right < str.length) {
        // If character not in set, expand window
        if (!charSet.has(str[right])) {
            charSet.add(str[right]);
            maxLength = Math.max(maxLength, right - left + 1);
            right++;
        } else {
            // Character is duplicate, shrink window from left
            charSet.delete(str[left]);
            left++;
        }
    }
    
    return maxLength;
}

// More robust version with input validation
function findLongestSubstringRobust(str) {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    
    if (str.length === 0) return 0;
    if (str.length === 1) return 1;
    
    let left = 0;
    const charIndexMap = new Map();
    let maxLength = 0;
    
    for (let right = 0; right < str.length; right++) {
        const char = str[right];
        
        // If character exists and is within current window
        if (charIndexMap.has(char) && charIndexMap.get(char) >= left) {
            left = charIndexMap.get(char) + 1;
        }
        
        charIndexMap.set(char, right);
        maxLength = Math.max(maxLength, right - left + 1);
    }
    
    return maxLength;
}

// Test cases
console.log('Original approach:');
console.log(findLongestSubstring("string")); // 6 - all characters unique
console.log(findLongestSubstring("text")); // 4 - "text" has all unique chars
console.log(findLongestSubstring("abcabcbb")); // 3 - "abc"
console.log(findLongestSubstring("bbbbb")); // 1 - "b"
console.log(findLongestSubstring("pwwkew")); // 3 - "wke"

console.log('\nSet-based approach:');
console.log(findLongestSubstringSet("string"));
console.log(findLongestSubstringSet("text"));
console.log(findLongestSubstringSet("abcabcbb"));

console.log('\nRobust approach:');
console.log(findLongestSubstringRobust("string"));
console.log(findLongestSubstringRobust(""));
console.log(findLongestSubstringRobust("a"));