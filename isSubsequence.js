// isSubsequence takes in two strings and checks whether the characters in the first string form a subsequence of the characters in the second string. In other words, the function should check whether the characters in the first string appear somewhere in the second string, 

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

console.log(isSubsequence('is', 'this is a text')); // returns true
console.log(isSubsequence('not', 'this is a text'));// false