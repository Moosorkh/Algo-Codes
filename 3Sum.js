
class Solution {
    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    threeSum(nums) {
        const output = [];
    //Sort the Array:
    //Sort the array to enable the two - pointer technique.For example, [-1, 0, 1, 2, -1, -4] becomes[-4, -1, -1, 0, 1, 2].
        nums.sort((a, b) => a - b);
//Iterate Through the Array:
//Loop through each number until the third - to - last one(since we need at least two more numbers for a triplet).This is the "current number."
for(let i = 0; i < nums.length - 2; i++){
    if(i > 0 && nums[i] === nums[i - 1]) continue;
    //Set Up Two Pointers: Use two pointers: One starts right after the current number(left).The other starts at the end of the array(right).
    let left = i + 1;
    let right = nums.length - 1;
    //Find Triplets with Two Pointers:
    //Loop while left < right:
    while(left < right){
    //Find the sum of the current number and the two pointers.
    const sum = nums[i] + nums[left] + nums[right];
    //Check the sum of the current number, nums[left], and nums[right].
        //If the sum is zero, add the triplet to the result and skip duplicates for both pointers.
        if(sum === 0){
            output.push([nums[i], nums[left], nums[right]]);
            //Skip Duplicates:If the current number is the same as the previous one, skip it to avoid duplicate triplets.
            while(nums[left] === nums[left + 1]) left++;
            while(nums[right] === nums[right - 1]) right--;
            //Move the pointers:
            //Move the left pointer to the right.
            left++;
            //Move the right pointer to the left.
            right--;
        }
        //If the sum is less than zero, move left to the right.
        else if(sum < 0) left++;
        //If the sum is greater than zero, move right to the left.
        else right--;
    }
}
//Return the Result:
//Return the unique triplets.
return output;
    }
}