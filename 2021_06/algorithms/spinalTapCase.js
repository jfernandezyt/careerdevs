/*

Convert a string to spinal case. Spinal case is all-lowercase-words-joined-by-dashes.
*/

hasCapital = new RegExp(/[A-Z]+/, 'g');
wantedResult = new RegExp(/[a-z,-]/, 'g');

function spinalCase(str) {
    let hasSpaces, wantedResult, test, total = 0;

    hasSpaces = new RegExp(/[' ', _ , -]+/, 'g');
    wantedResult = new RegExp(/[a-z,-]/, 'g');

    str = str.replace(hasSpaces, '-');
    test = str.toLowerCase();

    while (wantedResult.exec(test) !== null) {
        total++;
    }

    if(total === str.length){
        return str.toLowerCase();
    }
}
console.log(spinalCase('AllThe-small Things'));
/*
This Is Spinal Tap
thisIsSpinalTap
The_Andy_Griffith_Show
Teletubbies say Eh-oh
AllThe-small Things
*/