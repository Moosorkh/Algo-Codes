function findLongestSubstring(str){
    let start = 0;
    let map = {};
    let longest = 0;
    for(let i = 0; i < str.length; i++){
        let char = str[i];
        if(map[char]){
            start = Math.max(start, map[char]);
        }
        longest = Math.max(longest, i - start + 1);
        map[char] = i + 1;
    }
    return longest;
}

console.log(findLongestSubstring("string")); // returns 6 since none of the contigous characters are repeated.
console.log(findLongestSubstring("text")); // returns 3 since there are only 3 non-repeated contigous characters
