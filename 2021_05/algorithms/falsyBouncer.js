/*
Remove all falsy values from an array.

Falsy values in JavaScript are false, null, 0, "", undefined, and NaN.

Hint: Try converting each value to a Boolean.
*/


function bouncer(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (!Boolean(arr[i])) {
            arr.splice(i, 1);
            i--;
        }
    }
    return arr;
}

console.log(bouncer([7, "ate", "", false, 9]));

