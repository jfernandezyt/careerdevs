/**
Create a function that sums two arguments together. If only one argument is provided, then return a function that expects one argument and returns the sum.

For example, addTogether(2, 3) should return 5, and addTogether(2) should return a function.

Calling this returned function with a single argument will then return the sum:

var sumTwoAnd = addTogether(2);

sumTwoAnd(3) returns 5.

If either argument isn't a valid number, return undefined.
 */

function addTogether() {
    function isNumber(num){
        if(typeof num === "number"){
            return true;
        }else {
            return false;
        }
    }

    if(arguments.length === 2){
        if(isNumber(arguments[0]) && isNumber(arguments[1])){
            return arguments[0] + arguments[1];
        }else{
            return undefined;
        }
    }else if(arguments.length === 1){        
        if(isNumber(arguments[0])){
            return (temp) => {
                if(isNumber(temp)){
                    return arguments[0] + temp;
                }else {
                    return undefined;
                }
            };
        }else{
            return undefined;
        }
    }else{
        return undefined;
    }
}

let expectSecond = addTogether(5)(7)
console.log(expectSecond)