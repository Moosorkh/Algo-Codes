// Implementing radixSort
// There are a few helper functions that need to be first implemented

function getDigit(num, i){
   return Math.floor(Math.abs(num)/Math.pow(10, i))%10; 
}

function digitCount(num){
    if(num === 0)return 1;
    return Math.floor(Math.log10(Math.abs(num))) + 1;
}

function mostDigits(nums){
    let maxDigits = 0;
    for(let i = 0; i < nums.length; i++){
        maxDigits = Math.max(maxDigits, digitCount(nums[i]));
    }
    return maxDigits;
}
// now implementing the radixSort function
function radixSort(nums){
    let maxDigitCounts = mostDigits(nums);
    for(let k = 0; k < maxDigitCounts; k++){
        let digitBuckets = Array.from({length:10}, ()=>[]);
        for(let i = 0; i < nums.length; i++){
            let digit = getDigit(nums[i], k);
            digitBuckets[digit].push(nums[i]);
        }
        nums = [].concat(...digitBuckets);
    }
    return nums;
}

let arr = [231231,4,212,53,767,9,97766];

radixSort(arr); //[4, 9, 53, 212, 767, 97766, 231231]
