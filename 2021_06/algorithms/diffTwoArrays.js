/*
Compare two arrays and return a new array with any items only found in one of the two given arrays, but not both. In other words, return the symmetric difference of the two arrays.

Note: You can return the array with its elements in any order.

*/

function diffArray(arr1, arr2) {
    let newArr, counter, bigger,smaller;
    newArr = []
    bigger = (arr1.length > arr2.length) ? arr1 : arr2;
    smaller = (arr1.length > arr2.length) ? arr2 : arr1;
    counter = 0;
    bigger.forEach(element =>{
        if(smaller.indexOf(element) === -1){
            newArr.push(element);
        }
    });
    smaller.forEach(element =>{
        if(bigger.indexOf(element) === -1){
            newArr.push(element);
        }
    });
/*
    newArr = [];

    for (let i = 0; i < max; i++) {
        if (arr1.length > arr2.length) {
            if (arr1[i]) {
                if (arr2.indexOf(arr1[i]) === -1) {
                    newArr.push(arr1[i])
                }

            }
        } else {
            if (arr2[i]) {
                if (arr1.indexOf(arr2[i]) === -1) {
                    newArr.push(arr2[i])
                }
            }
        }
    }
    */
    return newArr;
    
}

console.log(diffArray(["andesite", "grass", "dirt", "pink wool", "dead shrub"], ["diorite", "andesite", "grass", "dirt", "dead shrub"]));