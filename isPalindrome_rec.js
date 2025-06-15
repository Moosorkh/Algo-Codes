// isPalindrome using recursive function
// A palindrome word reads the same forwards and backwards (e.g., "tacocat", "racecar")

// Improved recursive version with better edge case handling
function isPalindrome(str) {
    // Handle empty string and single character
    if (str.length <= 1) return true;
    
    // Compare first and last characters
    if (str[0] !== str[str.length - 1]) return false;
    
    // Recursively check the substring without first and last characters
    return isPalindrome(str.slice(1, -1));
}

// Case-insensitive version that handles spaces and punctuation
function isPalindromeNormalized(str) {
    // Normalize: remove non-alphanumeric characters and convert to lowercase
    const normalized = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    
    function checkPalindrome(s) {
        if (s.length <= 1) return true;
        if (s[0] !== s[s.length - 1]) return false;
        return checkPalindrome(s.slice(1, -1));
    }
    
    return checkPalindrome(normalized);
}

// Iterative version using two pointers (more efficient)
function isPalindromeIterative(str) {
    let left = 0;
    let right = str.length - 1;
    
    while (left < right) {
        if (str[left] !== str[right]) return false;
        left++;
        right--;
    }
    
    return true;
}

// Helper function version with start/end indices (avoids string slicing)
function isPalindromeOptimized(str, start = 0, end = str.length - 1) {
    // Base case: if pointers meet or cross, it's a palindrome
    if (start >= end) return true;
    
    // If characters don't match, not a palindrome
    if (str[start] !== str[end]) return false;
    
    // Recursively check inner substring
    return isPalindromeOptimized(str, start + 1, end - 1);
}

// Robust version with input validation
function isPalindromeRobust(str) {
    if (typeof str !== 'string') {
        throw new Error('Input must be a string');
    }
    
    if (str.length <= 1) return true;
    
    // Normalize and check
    const normalized = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
    return isPalindromeOptimized(normalized);
}

// Test cases
console.log('Basic recursive tests:');
console.log(isPalindrome("txt")); // true
console.log(isPalindrome("bobcat")); // false
console.log(isPalindrome("racecar")); // true
console.log(isPalindrome("tacocat")); // true

console.log('\nNormalized (case-insensitive, ignores spaces/punctuation):');
console.log(isPalindromeNormalized("A man, a plan, a canal: Panama")); // true
console.log(isPalindromeNormalized("race a car")); // false
console.log(isPalindromeNormalized("Madam")); // true

console.log('\nIterative approach:');
console.log(isPalindromeIterative("level")); // true
console.log(isPalindromeIterative("hello")); // false

console.log('\nOptimized recursive (no string slicing):');
console.log(isPalindromeOptimized("noon")); // true
console.log(isPalindromeOptimized("world")); // false

console.log('\nEdge cases:');
console.log(isPalindrome("")); // true (empty string)
console.log(isPalindrome("a")); // true (single character)
console.log(isPalindrome("aa")); // true (two same characters)
console.log(isPalindrome("ab")); // false (two different characters)