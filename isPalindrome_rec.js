// isPalindrome using recursive function

function isPalindrome(str){
    if(str.length === 1)return true;
    if(str[0] === str.slice(-1))return isPalindrome(str.slice(1, -1));
    return false; 
}

console.log(isPalindrome("txt"));// true
console.log(isPalindrome("bobcat"));// false