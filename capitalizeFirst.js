//Given an array of strings, capitalize the first letter of each string in the array

function capitalizeFirst(array){
    if(array.length === 1){
        return [array.slice(array.length -1)[0][0].toUpperCase() + array[0].substring(1)];
    }
    const res = capitalizeFirst(array.slice(0, -1));
    const string = array.slice(array.length -1)[0][0].toUpperCase() + array.slice(array.length -1)[0].substring(1);
    res.push(string);
    return res;
}



let arr = ['cat', 'dog', 'human', 'tiger'];

console.log(capitalizeFirst(arr)); // will return [ 'Cat', 'Dog', 'Human', 'Tiger' ]