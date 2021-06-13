/*
Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.
*/

function spinalCase(str) {
    let hasSpaces, wantedResult, hasCapital, arr = [], extraCapitalLet = [], tempString = '', goodString;

    hasSpaces = new RegExp(/[' ', _ , -]+/, 'g');
    wantedResult = new RegExp(/[a-z,-]/, 'g');
    hasCapital = new RegExp(/[A-Z]+/, 'g');

    str = str.replace(hasSpaces, '-');

    arr = str.split(hasSpaces);
    
    arr.forEach(element => {
        let total = 0;
        let temp = [];
        while (hasCapital.exec(element) !== null) {
            temp.push(hasCapital.lastIndex - 1);
            total++
        }
        if(total > 1){
            if(temp[0] === 0){
                total -= 1;
            }
            extraCapitalLet = temp.slice(-1 * total);
        }else{
            goodString = arr.join('-');
        }
    });
    if(extraCapitalLet.length  === 0){
        return goodString.toLowerCase();
    }else{
        tempString += str.slice(0, extraCapitalLet[0]);
        for (let i = 0; i < extraCapitalLet.length; i++) {
            const index = extraCapitalLet[i];
            if(extraCapitalLet.length > 1 && i !== extraCapitalLet.length - 1 ){
                tempString += '-' + str.slice(index, extraCapitalLet[i + 1]);
            }else{
                tempString += '-' + str.slice(index);
            }            
        }
        return tempString.toLowerCase();
    }  
}
console.log(spinalCase('This Is Spinal Tap'), 1)
/*
thisIsSpinalTap
AllThe-small Things

Done:
This Is Spinal Tap

The_Andy_Griffith_Show
Teletubbies say Eh-oh

*/