/*

We'll pass you an array of two numbers. Return the sum of those two numbers plus the sum of all the numbers between them. The lowest number will not always come first.

For example, sumAll([4,1]) should return 10 because sum of all the numbers between 1 and 4 (both inclusive) is 10.
*/


function sumAll(arr) {
    let counter, difference, sum, range = [];
    counter = 1;
    arr.sort( (a, b) => {return a-b});
    difference = arr[1] - arr[0];
    range.push(arr[0])

    while(counter < difference){
        console.log(counter, "counter")
        range.push(arr[0] + counter);
        counter++;
    }

    range.push(arr[1]);

    for(let i = 0; i < range.length; i++){
        sum += range[i];
    }

    //return sum;
}

sumAll([1, 4])