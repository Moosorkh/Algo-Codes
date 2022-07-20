//collectStrins accepts an object and returns an array of all the values in the object that have a typeof string

function collectStrings(obj){
    let newStringArr = [];
    for(let str in obj){
        if(typeof obj[str] === 'string'){
            newStringArr.push(obj[str]);
        }else if(typeof obj[str] === 'object'){
            newStringArr = newStringArr.concat(collectStrings(obj[str]));
        }
    }
    return newStringArr;
}

const obj = {
    stuff: "foo",
    data: {
        val: {
            thing: {
                info: "bar",
                moreInfo: {
                    evenMoreInfo: {
                        weMadeIt: "baz"
                    }
                }
            }
        }
    }
}

console.log(collectStrings(obj)); // ["foo", "bar", "baz"])