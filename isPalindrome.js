
// isPalindrome for numbers
function isPalindrome(x){
    if(x < 0 || (x % 10 === 0 && x !==0))return false; 
    let temp = 0;
    let org = x;
    while(x !== 0){
        temp = temp * 10 + x % 10;
        x = parseInt(x /10);
    }
    return org === temp;
}

console.log(isPalindrome(12321));//returns true
console.log(isPalindrome(123));//returns false