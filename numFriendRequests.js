/*
Friend Requests Problem:
Given an array of ages, calculate how many friend requests will be made.

Friend request rules:
- Person x will NOT send a request to person y if:
  1. age[y] <= 0.5 * age[x] + 7
  2. age[y] > age[x]
  3. age[y] > 100 && age[x] < 100
- Otherwise, x will send a request to y
- People don't send requests to themselves
*/

// Optimized frequency-based solution
// Time Complexity: O(120²) = O(1) since ages are bounded by 120
// Space Complexity: O(120) = O(1)
function numFriendRequests(ages) {
    if (!ages || ages.length === 0) return 0;

    // Create frequency array for ages 1-120
    const ageFrequency = new Array(121).fill(0);

    // Count frequency of each age
    for (const age of ages) {
        ageFrequency[age]++;
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
                // Different ages: all senders send to all receivers
                totalRequests += ageFrequency[senderAge] * ageFrequency[receiverAge];
            }
        }
    }

    return totalRequests;
}

// Brute force solution (for comparison and verification)
// Time Complexity: O(n²)
// Space Complexity: O(1)
function numFriendRequestsBruteForce(ages) {
    if (!ages || ages.length === 0) return 0;

    let totalRequests = 0;

    for (let i = 0; i < ages.length; i++) {
        for (let j = 0; j < ages.length; j++) {
            if (i === j) continue; // Don't send request

            const senderAge = ages[i];
            const receiverAge = ages[j];

            // Check all three conditions
            if (receiverAge <= 0.5 * senderAge + 7) continue;
            if (receiverAge > senderAge) continue;
            if (receiverAge > 100 && senderAge < 100) continue;

            // If none of the conditions are true, send friend request
            totalRequests++;
        }
    }

    return totalRequests;
}

// Helper function to check if x will send request to y
function willSendRequest(senderAge, receiverAge) {
    // Condition 1: age[y] <= 0.5 * age[x] + 7
    if (receiverAge <= 0.5 * senderAge + 7) return false;

    // Condition 2: age[y] > age[x]
    if (receiverAge > senderAge) return false;

    // Condition 3: age[y] > 100 && age[x] < 100
    if (receiverAge > 100 && senderAge < 100) return false;

    return true;
}

// Solution with detailed breakdown for understanding
function numFriendRequestsDetailed(ages) {
    if (!ages || ages.length === 0) return 0;

    const ageFreq = new Array(121).fill(0);

    // Build frequency map
    for (const age of ages) {
        ageFreq[age]++;
    }

    let totalRequests = 0;
    const requestDetails = [];

    for (let x = 1; x <= 120; x++) {
        if (ageFreq[x] === 0) continue;

        for (let y = 1; y <= 120; y++) {
            if (ageFreq[y] === 0) continue;

            if (willSendRequest(x, y)) {
                let requests;
                if (x === y) {
                    // Same age group: n * (n-1) requests
                    requests = ageFreq[x] * (ageFreq[x] - 1);
                } else {
                    // Different age groups: n * m requests
                    requests = ageFreq[x] * ageFreq[y];
                }

                if (requests > 0) {
                    totalRequests += requests;
                    requestDetails.push({
                        senderAge: x,
                        receiverAge: y,
                        senderCount: ageFreq[x],
                        receiverCount: ageFreq[y],
                        requests: requests
                    });
                }
            }
        }
    }

    return { totalRequests, requestDetails };
}

// Robust version with input validation
function numFriendRequestsRobust(ages) {
    if (!Array.isArray(ages)) {
        throw new Error('Input must be an array');
    }

    if (ages.length === 0) return 0;

    if (!ages.every(age => Number.isInteger(age) && age >= 1 && age <= 120)) {
        throw new Error('All ages must be integers between 1 and 120');
    }

    return numFriendRequests(ages);
}

// Test cases
console.log('=== BASIC TESTS ===');
console.log('Test 1 [16,16]:', numFriendRequests([16, 16])); // Expected: 2
console.log('Test 2 [16,17,18]:', numFriendRequests([16, 17, 18])); // Expected: 2
console.log('Test 3 [20,30,100,110,120]:', numFriendRequests([20, 30, 100, 110, 120])); // Expected: 3

console.log('\n=== DETAILED BREAKDOWN ===');
console.log('Detailed [16,16]:', numFriendRequestsDetailed([16, 16]));
console.log('Detailed [16,17,18]:', numFriendRequestsDetailed([16, 17, 18]));

console.log('\n=== VERIFICATION WITH BRUTE FORCE ===');
const testCases = [
    [16, 16],
    [16, 17, 18],
    [20, 30, 100, 110, 120],
    [14, 15, 16, 17, 18, 19, 20],
    [1, 2, 3, 4, 5]
];

testCases.forEach((testCase, index) => {
    const optimized = numFriendRequests(testCase);
    const bruteForce = numFriendRequestsBruteForce(testCase);
    const match = optimized === bruteForce;
    console.log(`Test ${index + 1}: Optimized=${optimized}, BruteForce=${bruteForce}, Match=${match}`);
});

console.log('\n=== EDGE CASES ===');
console.log('Empty array:', numFriendRequests([])); // 0
console.log('Single person:', numFriendRequests([25])); // 0
console.log('All same age:', numFriendRequests([20, 20, 20, 20])); // 12 (4*3)
console.log('No valid requests:', numFriendRequests([1, 2, 3])); // 0

console.log('\n=== CONDITION TESTING ===');
console.log('Will 20 send to 15?', willSendRequest(20, 15)); // false (15 <= 0.5*20+7 = 17)
console.log('Will 20 send to 18?', willSendRequest(20, 18)); // true
console.log('Will 50 send to 110?', willSendRequest(50, 110)); // false (110 > 50)
console.log('Will 110 send to 50?', willSendRequest(110, 50)); // true
console.log('Will 90 send to 110?', willSendRequest(90, 110)); // false (110 > 100 && 90 < 100)

console.log('\n=== PERFORMANCE COMPARISON ===');
const largeTest = Array.from({ length: 1000 }, () => Math.floor(Math.random() * 120) + 1);

console.time('Optimized O(120²)');
numFriendRequests(largeTest);
console.timeEnd('Optimized O(120²)');

console.time('Brute Force O(n²)');
numFriendRequestsBruteForce(largeTest.slice(0, 100)); // Smaller for brute force
console.timeEnd('Brute Force O(n²)');