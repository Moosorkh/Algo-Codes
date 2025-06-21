// Merge Sort Algorithm - O(n log n) time complexity, O(n) space complexity

// Improved merge function with better variable names
function merge(leftArray, rightArray) {
    const mergedArray = [];
    let leftIndex = 0;
    let rightIndex = 0;
    
    // Compare elements and merge in sorted order
    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        if (leftArray[leftIndex] <= rightArray[rightIndex]) {
            mergedArray.push(leftArray[leftIndex]);
            leftIndex++;
        } else {
            mergedArray.push(rightArray[rightIndex]);
            rightIndex++;
        }
    }
    
    // Add remaining elements from left array
    while (leftIndex < leftArray.length) {
        mergedArray.push(leftArray[leftIndex]);
        leftIndex++;
    }
    
    // Add remaining elements from right array
    while (rightIndex < rightArray.length) {
        mergedArray.push(rightArray[rightIndex]);
        rightIndex++;
    }
    
    return mergedArray;
}

// Improved merge sort with proper midpoint calculation
function mergeSort(array) {
    // Base case: arrays with 0 or 1 element are already sorted
    if (array.length <= 1) return array;
    
    // Find the middle point and divide array into two halves
    const midpoint = Math.floor(array.length / 2);
    const leftHalf = array.slice(0, midpoint);
    const rightHalf = array.slice(midpoint);
    
    // Recursively sort both halves and merge them
    return merge(mergeSort(leftHalf), mergeSort(rightHalf));
}

// Generic merge sort with custom comparator function
function mergeSortGeneric(array, compareFn = (a, b) => a - b) {
    function mergeWithComparator(left, right) {
        const merged = [];
        let leftIndex = 0;
        let rightIndex = 0;
        
        while (leftIndex < left.length && rightIndex < right.length) {
            if (compareFn(left[leftIndex], right[rightIndex]) <= 0) {
                merged.push(left[leftIndex]);
                leftIndex++;
            } else {
                merged.push(right[rightIndex]);
                rightIndex++;
            }
        }
        
        // Add remaining elements
        return merged
            .concat(left.slice(leftIndex))
            .concat(right.slice(rightIndex));
    }
    
    if (array.length <= 1) return array;
    
    const mid = Math.floor(array.length / 2);
    const left = mergeSortGeneric(array.slice(0, mid), compareFn);
    const right = mergeSortGeneric(array.slice(mid), compareFn);
    
    return mergeWithComparator(left, right);
}

// In-place merge sort (more memory efficient)
function mergeSortInPlace(array, left = 0, right = array.length - 1) {
    if (left >= right) return array;
    
    const mid = Math.floor((left + right) / 2);
    
    mergeSortInPlace(array, left, mid);
    mergeSortInPlace(array, mid + 1, right);
    mergeInPlace(array, left, mid, right);
    
    return array;
}

function mergeInPlace(array, left, mid, right) {
    // Create temporary arrays for left and right subarrays
    const leftArray = array.slice(left, mid + 1);
    const rightArray = array.slice(mid + 1, right + 1);
    
    let leftIndex = 0;
    let rightIndex = 0;
    let mergeIndex = left;
    
    // Merge back into original array
    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
        if (leftArray[leftIndex] <= rightArray[rightIndex]) {
            array[mergeIndex] = leftArray[leftIndex];
            leftIndex++;
        } else {
            array[mergeIndex] = rightArray[rightIndex];
            rightIndex++;
        }
        mergeIndex++;
    }
    
    // Copy remaining elements
    while (leftIndex < leftArray.length) {
        array[mergeIndex] = leftArray[leftIndex];
        leftIndex++;
        mergeIndex++;
    }
    
    while (rightIndex < rightArray.length) {
        array[mergeIndex] = rightArray[rightIndex];
        rightIndex++;
        mergeIndex++;
    }
}

// Robust version with input validation
function mergeSortRobust(array) {
    if (!Array.isArray(array)) {
        throw new Error('Input must be an array');
    }
    
    if (array.length === 0) return [];
    
    // Check if elements are comparable
    const firstType = typeof array[0];
    if (!array.every(item => typeof item === firstType)) {
        throw new Error('All array elements must be of the same comparable type');
    }
    
    return mergeSort([...array]); // Create copy to avoid mutation
}

// Iterative merge sort (bottom-up approach)
function mergeSortIterative(array) {
    if (array.length <= 1) return array;
    
    const result = [...array];
    const n = result.length;
    
    // Start with subarrays of size 1, then 2, 4, 8, etc.
    for (let size = 1; size < n; size *= 2) {
        // Pick starting point of left sub array
        for (let start = 0; start < n - 1; start += 2 * size) {
            const mid = Math.min(start + size - 1, n - 1);
            const end = Math.min(start + 2 * size - 1, n - 1);
            
            if (mid < end) {
                mergeInPlace(result, start, mid, end);
            }
        }
    }
    
    return result;
}

// Test data
const nums = [45, 15, 3, 0, 11, 4, 9];
const strings = ['banana', 'apple', 'cherry', 'date'];
const objects = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
    { name: 'Bob', age: 35 }
];

console.log('=== BASIC MERGE SORT ===');
console.log('Original:', nums);
console.log('Sorted:', mergeSort(nums));
console.log('Original after sort:', nums); // Should be unchanged

console.log('\n=== DIFFERENT DATA TYPES ===');
console.log('Strings:', mergeSort(strings));
console.log('Numbers descending:', mergeSortGeneric([5, 2, 8, 1, 9], (a, b) => b - a));

console.log('\n=== CUSTOM COMPARATOR ===');
console.log('Sort by age:', mergeSortGeneric(objects, (a, b) => a.age - b.age));
console.log('Sort by name:', mergeSortGeneric(objects, (a, b) => a.name.localeCompare(b.name)));

console.log('\n=== IN-PLACE SORTING ===');
const testArray = [64, 34, 25, 12, 22, 11, 90];
console.log('Before in-place sort:', testArray);
mergeSortInPlace(testArray);
console.log('After in-place sort:', testArray);

console.log('\n=== ITERATIVE APPROACH ===');
console.log('Iterative merge sort:', mergeSortIterative([38, 27, 43, 3, 9, 82, 10]));

console.log('\n=== EDGE CASES ===');
console.log('Empty array:', mergeSort([]));
console.log('Single element:', mergeSort([42]));
console.log('Already sorted:', mergeSort([1, 2, 3, 4, 5]));
console.log('Reverse sorted:', mergeSort([5, 4, 3, 2, 1]));
console.log('Duplicates:', mergeSort([3, 1, 3, 2, 1, 2]));

console.log('\n=== PERFORMANCE COMPARISON ===');
const largeArray = Array.from({length: 10000}, () => Math.floor(Math.random() * 10000));

console.time('Recursive Merge Sort');
mergeSort([...largeArray]);
console.timeEnd('Recursive Merge Sort');

console.time('Iterative Merge Sort');
mergeSortIterative([...largeArray]);
console.timeEnd('Iterative Merge Sort');

console.time('Native JavaScript Sort');
[...largeArray].sort((a, b) => a - b);
console.timeEnd('Native JavaScript Sort');