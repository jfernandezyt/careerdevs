/*
Truncate a string (first argument) if it is longer than the given maximum string length (second argument). 
Return the truncated string with a ... ending.
*/
function truncateString(str, num) {
    let tempStr;
    tempStr = "";
    if(str.length > num){
        for(let i = 0; i < num;i++){
            tempStr += str[i];
        }        
        tempStr += "...";
        return tempStr;
    }
    return str;

}

console.log(truncateString("A-tisket a-tasket A green and yellow basket", 8));