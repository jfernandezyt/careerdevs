/*Repeat a given string str (first argument) for num times (second argument). 
Return an empty string if num is not a positive number. 
For the purpose of this challenge, do not use the built-in .repeat() method.*/

function repeatStringNumTimes(str, num) {
    let tempStr = "";
    if (num < 1) {
        return ""
    } else {
        for (let i = 0; i < num; i++) {
            tempStr += str;
        }
        return tempStr;
    }

}

console.log(repeatStringNumTimes("abc", 3));