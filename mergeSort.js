//mergeSort algorithm
function merge(arr1, arr2){
    let result = [];
    let i = 0;
    let j = 0;
    while(i < arr1.length && j < arr2.length){
        if(arr1[i] < arr2[j]){
            result.push(arr1[i]);
            i++;
        }else{
            result.push(arr2[j]);
            j++;
        }
    }
    while(i < arr1.length){
        result.push(arr1[i]);
        i++;
    }
    while(j < arr2.length){
        result.push(arr2[j]);
        j++;
    }
    return result;
}

function mergeSort(arr){
    if(arr.length < 2)return arr;
    const half = arr.length / 2;
    const left = arr.slice(0, half);
    const right = arr.slice(half);
    return merge(mergeSort(left), mergeSort(right));
}

let nums = [45, 15, 3, 0, 11, 4, 9];

mergeSort(nums); // [ 0,  3,  4, 9, 11, 15, 45 ]