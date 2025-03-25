[1, 4, 6, 9, 11, 13, 17, 19, 21, 23].reduce((a, _, __, arr) => {
    console.log(arr.splice(0, ++a));
    return a;
}, 0);