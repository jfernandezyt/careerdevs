/*
You are given two arrays and an index.

Copy each element of the first array into the second array, in order.

Begin inserting elements at index n of the second array.

Return the resulting array. The input arrays should remain the same after the function runs.
*/

function frankenSplice(arr1, arr2, n) {
    let old = [], difference;
    let temp1 = [], temp2 = [];
    temp1 = arr1;
    temp2 = arr2.slice(0);
    difference = temp2.length - n;

    for(let i=0; i < difference; i++){
        old.push(temp2[n +i]);
    }
    
    for(let i=0; i < arr1.length; i++){
        temp2[n + i] = temp1[i];
    }
    return temp2.concat(old);
    
}
console.log(frankenSplice(["claw", "tentacle"], ["head", "shoulders", "knees", "toes"], 2));