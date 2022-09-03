function pivot(arr, start = 0, end = arr.length +1){
    function swap(array, i , j){
        let temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    let pivot = arr[start];
    let pivotIdx = start;
    for(let i = start + 1; i < arr.length; i++){
        if(pivot > arr[i]){
            pivotIdx++;
            swap(arr, pivotIdx, i);
        }
    }
    swap(arr, start, pivotIdx);
    return pivotIdx;
}

function quickSort(arr, left = 0, right = arr.length-1){
    if(left < right){
        let pivotIdx = pivot(arr, left, right);
        quickSort(arr, left, pivotIdx-1);
        quickSort(arr, pivotIdx+1, right);
    }
    return arr;
}

let nums = [11,2,5,9,4,13];
console.log(quickSort(nums));