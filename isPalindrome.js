// A palindrome number reads the same forwards and backwards (e.g., 12321, 7, 1001)

// Improved full reversal approach with better variable names
function isPalindrome(x) {
    // Negative numbers and numbers ending in 0 (except 0 itself) are not palindromes
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
    
    let reversed = 0;
    let original = x;
    
    while (x > 0) {
        reversed = reversed * 10 + x % 10;
        x = Math.floor(x / 10); // Use Math.floor instead of parseInt for clarity
    }
    
    return original === reversed;
}

// Optimized half-reversal approach (more efficient)
function isPalindromeOptimized(x) {
    if (x < 0 || (x % 10 === 0 && x !== 0)) return false;
    
    let reversed = 0;
    
    // Only reverse half the number
    while (x > reversed) {
        reversed = reversed * 10 + x % 10;
        x = Math.floor(x / 10);
    }
    
    // For odd-digit numbers, we need to remove the middle digit from reversed
    // e.g., for 12321: x = 12, reversed = 123, so we check 12 === 123/10 = 12
    return x === reversed || x === Math.floor(reversed / 10);
}

// String-based approach (simple but less efficient)
function isPalindromeString(x) {
    if (x < 0) return false;
    
    const str = x.toString();
    return str === str.split('').reverse().join('');
}

// Recursive approach
function isPalindromeRecursive(x) {
    if (x < 0) return false;
    
    const str = x.toString();
    
    function checkRecursive(s, left = 0, right = s.length - 1) {
        if (left >= right) return true;
        if (s[left] !== s[right]) return false;
        return checkRecursive(s, left + 1, right - 1);
    }
    
    return checkRecursive(str);
}

// Robust version with input validation
function isPalindromeRobust(x) {
    if (typeof x !== 'number' || !Number.isInteger(x)) {
        throw new Error('Input must be an integer');
    }
    
    return isPalindromeOptimized(x);
}

// Helper function to count digits (for demonstration)
function countDigits(n) {
    if (n === 0) return 1;
    return Math.floor(Math.log10(Math.abs(n))) + 1;
}

// Test cases
console.log('Basic tests:');
console.log(isPalindrome(12321)); // true
console.log(isPalindrome(123)); // false
console.log(isPalindrome(7)); // true (single digit)
console.log(isPalindrome(0)); // true
console.log(isPalindrome(-121)); // false (negative)

console.log('\nOptimized approach:');
console.log(isPalindromeOptimized(1001)); // true
console.log(isPalindromeOptimized(1234)); // false
console.log(isPalindromeOptimized(9009)); // true

console.log('\nString-based approach:');
console.log(isPalindromeString(12321)); // true
console.log(isPalindromeString(12345)); // false

console.log('\nRecursive approach:');
console.log(isPalindromeRecursive(12321)); // true
console.log(isPalindromeRecursive(12345)); // false

console.log('\nEdge cases:');
console.log(isPalindrome(10)); // false (ends in 0)
console.log(isPalindrome(100)); // false (ends in 0)
console.log(isPalindrome(1)); // true (single digit)
console.log(isPalindrome(11)); // true (two same digits)
console.log(isPalindrome(121)); // true (three digits)

console.log('\nPerformance comparison for large numbers:');
const largeNum = 1234554321;
console.time('Full reversal');
console.log('Full reversal result:', isPalindrome(largeNum));
console.timeEnd('Full reversal');

console.time('Half reversal (optimized)');
console.log('Half reversal result:', isPalindromeOptimized(largeNum));
console.timeEnd('Half reversal (optimized)');