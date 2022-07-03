function minSubArrayLen(arr, num){
    let start = 0;
    let end = 0;
    let sum = 0;
    let minLen = Infinity;

    while(start < arr.length){
        if(end < arr.length && sum < num){
            sum += arr[end];
            end++;
        }else if(sum >= num){
            minLen = Math.min(minLen, end - start);
            sum -= arr[start];
            start++;
        }else{
            break;
        }
    }
    return minLen === Infinity ? 0 : minLen;
}

console.log(minSubArrayLen([1,2,3,4], 5));// returns 2 since there are 2 numbers that their sum equals to 5 on this array