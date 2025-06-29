// Function that returns the sum of all even numbers in an object (including nested objects)


function nestedEvenSum(obj) {

  if (obj === null || typeof obj !== 'object') {
    return 0;
  }

 
  let sum = 0;

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'number' && value % 2 === 0) {
      sum += value;
    } else if (typeof value === 'object' && value !== null) {
      sum += nestedEvenSum(value);
    }
  }

  return sum;
}


function nestedEvenSumModern(obj) {
  if (obj === null || typeof obj !== 'object') {
    return 0;
  }

  return Object.values(obj).reduce((sum, value) => {
    if (typeof value === 'number' && value % 2 === 0) {
      return sum + value;
    } else if (typeof value === 'object' && value !== null) {
      return sum + nestedEvenSumModern(value);
    } else {
      return sum;
    }
  }, 0);
}


function nestedEvenSumWithArrays(obj) {
  if (obj === null || typeof obj !== 'object') {
    return 0;
  }

  let sum = 0;

  if (Array.isArray(obj)) {
    for (const item of obj) {
      if (typeof item === 'number' && item % 2 === 0) {
        sum += item;
      } else if (typeof item === 'object' && item !== null) {
        sum += nestedEvenSumWithArrays(item);
      }
    }
  } else {
    for (const key in obj) {
      const value = obj[key];

      if (typeof value === 'number' && value % 2 === 0) {
        sum += value;
      } else if (typeof value === 'object' && value !== null) {
        sum += nestedEvenSumWithArrays(value);
      }
    }
  }

  return sum;
}


function nestedEvenSumWithTracking(obj, path = '') {
  const evenNumbers = [];

  function traverse(current, currentPath) {
    if (current === null || typeof current !== 'object') {
      return 0;
    }

    let sum = 0;

    for (const key in current) {
      const value = current[key];
      const fullPath = currentPath ? `${currentPath}.${key}` : key;

      if (typeof value === 'number' && value % 2 === 0) {
        sum += value;
        evenNumbers.push({
          path: fullPath,
          value: value
        });
      } else if (typeof value === 'object' && value !== null) {
        sum += traverse(value, fullPath);
      }
    }

    return sum;
  }

  const total = traverse(obj, path);

  return {
    sum: total,
    evenNumbers: evenNumbers,
    count: evenNumbers.length
  };
}


function nestedEvenSumIterative(obj) {
  if (obj === null || typeof obj !== 'object') {
    return 0;
  }

  const stack = [obj];
  let sum = 0;

  while (stack.length > 0) {
    const current = stack.pop();

    if (current === null || typeof current !== 'object') {
      continue;
    }

    for (const key in current) {
      const value = current[key];

      if (typeof value === 'number' && value % 2 === 0) {
        sum += value;
      } else if (typeof value === 'object' && value !== null) {
        stack.push(value);
      }
    }
  }

  return sum;
}


function nestedEvenSumRobust(obj) {
  if (obj === undefined) {
    throw new Error('Input cannot be undefined');
  }

  if (obj === null || typeof obj !== 'object') {
    return 0;
  }

  return nestedEvenSum(obj);
}


function nestedNumberSum(obj, condition = (num) => num % 2 === 0) {
  if (obj === null || typeof obj !== 'object') {
    return 0;
  }

  let sum = 0;

  for (const key in obj) {
    const value = obj[key];

    if (typeof value === 'number' && condition(value)) {
      sum += value;
    } else if (typeof value === 'object' && value !== null) {
      sum += nestedNumberSum(value, condition);
    }
  }

  return sum;
}


const obj1 = {
  outer: 2,
  obj: {
    inner: 2,
    otherObj: {
      superInner: 2,
      notANumber: true,
      alsoNotANumber: "yup"
    }
  }
};

const obj2 = {
  a: 2,
  b: { b: 2, bb: { b: 3, bb: { b: 2 } } },
  c: { c: { c: 2 }, cc: 'ball', ccc: 5 },
  d: 1,
  e: { e: { e: 2 }, ee: 'car' }
};

console.log('=== BASIC TESTS ===');
console.log('nestedEvenSum(obj1):', nestedEvenSum(obj1)); 
console.log('nestedEvenSum(obj2):', nestedEvenSum(obj2)); 

console.log('\n=== ALGORITHM COMPARISON ===');
console.log('Original approach:', nestedEvenSum(obj2));
console.log('Modern approach:', nestedEvenSumModern(obj2));
console.log('Iterative approach:', nestedEvenSumIterative(obj2));

console.log('\n=== WITH ARRAYS ===');
const objWithArrays = {
  nums: [1, 2, 3, 4],
  nested: {
    moreNums: [5, 6, 7, 8],
    data: {
      evenMore: [9, 10]
    }
  }
};
console.log('With arrays:', nestedEvenSumWithArrays(objWithArrays)); 

console.log('\n=== WITH TRACKING ===');
const tracked = nestedEvenSumWithTracking(obj2);
console.log('Tracking result:', tracked);

console.log('\n=== CUSTOM CONDITIONS ===');
console.log('Sum of odd numbers:', nestedNumberSum(obj2, num => num % 2 !== 0)); 
console.log('Sum of numbers > 2:', nestedNumberSum(obj2, num => num > 2)); 
console.log('Sum of negative numbers:', nestedNumberSum({
  a: -2, b: { c: -4, d: 5 }, e: -6
}, num => num < 0)); 

console.log('\n=== EDGE CASES ===');
console.log('Null object:', nestedEvenSum(null)); // 0
console.log('Empty object:', nestedEvenSum({})); // 0
console.log('No even numbers:', nestedEvenSum({ a: 1, b: { c: 3, d: 5 } })); // 0
console.log('All even numbers:', nestedEvenSum({ a: 2, b: { c: 4, d: 6 } })); // 12

console.log('\n=== SPECIAL VALUES ===');
console.log('With special numbers:', nestedEvenSum({
  zero: 0,
  negative: -2,
  float: 2.5, // Not an integer, but even when truncated
  infinity: Infinity,
  nan: NaN
}));

console.log('\n=== DEEP NESTING ===');
const deepObject = {
  level1: {
    level2: {
      level3: {
        level4: {
          level5: {
            deepEven: 100
          }
        }
      }
    }
  }
};
console.log('Deep nesting:', nestedEvenSum(deepObject)); // 100

console.log('\n=== PERFORMANCE COMPARISON ===');
const largeObject = {
  section1: { a: 2, b: { c: 4, d: { e: 6 } } },
  section2: { f: 8, g: { h: 10, i: { j: 12 } } },
  section3: { k: 14, l: { m: 16, n: { o: 18 } } }
};

console.time('Recursive approach');
for (let i = 0; i < 10000; i++) {
  nestedEvenSum(largeObject);
}
console.timeEnd('Recursive approach');

console.time('Iterative approach');
for (let i = 0; i < 10000; i++) {
  nestedEvenSumIterative(largeObject);
}
console.timeEnd('Iterative approach');