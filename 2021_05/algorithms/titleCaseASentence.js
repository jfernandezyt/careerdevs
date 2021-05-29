/*
Return the provided string with the first letter of each word capitalized. Make sure the rest of the word is in lower case.

For the purpose of this exercise, you should also capitalize connecting words like the and of.
*/

function titleCase(str) {
    let arr = str.split(' ');
    let arr1 =[]

    for (let i = 0; i < arr.length; i++) {
        arr1.push(arr[i][0].toUpperCase());
        for (let j = 0; j < arr[i].length; j++) {
            if (j !== 0) {
                arr1[i] += arr[i][j].toLowerCase()
            }
        }
    }
    return arr1.join(" ");
}

titleCase("asd asdasd wwwsd");