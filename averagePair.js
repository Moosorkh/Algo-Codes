/*Given a sorted array of integers and a target average,
determine if there is a pair of values in the array where the average of the pair equals the target average.
There may be more than one pair that matches the average target, but we just want the first pair.

Example: If the given array is [1, 2, 3] and the target average is 2,
then we want the algorithm to return true. This is because the average of 1 and 2 is 2.
But if none of the numbers in the array can create the target average of 2, then return false.
*/

function averagePair(arr, avg){
    let left = 0;
    let right = arr.length-1;
    while(left < right){
      let tempAvg = (arr[left] + arr[right])/2;
      if(tempAvg === avg){
        return true;
      }else if(tempAvg < avg){
        left++;
      }else{
        right--;
      }
    }
    return false;
  }
  
  console.log(averagePair([1,2,3,4], 3));//returns true
  console.log(averagePair([2,4,7,11], 4));//should return false
  console.log(averagePair([1,2,3,4], 1.5));//true
