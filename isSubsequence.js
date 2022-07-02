function isSubsequence(sub, text){
 let i = 0;
 let j = 0;
 if(!sub)return true;
    while(j < text.length){
        if(text[j] === sub[i])i++;
        if(i === sub.length)return true;
        j++;
    }
    return false;
}

console.log(isSubsequence('is', 'this is a text'));