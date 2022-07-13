// someRecursive function accepts an array and a callback.
// The function returns true if a single value in the array returns true 
// when passed to the callback. Otherwise it returns false. 

function someRecursive(arr, callBack){
    if(arr.length === 0)return false;
    if(callBack(arr[0])) return true;

    return someRecursive(arr.slice(1), callBack);
}

const isOddNum = x => x % 2 !== 0;

console.log(someRecursive([2,4,6], isOddNum));// returns false since none of the array elements is odd.
console.log(someRecursive([3,4,6], isOddNum));// returns false since 3 is an odd number