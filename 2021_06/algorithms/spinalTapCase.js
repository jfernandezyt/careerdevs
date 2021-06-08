/*

Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.
*/

function spinalCase(str) {
    let capChars = new RegExp(/[A-Z]/g);
    let hasSpaces = new RegExp("' '+", "g");
    let capitilized;
    if(!hasSpaces.exec(str)){
        while ((capitilized = capChars.exec(str)) !== null) {
            str = str.replace(capitilized[0], '-' + capitilized[0])
          }
    }else if(!hasSpaces.exec(str)){
        str = str.replaceAll(hasSpaces, '-')
    }
    console.log(str)
    return str;
}

spinalCase('thisIsSpinalTap');
console.log();









//str = str.replace(regex, '-');
    //str =  str.toLowerCase();