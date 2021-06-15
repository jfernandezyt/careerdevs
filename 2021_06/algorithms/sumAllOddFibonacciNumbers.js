/*
Given a positive integer num, return the sum of all odd Fibonacci numbers that are less than or equal to num.

The first two numbers in the Fibonacci sequence are 1 and 1. Every additional number in the sequence is the sum of the two previous numbers. The first six numbers of the Fibonacci sequence are 1, 1, 2, 3, 5 and 8.

For example, sumFibs(10) should return 10 because all odd Fibonacci numbers less than or equal to 10 are 1, 1, 3, and 5.

*/


function sumFibs(num) {
    let previousNumber = 1, currentNumber = 1, oddTotal = 2, evenTotal;
    // 1+1 = 2
    // 2+1 = 3
    // 3+2 = 5
    // 5+3 = 8

    while(currentNumber <= num){
        if(!(currentNumber % 2 === 0) && currentNumber != 1){
            oddTotal += currentNumber; // 2 + 3 = 5
            evenTotal = previousNumber + currentNumber; // 2 + 3 = 5
            previousNumber = currentNumber // previous Number is now 3
            currentNumber = evenTotal; //current number now is 5
        }else{
            evenTotal = previousNumber + currentNumber; 
            previousNumber = currentNumber;
            currentNumber = evenTotal; 
        }
    }
    return oddTotal;
}




console.log(sumFibs(75024));