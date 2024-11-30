// a function that takes an object and finds all of the values which are numbers and converts them to strings

function stringifyNumbers(obj){
    let newObj = {};
    for(let key in obj){
        if(typeof obj[key] === 'number'){
            newObj[key] = obj[key].toString();
        }else if(typeof obj[key] === 'object' && !Array.isArray(obj[key])){
            newObj[key] = stringifyNumbers(obj[key]);
        }else{
            newObj[key] = obj[key];
        }
    }
    return newObj;
}

//This is before: 

let obj = {
    num: 1,
    test: [],
    data: {
        val: 4,
        info: {
            isRight: true,
            random: 66
        }
    }
}

console.log(stringifyNumbers(obj));

// And here is how the output is going to look like. 
/*
{
    num: "1",
    test: [],
    data: {
        val: "4",
        info: {
            isRight: true,
            random: "66"
        }
    }
}
*/