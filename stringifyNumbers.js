// Function that converts all number values in an object to strings (deep conversion)

// Improved version with better null handling and clearer logic
function stringifyNumbers(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    // Handle arrays by preserving them as-is
    if (Array.isArray(obj)) {
        return obj;
    }

    const newObj = {};

    for (const key in obj) {
        const value = obj[key];

        if (typeof value === 'number') {
            newObj[key] = value.toString();
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            newObj[key] = stringifyNumbers(value);
        } else {
            newObj[key] = value;
        }
    }

    return newObj;
}

// Alternative: Version that also handles arrays recursively
function stringifyNumbersIncludingArrays(obj) {
    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(item => stringifyNumbersIncludingArrays(item));
    }

    const newObj = {};

    for (const key in obj) {
        const value = obj[key];

        if (typeof value === 'number') {
            newObj[key] = value.toString();
        } else if (typeof value === 'object') {
            newObj[key] = stringifyNumbersIncludingArrays(value);
        } else {
            newObj[key] = value;
        }
    }

    return newObj;
}

// Version using Object.entries for more modern approach
function stringifyNumbersModern(obj) {
    if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
        return obj;
    }

    return Object.fromEntries(
        Object.entries(obj).map(([key, value]) => {
            if (typeof value === 'number') {
                return [key, value.toString()];
            } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                return [key, stringifyNumbersModern(value)];
            } else {
                return [key, value];
            }
        })
    );
}

// In-place version (mutates original object)
function stringifyNumbersInPlace(obj) {
    if (obj === null || typeof obj !== 'object' || Array.isArray(obj)) {
        return obj;
    }

    for (const key in obj) {
        const value = obj[key];

        if (typeof value === 'number') {
            obj[key] = value.toString();
        } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
            stringifyNumbersInPlace(value);
        }
    }

    return obj;
}

// Robust version with input validation and options
function stringifyNumbersRobust(obj, options = {}) {
    const {
        includeArrays = false,
        skipKeys = [],
        customConverter = null
    } = options;

    if (obj === null || typeof obj !== 'object') {
        return obj;
    }

    if (Array.isArray(obj)) {
        return includeArrays
            ? obj.map(item => stringifyNumbersRobust(item, options))
            : obj;
    }

    const newObj = {};

    for (const key in obj) {
        if (skipKeys.includes(key)) {
            newObj[key] = obj[key];
            continue;
        }

        const value = obj[key];

        if (typeof value === 'number') {
            newObj[key] = customConverter ? customConverter(value) : value.toString();
        } else if (typeof value === 'object' && value !== null) {
            newObj[key] = stringifyNumbersRobust(value, options);
        } else {
            newObj[key] = value;
        }
    }

    return newObj;
}

// Version that tracks what was converted
function stringifyNumbersWithTracking(obj, path = '') {
    const conversions = [];

    function convert(current, currentPath) {
        if (current === null || typeof current !== 'object' || Array.isArray(current)) {
            return current;
        }

        const newObj = {};

        for (const key in current) {
            const value = current[key];
            const fullPath = currentPath ? `${currentPath}.${key}` : key;

            if (typeof value === 'number') {
                newObj[key] = value.toString();
                conversions.push({
                    path: fullPath,
                    originalValue: value,
                    convertedValue: value.toString()
                });
            } else if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                newObj[key] = convert(value, fullPath);
            } else {
                newObj[key] = value;
            }
        }

        return newObj;
    }

    const result = convert(obj, path);

    return {
        result,
        conversions
    };
}

// Test object
const testObj = {
    num: 1,
    test: [],
    data: {
        val: 4,
        info: {
            isRight: true,
            random: 66
        }
    }
};

console.log('=== BASIC TESTS ===');
console.log('Original object:', JSON.stringify(testObj, null, 2));
console.log('Stringified:', JSON.stringify(stringifyNumbers(testObj), null, 2));

console.log('\n=== DIFFERENT APPROACHES ===');
console.log('Including arrays:', JSON.stringify(stringifyNumbersIncludingArrays({
    nums: [1, 2, 3],
    nested: { count: 42 }
}), null, 2));

console.log('Modern approach:', JSON.stringify(stringifyNumbersModern(testObj), null, 2));

console.log('\n=== WITH OPTIONS ===');
console.log('Skip certain keys:', JSON.stringify(stringifyNumbersRobust(testObj, {
    skipKeys: ['random']
}), null, 2));

console.log('Custom converter (hex):', JSON.stringify(stringifyNumbersRobust(testObj, {
    customConverter: (num) => `0x${num.toString(16)}`
}), null, 2));

console.log('\n=== WITH TRACKING ===');
const tracked = stringifyNumbersWithTracking(testObj);
console.log('Conversions made:', tracked.conversions);
console.log('Result:', JSON.stringify(tracked.result, null, 2));

console.log('\n=== EDGE CASES ===');
console.log('Null object:', stringifyNumbers(null));
console.log('Empty object:', stringifyNumbers({}));
console.log('Array only:', stringifyNumbers([1, 2, 3]));
console.log('Nested arrays:', stringifyNumbers({
    data: [1, { num: 2 }, 3]
}));

console.log('Complex nested:', stringifyNumbers({
    level1: {
        level2: {
            level3: {
                deepNumber: 999,
                deepArray: [1, 2],
                deepString: 'hello'
            }
        }
    }
}));

console.log('\n=== SPECIAL VALUES ===');
console.log('With special numbers:', stringifyNumbers({
    infinity: Infinity,
    negInfinity: -Infinity,
    nan: NaN,
    zero: 0,
    negative: -42,
    float: 3.14159
}));

console.log('\n=== IN-PLACE MUTATION TEST ===');
const originalForMutation = {
    num: 1,
    data: { val: 4 }
};
console.log('Before in-place:', JSON.stringify(originalForMutation, null, 2));
stringifyNumbersInPlace(originalForMutation);
console.log('After in-place:', JSON.stringify(originalForMutation, null, 2));

console.log('\n=== PERFORMANCE COMPARISON ===');
const largeObj = {
    level1: { num: 1, data: { num: 2, nested: { num: 3 } } },
    level2: { num: 4, data: { num: 5, nested: { num: 6 } } }
};

console.time('For...in approach');
for (let i = 0; i < 10000; i++) {
    stringifyNumbers(largeObj);
}
console.timeEnd('For...in approach');

console.time('Object.entries approach');
for (let i = 0; i < 10000; i++) {
    stringifyNumbersModern(largeObj);
}
console.timeEnd('Object.entries approach');