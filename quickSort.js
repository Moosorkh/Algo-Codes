// QuickSort Algorithm - Average O(n log n), Worst O(n²) time complexity

// Fixed and improved pivot function
function pivot(arr, start = 0, end = arr.length - 1) {
    function swap(array, i, j) {
        [array[i], array[j]] = [array[j], array[i]]; // Modern ES6 swap
    }

    const pivotValue = arr[start];
    let pivotIndex = start;

    // Only iterate within the specified range
    for (let i = start + 1; i <= end; i++) {
        if (pivotValue > arr[i]) {
            pivotIndex++;
            swap(arr, pivotIndex, i);
        }
    }

    // Move pivot to its final position
    swap(arr, start, pivotIndex);
    return pivotIndex;
}

// Improved QuickSort with proper bounds handling
function quickSort(arr, left = 0, right = arr.length - 1) {
    if (left < right) {
        const pivotIndex = pivot(arr, left, right);

        // Recursively sort elements before and after partition
        quickSort(arr, left, pivotIndex - 1);
        quickSort(arr, pivotIndex + 1, right);
    }

    return arr;
}

// Non-mutating version (creates a copy)
function quickSortPure(arr) {
    const sortedArray = [...arr];

    function sort(array, left = 0, right = array.length - 1) {
        if (left < right) {
            const pivotIndex = pivot(array, left, right);
            sort(array, left, pivotIndex - 1);
            sort(array, pivotIndex + 1, right);
        }
        return array;
    }

    return sort(sortedArray);
}

// QuickSort with random pivot selection (better average performance)
function quickSortRandomPivot(arr, left = 0, right = arr.length - 1) {
    function randomPivot(array, start, end) {
        function swap(arr, i, j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        // Choose random pivot and move it to start
        const randomIndex = Math.floor(Math.random() * (end - start + 1)) + start;
        swap(array, start, randomIndex);

        const pivotValue = array[start];
        let pivotIndex = start;

        for (let i = start + 1; i <= end; i++) {
            if (pivotValue > array[i]) {
                pivotIndex++;
                swap(array, pivotIndex, i);
            }
        }

        swap(array, start, pivotIndex);
        return pivotIndex;
    }

    if (left < right) {
        const pivotIndex = randomPivot(arr, left, right);
        quickSortRandomPivot(arr, left, pivotIndex - 1);
        quickSortRandomPivot(arr, pivotIndex + 1, right);
    }

    return arr;
}

// QuickSort with median-of-three pivot selection
function quickSortMedianPivot(arr, left = 0, right = arr.length - 1) {
    function medianOfThree(array, start, end) {
        const mid = Math.floor((start + end) / 2);

        // Sort the three elements and use middle as pivot
        if (array[start] > array[mid]) {
            [array[start], array[mid]] = [array[mid], array[start]];
        }
        if (array[start] > array[end]) {
            [array[start], array[end]] = [array[end], array[start]];
        }
        if (array[mid] > array[end]) {
            [array[mid], array[end]] = [array[end], array[mid]];
        }

        // Move median to start position
        [array[start], array[mid]] = [array[mid], array[start]];

        return pivot(array, start, end);
    }

    if (left < right) {
        const pivotIndex = medianOfThree(arr, left, right);
        quickSortMedianPivot(arr, left, pivotIndex - 1);
        quickSortMedianPivot(arr, pivotIndex + 1, right);
    }

    return arr;
}

// Iterative QuickSort (avoids recursion stack overflow)
function quickSortIterative(arr) {
    const stack = [[0, arr.length - 1]];

    while (stack.length > 0) {
        const [left, right] = stack.pop();

        if (left < right) {
            const pivotIndex = pivot(arr, left, right);

            // Push left and right subarrays onto stack
            stack.push([left, pivotIndex - 1]);
            stack.push([pivotIndex + 1, right]);
        }
    }

    return arr;
}

// Generic QuickSort with custom comparator
function quickSortGeneric(arr, compareFn = (a, b) => a - b) {
    function genericPivot(array, start, end) {
        function swap(arr, i, j) {
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }

        const pivotValue = array[start];
        let pivotIndex = start;

        for (let i = start + 1; i <= end; i++) {
            if (compareFn(pivotValue, array[i]) > 0) {
                pivotIndex++;
                swap(array, pivotIndex, i);
            }
        }

        swap(array, start, pivotIndex);
        return pivotIndex;
    }

    function sort(array, left = 0, right = array.length - 1) {
        if (left < right) {
            const pivotIndex = genericPivot(array, left, right);
            sort(array, left, pivotIndex - 1);
            sort(array, pivotIndex + 1, right);
        }
        return array;
    }

    return sort([...arr]);
}

// Robust version with input validation
function quickSortRobust(arr) {
    if (!Array.isArray(arr)) {
        throw new Error('Input must be an array');
    }

    if (arr.length === 0) return [];

    // Check if elements are comparable
    const firstType = typeof arr[0];
    if (!arr.every(item => typeof item === firstType)) {
        throw new Error('All array elements must be of the same comparable type');
    }

    return quickSortPure(arr);
}

// Test arrays
const nums = [11, 2, 5, 9, 4, 13];
const strings = ['banana', 'apple', 'cherry', 'date'];
const objects = [
    { name: 'John', age: 30 },
    { name: 'Jane', age: 25 },
    { name: 'Bob', age: 35 }
];

console.log('=== BASIC TESTS ===');
console.log('Original array:', nums);
console.log('QuickSort result:', quickSort([...nums])); // Use copy to preserve original

console.log('\n=== ALGORITHM COMPARISON ===');
console.log('Standard pivot:', quickSort([...nums]));
console.log('Random pivot:', quickSortRandomPivot([...nums]));
console.log('Median pivot:', quickSortMedianPivot([...nums]));
console.log('Iterative:', quickSortIterative([...nums]));

console.log('\n=== DIFFERENT DATA TYPES ===');
console.log('Strings:', quickSortPure(strings));
console.log('Descending order:', quickSortGeneric(nums, (a, b) => b - a));

console.log('\n=== CUSTOM COMPARATOR ===');
console.log('Sort by age:', quickSortGeneric(objects, (a, b) => a.age - b.age));
console.log('Sort by name:', quickSortGeneric(objects, (a, b) => a.name.localeCompare(b.name)));

console.log('\n=== EDGE CASES ===');
console.log('Empty array:', quickSort([]));
console.log('Single element:', quickSort([42]));
console.log('Already sorted:', quickSort([1, 2, 3, 4, 5]));
console.log('Reverse sorted:', quickSort([5, 4, 3, 2, 1]));
console.log('Duplicates:', quickSort([3, 1, 3, 2, 1, 2]));
console.log('All same elements:', quickSort([5, 5, 5, 5]));

console.log('\n=== WORST CASE SCENARIOS ===');
const worstCase = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]; // Already sorted
console.log('Worst case (sorted):', quickSort([...worstCase]));
console.log('Random pivot on worst case:', quickSortRandomPivot([...worstCase]));

console.log('\n=== PERFORMANCE COMPARISON ===');
const largeArray = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 1000));

console.time('Standard QuickSort');
quickSort([...largeArray]);
console.timeEnd('Standard QuickSort');

console.time('Random Pivot QuickSort');
quickSortRandomPivot([...largeArray]);
console.timeEnd('Random Pivot QuickSort');

console.time('Iterative QuickSort');
quickSortIterative([...largeArray]);
console.timeEnd('Iterative QuickSort');

console.time('Native JavaScript Sort');
[...largeArray].sort((a, b) => a - b);
console.timeEnd('Native JavaScript Sort');

console.log('\n=== STABILITY TEST ===');
const stabilityTest = [
    { val: 3, id: 'a' },
    { val: 1, id: 'b' },
    { val: 3, id: 'c' },
    { val: 2, id: 'd' }
];
console.log('Original:', stabilityTest);
console.log('Sorted by val:', quickSortGeneric(stabilityTest, (a, b) => a.val - b.val));
console.log('Note: QuickSort is not stable - equal elements may change relative order');