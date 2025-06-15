// Insertion Sort - sorts an array in ascending order

// Fixed and improved version with better naming
function insertionSort(arr) {
    // Create a copy to avoid mutating the original array
    const sortedArray = [...arr];
    
    for (let i = 1; i < sortedArray.length; i++) {
        const currentValue = sortedArray[i];
        let j = i - 1;
        
        // Move elements greater than currentValue one position ahead
        while (j >= 0 && sortedArray[j] > currentValue) {
            sortedArray[j + 1] = sortedArray[j];
            j--;
        }
        
        // Insert currentValue at its correct position
        sortedArray[j + 1] = currentValue;
    }
    
    return sortedArray;
}

// In-place version (mutates original array)
function insertionSortInPlace(arr) {
    for (let i = 1; i < arr.length; i++) {
        const currentValue = arr[i];
        let j = i - 1;
        
        while (j >= 0 && arr[j] > currentValue) {
            arr[j + 1] = arr[j];
            j--;
        }
        
        arr[j + 1] = currentValue;
    }
    
    return arr;
}

// Generic version with custom comparator
function insertionSortGeneric(arr, compareFn = (a, b) => a - b) {
    const sortedArray = [...arr];
    
    for (let i = 1; i < sortedArray.length; i++) {
        const currentValue = sortedArray[i];
        let j = i - 1;
        
        while (j >= 0 && compareFn(sortedArray[j], currentValue) > 0) {
            sortedArray[j + 1] = sortedArray[j];
            j--;
        }
        
        sortedArray[j + 1] = currentValue;
    }
    
    return sortedArray;
}

// Robust version with input validation
function insertionSortRobust(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('Input must be an array');
    }
    
    if (arr.length <= 1) return [...arr];
    
    // Check if all elements are comparable
    const firstType = typeof arr[0];
    if (!arr.every(item => typeof item === firstType)) {
        throw new Error('All array elements must be of the same type for sorting');
    }
    
    return insertionSort(arr);
}

// Test cases
const nums = [12, 9, 0, 1, 19, 4];
console.log('Original array:', nums);
console.log('Sorted (non-mutating):', insertionSort(nums));
console.log('Original after sort:', nums); // Should be unchanged

const nums2 = [12, 9, 0, 1, 19, 4];
console.log('In-place sort:', insertionSortInPlace(nums2));
console.log('Array after in-place sort:', nums2); // Should be sorted

// Test with different data types
console.log('Strings:', insertionSort(['banana', 'apple', 'cherry', 'date']));
console.log('Descending order:', insertionSortGeneric([5, 2, 8, 1], (a, b) => b - a));

// Edge cases
console.log('Empty array:', insertionSort([]));
console.log('Single element:', insertionSort([42]));
console.log('Already sorted:', insertionSort([1, 2, 3, 4, 5]));
console.log('Reverse sorted:', insertionSort([5, 4, 3, 2, 1]));
console.log('Duplicates:', insertionSort([3, 1, 3, 2, 1, 2]));