/*
We have:
small bricks (1 inch each).
big bricks (5 inches each).
A goal length (in inches) to achieve.
The goal is to decide if we can combine the small and big bricks to exactly reach the goal.
*/

function makeBricks(small, big, goal) {
 //Get the number of big bricks needed:
 const bigBricks = Math.min(big, Math.floor(goal / 5));
 //Get the remaining goal after using big bricks:
 const remainingGoal = goal - bigBricks * 5;
// Check if the remaining goal can be achieved with small bricks:
 return small >= remainingGoal;
}