// isPalindrome using recursive function
// a palindrome word is one that can read the same if reversed example: tacocat

function isPalindrome(str){
    if(str.length === 1)return true;
    if(str[0] === str.slice(-1))return isPalindrome(str.slice(1, -1));
    return false; 
}

console.log(isPalindrome("txt"));// true
console.log(isPalindrome("bobcat"));// false