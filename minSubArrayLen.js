// minSubArrayLen finds the minimum length of a contiguous subarray 
// whose sum is greater than or equal to the target value

// Improved sliding window approach with better variable names
function minSubArrayLen(arr, target) {
    let left = 0;
    let currentSum = 0;
    let minLength = Infinity;
    
    for (let right = 0; right < arr.length; right++) {
        // Expand window by adding current element
        currentSum += arr[right];
        
        // Contract window while sum is >= target
        while (currentSum >= target) {
            minLength = Math.min(minLength, right - left + 1);
            currentSum -= arr[left];
            left++;
        }
    }
    
    return minLength === Infinity ? 0 : minLength;
}

// Alternative implementation with more explicit logic
function minSubArrayLenExplicit(arr, target) {
    if (arr.length === 0) return 0;
    
    let windowStart = 0;
    let windowSum = 0;
    let minWindowSize = Infinity;
    
    for (let windowEnd = 0; windowEnd < arr.length; windowEnd++) {
        // Add current element to window
        windowSum += arr[windowEnd];
        
        // Shrink window until sum is smaller than target
        while (windowSum >= target && windowStart <= windowEnd) {
            // Update minimum window size
            minWindowSize = Math.min(minWindowSize, windowEnd - windowStart + 1);
            
            // Remove element from window start
            windowSum -= arr[windowStart];
            windowStart++;
        }
    }
    
    return minWindowSize === Infinity ? 0 : minWindowSize;
}

// Version that also returns the actual subarray
function minSubArrayLenWithSubarray(arr, target) {
    let left = 0;
    let currentSum = 0;
    let minLength = Infinity;
    let resultStart = 0;
    let resultEnd = -1;
    
    for (let right = 0; right < arr.length; right++) {
        currentSum += arr[right];
        
        while (currentSum >= target) {
            if (right - left + 1 < minLength) {
                minLength = right - left + 1;
                resultStart = left;
                resultEnd = right;
            }
            currentSum -= arr[left];
            left++;
        }
    }
    
    return {
        length: minLength === Infinity ? 0 : minLength,
        subarray: minLength === Infinity ? [] : arr.slice(resultStart, resultEnd + 1),
        startIndex: minLength === Infinity ? -1 : resultStart,
        endIndex: minLength === Infinity ? -1 : resultEnd
    };
}

// Robust version with input validation
function minSubArrayLenRobust(arr, target) {
    if (!Array.isArray(arr)) {
        throw new Error('First argument must be an array');
    }
    
    if (typeof target !== 'number' || target <= 0) {
        throw new Error('Target must be a positive number');
    }
    
    if (!arr.every(num => typeof num === 'number' && num > 0)) {
        throw new Error('Array must contain only positive numbers');
    }
    
    return minSubArrayLen(arr, target);
}

// Brute force approach (for verification and educational purposes)
function minSubArrayLenBruteForce(arr, target) {
    let minLength = Infinity;
    
    for (let i = 0; i < arr.length; i++) {
        let currentSum = 0;
        for (let j = i; j < arr.length; j++) {
            currentSum += arr[j];
            if (currentSum >= target) {
                minLength = Math.min(minLength, j - i + 1);
                break; // Found valid subarray starting at i
            }
        }
    }
    
    return minLength === Infinity ? 0 : minLength;
}

// Version for arrays that may contain negative numbers
function minSubArrayLenWithNegatives(arr, target) {
    // Note: This problem becomes much more complex with negative numbers
    // The sliding window approach doesn't work efficiently
    // This is a simplified version that uses brute force
    
    let minLength = Infinity;
    
    for (let i = 0; i < arr.length; i++) {
        let currentSum = 0;
        for (let j = i; j < arr.length; j++) {
            currentSum += arr[j];
            if (currentSum >= target) {
                minLength = Math.min(minLength, j - i + 1);
                break;
            }
        }
    }
    
    return minLength === Infinity ? 0 : minLength;
}

// Test cases
console.log('=== BASIC TESTS ===');
console.log(minSubArrayLen([1, 2, 3, 4], 5)); // 2 ([2,3] or [1,4])
console.log(minSubArrayLen([2, 3, 1, 2, 4, 3], 7)); // 2 ([4,3])
console.log(minSubArrayLen([2, 1, 2, 4, 3, 1], 7)); // 2 ([4,3])
console.log(minSubArrayLen([1, 4, 4], 4)); // 1 ([4])

console.log('\n=== WITH SUBARRAY DETAILS ===');
console.log('Details for [1,2,3,4] target 5:', minSubArrayLenWithSubarray([1, 2, 3, 4], 5));
console.log('Details for [2,3,1,2,4,3] target 7:', minSubArrayLenWithSubarray([2, 3, 1, 2, 4, 3], 7));

console.log('\n=== EDGE CASES ===');
console.log('Empty array:', minSubArrayLen([], 5)); // 0
console.log('No solution:', minSubArrayLen([1, 1, 1, 1], 10)); // 0
console.log('Single element sufficient:', minSubArrayLen([5], 3)); // 1
console.log('Single element insufficient:', minSubArrayLen([2], 5)); // 0
console.log('All elements needed:', minSubArrayLen([1, 1, 1, 1], 4)); // 4

console.log('\n=== LARGER EXAMPLES ===');
console.log('Large target:', minSubArrayLen([1, 2, 3, 4, 5, 6, 7, 8], 15)); // 2 ([7,8])
console.log('Large array:', minSubArrayLen([1, 2, 1, 3, 4, 2, 1, 5, 6], 9)); // 2 ([5,6])

console.log('\n=== PERFORMANCE COMPARISON ===');
const largeArray = Array.from({length: 10000}, () => Math.floor(Math.random() * 10) + 1);
const target = 50;

console.time('Sliding Window O(n)');
minSubArrayLen(largeArray, target);
console.timeEnd('Sliding Window O(n)');

console.time('Brute Force O(n²)');
minSubArrayLenBruteForce(largeArray.slice(0, 1000), target); // Smaller array for brute force
console.timeEnd('Brute Force O(n²)');

console.log('\n=== ALGORITHM VERIFICATION ===');
const testCases = [
    [[1, 2, 3, 4], 5],
    [[2, 3, 1, 2, 4, 3], 7],
    [[1, 1, 1, 1], 10],
    [[1, 4, 4], 4]
];

testCases.forEach(([arr, target], index) => {
    const slidingResult = minSubArrayLen(arr, target);
    const bruteResult = minSubArrayLenBruteForce(arr, target);
    const match = slidingResult === bruteResult;
    console.log(`Test ${index + 1}: Sliding=${slidingResult}, Brute=${bruteResult}, Match=${match}`);
});