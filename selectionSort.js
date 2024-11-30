// implementing the selectionSort
function selectionSort(arr){
    for(let i = 0; i < arr.length; i++){
        let min = i;
        for(let j = i+1; j < arr.length; j++){
            if(arr[min] > arr[j]){
                min = j;
            }
        }
        if(min !== i){
            let tmp = arr[i];
            arr[i] = arr[min];
            arr[min] = tmp;
        }
    }
    return arr;
}

let nums = [43, 12, 4, 0, 5, 67];

console.log(selectionSort(nums));// should return [ 0, 4, 5, 12, 43, 67 ]