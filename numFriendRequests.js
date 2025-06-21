/*
There are n persons on a social media website. You are given an integer array ages where ages[i] is the age of the ith person.

A Person x will not send a friend request to a person y (x != y) if any of the following conditions is true:

age[y] <= 0.5 * age[x] + 7
age[y] > age[x]
age[y] > 100 && age[x] < 100
Otherwise, x will send a friend request to y.

Note that if x sends a request to y, y will not necessarily send a request to x. Also, a person will not send a friend request to themself.

Return the total number of friend requests made.

 

Example 1:

Input: ages = [16,16]
Output: 2
Explanation: 2 people friend request each other.
Example 2:

Input: ages = [16,17,18]
Output: 2
Explanation: Friend requests are made 17 -> 16, 18 -> 17.
Example 3:

Input: ages = [20,30,100,110,120]
Output: 3
Explanation: Friend requests are made 110 -> 100, 120 -> 110, 120 -> 100.
 

Constraints:

n == ages.length
1 <= n <= 2 * 104
1 <= ages[i] <= 120
*/


// Solution 1
// Brute Force
// Time Complexity O(n^2)
// Space Complexity O(1)
/**
 * @param {number[]} ages
 * @return {number}
 */
function numFriendRequests(ages) {
    // Create frequency array (0-120)
    const freq = new Array(121).fill(0);

    // Build frequency array
    for (let age of ages) {
        freq[age]++;
    }

    let totalRequests = 0;
    // For each age x, calculate valid requests 
    for (let x = 1; x <= 120; x++) {
        if (freq[x] === 0) continue;

        const minAge = Math.floor(0.5 * x + 7) + 1;

        for (let y = minAge; y <= x; y++) {
      
            if (freq[y] === 0) continue;

            if (y > 100 && x < 100) continue;

            if (x === y) {
                totalRequests += freq[x] * (freq[x] - 1);
            } else {
          
                totalRequests += freq[x] * freq[y];
            }
        }
    }

    return totalRequests;
}