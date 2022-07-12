function areThereDuplicates(arr){
    arr = arr.sort()
    if(arr.length === 0) return 0;
    let i = 0;
    for(let j = 1; j < arr.length; j++){
        if(arr[i]===arr[j]){
            return true;
        }else{
            i++;
        }
    }
    return false;
}
