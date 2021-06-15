/*
Find the smallest common multiple of the provided parameters that can be evenly divided by both, as well as by all sequential numbers in the range between these parameters.

The range will be an array of two numbers that will not necessarily be in numerical order.

For example, if given 1 and 3, find the smallest common multiple of both 1 and 3 that is also evenly divisible by all numbers between 1 and 3. The answer here would be 6.

*/

function smallestCommons(arr) {
    function fillRanges(num1, num2) {
        let difference = num1 - num2;
        let temp = [];
        if (difference < 0) {
            difference *= -1;
        }
        for (let i = 1; i <= difference - 1; i++) {
            if (num1 < num2) {
                temp.push(num1 + i)
            } else if (num1 > num2) {
                temp.push(num2 + i)
            }
        }
        return temp;
    }
    
    let ranges = fillRanges(arr[0], arr[1]);

    function multiples(num1, num2, rangeArr) {
        let divisibleByRanges = false;
        for (let i = 1; i < Infinity; i++) {
            if (i % num1 === 0 && i % num2 === 0) {
                for (let j = 0; j < rangeArr.length; j++) {
                    if (i % rangeArr[j] === 0) {
                        divisibleByRanges = true;
                    } else {
                        divisibleByRanges = false;
                        break;
                    }
                }
                if (divisibleByRanges === true) {
                    return i
                }
            }
        }
    }

    return multiples(arr[0], arr[1], ranges);
}

smallestCommons([23, 18]);