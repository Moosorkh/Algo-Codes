// collectStrings - Extract all string values from nested objects

// Fixed helper method recursion (corrected original approach)
function collectStrings(obj) {
    let strings = [];
    
    function gatherStrings(o) {
        for (let key in o) {
            if (typeof o[key] === 'string') {
                strings.push(o[key]);
            } else if (typeof o[key] === 'object' && o[key] !== null) {
                gatherStrings(o[key]); // Remove incorrect return statement
            }
        }
    }
    
    gatherStrings(obj);
    return strings;
}

// Pure recursion approach (no helper function)
function collectStringsPure(obj) {
    let strings = [];
    
    for (let key in obj) {
        if (typeof obj[key] === 'string') {
            strings.push(obj[key]);
        } else if (typeof obj[key] === 'object' && obj[key] !== null) {
            strings = strings.concat(collectStringsPure(obj[key]));
        }
    }
    
    return strings;
}

// Modern approach using Object.values and recursion
function collectStringsModern(obj) {
    return Object.values(obj).reduce((acc, value) => {
        if (typeof value === 'string') {
            acc.push(value);
        } else if (typeof value === 'object' && value !== null) {
            acc.push(...collectStringsModern(value));
        }
        return acc;
    }, []);
}

// Robust version with input validation and array handling
function collectStringsRobust(obj) {
    if (obj === null || typeof obj !== 'object') {
        return [];
    }
    
    let strings = [];
    
    function traverse(current) {
        if (Array.isArray(current)) {
            current.forEach(item => traverse(item));
        } else if (typeof current === 'object' && current !== null) {
            Object.values(current).forEach(value => traverse(value));
        } else if (typeof current === 'string') {
            strings.push(current);
        }
    }
    
    traverse(obj);
    return strings;
}

// Test object
const obj = {
    stuff: "cat",
    data: {
        val: {
            thing: {
                info: "dog",
                moreInfo: {
                    evenMoreInfo: {
                        weMadeIt: "fish"
                    }
                }
            }
        }
    }
};

// Test all approaches
console.log('Fixed helper method:', collectStrings(obj));
console.log('Pure recursion:', collectStringsPure(obj));
console.log('Modern approach:', collectStringsModern(obj));
console.log('Robust approach:', collectStringsRobust(obj));

// Test edge cases
console.log('Empty object:', collectStrings({}));
console.log('With arrays:', collectStringsRobust({
    text: "hello",
    items: ["world", { nested: "test" }],
    num: 42
}));