/*
Return true if the string in the first element of the array contains all of the letters of the string in the second element of the array.

For example, ["hello", "Hello"], should return true because all of the letters in the second string are present in the first, ignoring case.

The arguments ["hello", "hey"] should return false because the string hello does not contain a y.

Lastly, ["Alien", "line"], should return true because all of the letters in line are present in Alien.
*/

function mutation(arr) {
    let temp1 , temp2;
    for (let i = 0; i < arr[1].length; i++) {
        temp1 = arr[0].toUpperCase();
        temp2 = arr[1][i].toUpperCase();
        console.log(temp1, temp2);
        if (temp1.indexOf(temp2) === -1) {
            return false;
        }
    }
    return true;
}

console.log(mutation(["hello", "Hello"]))