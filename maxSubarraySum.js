// Maximum subarray sum problems - two different interpretations

// Original function: Maximum sum of subarray with fixed length (sliding window)
function maxSubarraySum(arr, windowSize) {
    if (windowSize > arr.length || windowSize <= 0) return null;
    
    // Calculate sum of first window
    let maxSum = 0;
    for (let i = 0; i < windowSize; i++) {
        maxSum += arr[i];
    }
    
    let currentSum = maxSum;
    
    // Slide the window and update sum
    for (let i = windowSize; i < arr.length; i++) {
        currentSum = currentSum - arr[i - windowSize] + arr[i];
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

// Kadane's Algorithm: Maximum sum of any contiguous subarray (variable length)
function maxSubarraySumKadane(arr) {
    if (arr.length === 0) return 0;
    
    let maxSoFar = arr[0];
    let maxEndingHere = arr[0];
    
    for (let i = 1; i < arr.length; i++) {
        // Either extend existing subarray or start new one
        maxEndingHere = Math.max(arr[i], maxEndingHere + arr[i]);
        maxSoFar = Math.max(maxSoFar, maxEndingHere);
    }
    
    return maxSoFar;
}

// Kadane's Algorithm that also returns the subarray indices
function maxSubarraySumWithIndices(arr) {
    if (arr.length === 0) return { sum: 0, start: -1, end: -1 };
    
    let maxSum = arr[0];
    let currentSum = arr[0];
    let start = 0;
    let end = 0;
    let tempStart = 0;
    
    for (let i = 1; i < arr.length; i++) {
        if (currentSum < 0) {
            currentSum = arr[i];
            tempStart = i;
        } else {
            currentSum += arr[i];
        }
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            start = tempStart;
            end = i;
        }
    }
    
    return {
        sum: maxSum,
        start: start,
        end: end,
        subarray: arr.slice(start, end + 1)
    };
}

// Enhanced sliding window with additional info
function maxSubarraySumSlidingWindow(arr, windowSize) {
    if (windowSize > arr.length || windowSize <= 0) return null;
    if (arr.length === 0) return null;
    
    // Calculate sum of first window
    let maxSum = 0;
    for (let i = 0; i < windowSize; i++) {
        maxSum += arr[i];
    }
    
    let currentSum = maxSum;
    let maxStartIndex = 0;
    
    // Slide the window
    for (let i = windowSize; i < arr.length; i++) {
        currentSum = currentSum - arr[i - windowSize] + arr[i];
        
        if (currentSum > maxSum) {
            maxSum = currentSum;
            maxStartIndex = i - windowSize + 1;
        }
    }
    
    return {
        maxSum: maxSum,
        startIndex: maxStartIndex,
        endIndex: maxStartIndex + windowSize - 1,
        subarray: arr.slice(maxStartIndex, maxStartIndex + windowSize)
    };
}

// Robust version with input validation
function maxSubarraySumRobust(arr, windowSize) {
    if (!Array.isArray(arr)) {
        throw new Error('First argument must be an array');
    }
    
    if (!Number.isInteger(windowSize) || windowSize <= 0) {
        throw new Error('Window size must be a positive integer');
    }
    
    if (windowSize > arr.length) {
        return null;
    }
    
    // Check if all elements are numbers
    if (!arr.every(num => typeof num === 'number')) {
        throw new Error('Array must contain only numbers');
    }
    
    return maxSubarraySum(arr, windowSize);
}

// Brute force approach (for educational comparison)
function maxSubarraySumBruteForce(arr, windowSize) {
    if (windowSize > arr.length || windowSize <= 0) return null;
    
    let maxSum = -Infinity;
    
    for (let i = 0; i <= arr.length - windowSize; i++) {
        let currentSum = 0;
        for (let j = i; j < i + windowSize; j++) {
            currentSum += arr[j];
        }
        maxSum = Math.max(maxSum, currentSum);
    }
    
    return maxSum;
}

// Test cases
console.log('=== SLIDING WINDOW (Fixed Length) ===');
console.log(maxSubarraySum([1, 2, 3, 4, 5], 2)); // 9 (4+5)
console.log(maxSubarraySum([1, 2, 3, 4, 5], 3)); // 12 (3+4+5)
console.log(maxSubarraySum([2, 6, 9, 2, 1, 8, 5, 6, 3], 3)); // 19 (8+5+6)

console.log('\n=== KADANE\'S ALGORITHM (Variable Length) ===');
console.log(maxSubarraySumKadane([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6 ([4,-1,2,1])
console.log(maxSubarraySumKadane([1, 2, 3, 4, 5])); // 15 (entire array)
console.log(maxSubarraySumKadane([-1, -2, -3, -4])); // -1 (best single element)

console.log('\n=== WITH SUBARRAY DETAILS ===');
console.log('Sliding window details:', maxSubarraySumSlidingWindow([1, 2, 3, 4, 5], 2));
console.log('Kadane with indices:', maxSubarraySumWithIndices([-2, 1, -3, 4, -1, 2, 1, -5, 4]));

console.log('\n=== EDGE CASES ===');
console.log(maxSubarraySum([5], 1)); // 5
console.log(maxSubarraySum([1, 2, 3], 4)); // null (window too large)
console.log(maxSubarraySum([], 1)); // null
console.log(maxSubarraySumKadane([])); // 0

console.log('\n=== PERFORMANCE COMPARISON ===');
const largeArray = Array.from({length: 10000}, () => Math.floor(Math.random() * 100));

console.time('Sliding Window O(n)');
maxSubarraySum(largeArray, 100);
console.timeEnd('Sliding Window O(n)');

console.time('Brute Force O(n²)');
maxSubarraySumBruteForce(largeArray.slice(0, 1000), 100); // Smaller array for brute force
console.timeEnd('Brute Force O(n²)');

console.time('Kadane O(n)');
maxSubarraySumKadane(largeArray);
console.timeEnd('Kadane O(n)');