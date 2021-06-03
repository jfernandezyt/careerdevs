/*
Make a function that looks through an array of objects (first argument) and returns an array of all objects that have matching name and value pairs (second argument). 
Each name and value pair of the source object has to be present in the object from the collection if it is to be included in the returned array.

For example, if the first argument is [{ first: "Romeo", last: "Montague" }, { first: "Mercutio", last: null }, { first: "Tybalt", last: "Capulet" }], 
and the second argument is { last: "Capulet" }, then you must return the third object from the array (the first argument), 
because it contains the name and its value, that was passed on as the second argument.
*/

function whatIsInAName(collection, source) {
    var arr = [];
    let sKeys = Object.keys(source);
    let isMatch = false;
    let matchCnt = 0;
    for (let i = 0; i < collection.length; i++) {
        let cKeys = Object.keys(collection[i]);
        
        for (let j = 0; j < sKeys.length ; j++ ) {
            for(let k =0; k< cKeys.length; k++){
                //console.log(sKeys[j], cKeys[k], collection[i][cKeys[k]], source[sKeys[j]])
                if (sKeys[j] === cKeys[k] && collection[i][cKeys[k]] === source[sKeys[j]]) {
                    //console.log("it matches ")
                    isMatch = true;
                    matchCnt++;
                    //console.log(matchCnt, sKeys.length)
                }
            }
            
        }
        if(matchCnt !== sKeys.length){
            isMatch = false;
        }else if(isMatch === true){
            arr.push(collection[i]);
            
        }
        matchCnt = 0;            
    }
    //console.log(arr);
    return arr;
}
whatIsInAName([{ "apple": 1, "bat": 2 }, { "apple": 1 }, { "apple": 1, "bat": 2, "cookie": 2 }, { "bat":2 }], { "apple": 1, "bat": 2 })
//console.log(whatIsInAName([{ "apple": 1, "bat": 2 }, { "bat": 2 }, { "apple": 1, "bat": 2, "cookie": 2 }], { "apple": 1, "bat": 2 }));