// implementing the bubbleSort algorithm
function bubbleSort(arr){
    let checked;
    for(let i = arr.length; i > 0; i--){
        checked = true;
        for(let j = 0; j < i-1; j++){
            if(arr[j] > arr[j+1]){
                let temp = arr[j];
                arr[j] = arr[j+1];
                arr[j+1] = temp;
                checked = false;
            }
        }
    }
    return arr;
}

let nums = [33, 12, 1, 5, 7, 3];
console.log(bubbleSort(nums)); // returns [ 1, 3, 5, 7, 12, 33 ]
