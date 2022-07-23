//collectStrings with Helper Method Recursion

function collectStrings(obj){
    let newStr = [];
    function gatherStr(o){
        for(let k in o){
            if(typeof o[k] === 'string'){
                newStr.push(o[k]);
            }else if(typeof o[k] === 'object'){
                return gatherStr(o[k]);
            }
        }
    }
    gatherStr(obj);
    return newStr;
}

const obj = {
    stuff: "cat",
    data: {
        val: {
            thing: {
                info: "dog",
                moreInfo: {
                    evenMoreInfo: {
                        weMadeIt: "fish"
                    }
                }
            }
        }
    }
}

console.log(collectStrings(obj)); // ["cat", "dog", "fish"])