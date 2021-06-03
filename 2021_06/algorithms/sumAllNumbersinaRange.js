/*
We'll pass you an array of two numbers. Return the sum of those two numbers plus the sum of all the numbers between them. The lowest number will not always come first.

For example, sumAll([4,1]) should return 10 because sum of all the numbers between 1 and 4 (both inclusive) is 10.
*/

function sumAll(arr){
    let nextNum, sum;
    arr.sort((a, b) => {return a-b});
    nextNum = arr[0] + 1
    sum = arr[0];
    while(nextNum <= arr[1]){
        sum += nextNum
        nextNum++;
    }
    return sum;
}

console.log(sumAll([50,20]));
