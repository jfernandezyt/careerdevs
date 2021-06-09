/*

Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.
*/

function spinalCase(str) {
    let hasSpaces = new RegExp(/[' ', _ , -]+/, 'g');
    let hasCapital = new RegExp(/[A-Z]+/, 'g');
    let arrayIndex = [];
    let temp = "";
    let notCompleted = true;
    let counter = 0;
    str = str.replace(hasSpaces, '-')
    console.log(str)

    while (hasCapital.exec(str) !== null) {
        arrayIndex.push(hasCapital.lastIndex)
    }

    while (notCompleted === true) {
        if (counter === arrayIndex.length) {
            notCompleted = false;
        } else {
            console.log(str[arrayIndex[counter]-1], str[arrayIndex[counter]-2 ])
            if (str[arrayIndex[counter]-2 ] !== undefined && str[arrayIndex[counter]-2 ] !== '-') {
                if (arrayIndex[counter] != 1) {
                    if (counter + 1 === arrayIndex.length) {
                        notCompleted = false;
                        temp += str.slice(arrayIndex[counter] - 1);
                    } else {
                        temp += str.slice(arrayIndex[counter] - 1, arrayIndex[counter + 1] - 1) + '-';
                    }

                } else {
                    temp = str.substr(arrayIndex[counter] - 1, (arrayIndex[counter + 1] - 1)) + '-'
                }
            }
            counter++
        }
    }
    str = str.toLowerCase();
    return str;
}


console.log(spinalCase('AllThe-small Things'));









//str = str.replace(regex, '-');
    //str =  str.toLowerCase();