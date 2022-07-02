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