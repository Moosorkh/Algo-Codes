//binarySearch function accepts a sorted array and a value and returns the index at which the value exists. Otherwise returns -1
function binarySearch(arr, num) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (arr[mid] === num) return mid;
    else if (arr[mid] < num) left = mid + 1;
    else right = mid - 1;
  }
  return -1;
}

console.log(binarySearch([1, 2, 3, 4, 5, 6], 3)); // Returns 2, the index of 3 in arr
console.log(binarySearch([1, 2, 3, 4, 5, 6], 12)); // Returns -1
