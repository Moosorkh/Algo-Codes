//Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.
//A subarray is a contiguous part of an array.
function maxSubarraySum(arr, num){
    if(num > arr.length)return null;
    let max = 0;
    let tempMax = 0 ;
    for(let i = 0; i < num; i++){
        max += arr[i];
    }
    tempMax = max;
    for(let i = num; i < arr.length; i++){
        tempMax = tempMax - arr[i - num] + arr[i];
        if(tempMax > max){
            max = tempMax;
        }
    }
    return max;
}
console.log(maxSubarraySum([1,2,3,4,5], 2)); // Returns 9
console.log(maxSubarraySum([1,2,3,4,5], 3)); // Returns 12
