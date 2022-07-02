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


