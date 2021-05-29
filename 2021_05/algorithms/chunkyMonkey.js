/*
Write a function that splits an array (first argument) into groups the length of size (second argument) and returns them as a two-dimensional array.
*/

function chunkArrayInGroups(arr, size) {
    let tempArray = [];
    let temp = [];
    let counter = 0;
    for (let i = 0; i < arr.length; i++) {
        temp[counter] = arr[i];
        if (counter === size - 1 || i === arr.length - 1) {
            tempArray.push(temp);
            temp = []
            counter = 0;
        } else {
            counter++;
        }
    }
    return tempArray;
}

chunkArrayInGroups([0, 1, 2, 3, 4, 5], 4)