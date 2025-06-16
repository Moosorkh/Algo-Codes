/*
Brick Building Problem:
- Small bricks: 1 inch each
- Big bricks: 5 inches each  
- Goal: Determine if we can combine bricks to exactly reach a target length
*/

// Improved version with better variable names and documentation
function makeBricks(small, big, goal) {
    // Calculate optimal number of big bricks to use
    const maxBigBricksNeeded = Math.floor(goal / 5);
    const bigBricksToUse = Math.min(big, maxBigBricksNeeded);
    
    // Calculate remaining length after using big bricks
    const remainingLength = goal - (bigBricksToUse * 5);
    
    // Check if we have enough small bricks for the remainder
    return small >= remainingLength;
}

// Alternative approach with step-by-step explanation
function makeBricksExplicit(small, big, goal) {
    // Edge case: impossible goal
    if (goal < 0) return false;
    
    // Calculate how many big bricks we ideally want to use
    const idealBigBricks = Math.floor(goal / 5);
    
    // We can only use as many big bricks as we have
    const actualBigBricks = Math.min(big, idealBigBricks);
    
    // Calculate what's left after using big bricks
    const lengthFromBigBricks = actualBigBricks * 5;
    const remainingLength = goal - lengthFromBigBricks;
    
    // Check if small bricks can cover the remainder
    return small >= remainingLength;
}

// Version that returns the actual brick combination
function makeBricksWithSolution(small, big, goal) {
    if (goal < 0) return null;
    
    const bigBricksUsed = Math.min(big, Math.floor(goal / 5));
    const remainingLength = goal - (bigBricksUsed * 5);
    
    if (small >= remainingLength) {
        return {
            possible: true,
            bigBricksUsed,
            smallBricksUsed: remainingLength,
            totalLength: bigBricksUsed * 5 + remainingLength
        };
    }
    
    return {
        possible: false,
        reason: `Need ${remainingLength} small bricks but only have ${small}`
    };
}

// Robust version with input validation
function makeBricksRobust(small, big, goal) {
    // Validate inputs
    if (!Number.isInteger(small) || !Number.isInteger(big) || !Number.isInteger(goal)) {
        throw new Error('All inputs must be integers');
    }
    
    if (small < 0 || big < 0 || goal < 0) {
        throw new Error('All inputs must be non-negative');
    }
    
    return makeBricks(small, big, goal);
}

// Alternative brute force approach (for verification/understanding)
function makeBricksBruteForce(small, big, goal) {
    // Try all possible combinations of big bricks
    for (let bigUsed = 0; bigUsed <= big; bigUsed++) {
        const lengthFromBig = bigUsed * 5;
        const remainingNeeded = goal - lengthFromBig;
        
        // If remaining is achievable with small bricks
        if (remainingNeeded >= 0 && remainingNeeded <= small) {
            return true;
        }
        
        // If we've exceeded the goal, no need to try more big bricks
        if (lengthFromBig > goal) break;
    }
    
    return false;
}

// Test cases
console.log('Basic tests:');
console.log(makeBricks(3, 1, 8)); // true (1 big + 3 small = 5 + 3 = 8)
console.log(makeBricks(3, 1, 9)); // false (1 big + 3 small = 5 + 3 = 8, can't reach 9)
console.log(makeBricks(3, 2, 10)); // true (2 big + 0 small = 10)
console.log(makeBricks(3, 2, 8)); // true (1 big + 3 small = 8)
console.log(makeBricks(6, 1, 11)); // true (1 big + 6 small = 11)

console.log('\nDetailed solutions:');
console.log('Goal 8 with 3 small, 1 big:', makeBricksWithSolution(3, 1, 8));
console.log('Goal 9 with 3 small, 1 big:', makeBricksWithSolution(3, 1, 9));
console.log('Goal 13 with 5 small, 2 big:', makeBricksWithSolution(5, 2, 13));

console.log('\nEdge cases:');
console.log(makeBricks(0, 0, 0)); // true (no bricks needed for goal 0)
console.log(makeBricks(1, 0, 1)); // true (1 small brick for goal 1)
console.log(makeBricks(0, 1, 5)); // true (1 big brick for goal 5)
console.log(makeBricks(0, 1, 6)); // false (can't make 6 with just 1 big brick)
console.log(makeBricks(4, 0, 5)); // false (can't make 5 with just small bricks < 5)

console.log('\nBrute force verification:');
console.log('Brute force (3,1,8):', makeBricksBruteForce(3, 1, 8));
console.log('Brute force (3,1,9):', makeBricksBruteForce(3, 1, 9));

console.log('\nPerformance comparison:');
console.time('Optimized approach');
for (let i = 0; i < 100000; i++) {
    makeBricks(100, 50, 300);
}
console.timeEnd('Optimized approach');

console.time('Brute force approach');
for (let i = 0; i < 100000; i++) {
    makeBricksBruteForce(100, 50, 300);
}
console.timeEnd('Brute force approach');