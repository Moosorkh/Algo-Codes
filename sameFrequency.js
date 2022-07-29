// With the sameFrequency function, given two positive integers,
// it finds out if the two numbers have the same frequency of digits

function sameFrequency(num, num2){
let arr = [];
let arr2 = [];
const map = {};
let i = 0;
let j = 0;
while(num > 0){
  arr[i] = num%10;
  num = Math.floor(num/10);
  i++;
}
while(num2 > 0){
  arr2[j] = num2%10;
  num2 = Math.floor(num2/10);
  j++;
}

if(arr.length !== arr2.length)return false;

for(let i = 0; i < arr.length; i++){
  let temp = arr[i];
  map[temp]? map[temp] +=1 : map[temp] = 1;
}
for(let i = 0; i < arr2.length; i++){
  let temp = arr2[i];
  if(!map[temp]){
    return false;
  }else{
    map[temp] -= 1;
  }
} 
  return true;
}  

console.log(sameFrequency(123456, 654321));// returns true the numbers passed have the same frequency of digits
console.log(sameFrequency(33445566, 34345656));// true
console.log(sameFrequency(222, 22)); // false
