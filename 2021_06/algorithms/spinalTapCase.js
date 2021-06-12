/*

Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.
*/

hasCapital = new RegExp(/[A-Z]+/, 'g');
wantedResult = new RegExp(/[a-z,-]/, 'g');

function spinalCase(str) {
    let hasSpaces, wantedResult, hasCapital, test, total = 0, temp;

    hasSpaces = new RegExp(/[' ', _ , -]+/, 'g');
    wantedResult = new RegExp(/[a-z,-]/, 'g');
    hasCapital = new RegExp(/[A-Z]+/, 'g');

    str = str.replace(hasSpaces, '-');
    test = str.toLowerCase();

    while (wantedResult.exec(test) !== null) {
        total++;
    }

    while (hasCapital.exec(str) !== null) {
        console.log(str[hasCapital.lastIndex - 2]);
        // if(str[hasCapital.lastIndex - 2] != '-'){
        //     temp = str.slice(0, )
        // }
    }

    if(total === str.length){
        return str.toLowerCase();
    }
}
console.log(spinalCase('AllThe-small Things'));
/*
thisIsSpinalTap
AllThe-small Things

Done:
This Is Spinal Tap

The_Andy_Griffith_Show
Teletubbies say Eh-oh

*/