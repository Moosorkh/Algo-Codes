function inserionSort(arr){
    for(let i = 1; i < arr.length; i++){
        let currentVal = arr[i];
        let j = i-1;
        while((j > -1) && (currentVal < arr[j])){
            arr[j+1] = arr[j];
            j--;
        }
        arr[j+1] = currentVal;
    }
    return arr;
}

let nums = [12, 9, 0, 1, 19, 4];
console.log(inserionSort(nums));// returns [ 0, 1, 4, 9, 12, 19 ]