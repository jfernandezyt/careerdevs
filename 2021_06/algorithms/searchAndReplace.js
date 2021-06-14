/**
 

Perform a search and replace on the sentence using the arguments provided and return the new sentence.

First argument is the sentence to perform the search and replace on.

Second argument is the word that you will be replacing (before).

Third argument is what you will be replacing the second argument with (after).

Note: Preserve the case of the first character in the original word when you are replacing it. For example if you mean to replace the word Book with the word dog, it should be replaced as Dog

 
 */

function myReplace(str, before, after) {
    let hasCapital, firstCharacterBefore, firstCharacterAfter;

    hasCapital = new RegExp(/^[A-Z]/, 'g');
    firstCharacterBefore = before.slice(0, 1);

    if(hasCapital.test(firstCharacterBefore)){
        firstCharacterAfter = after.slice(0, 1);
        firstCharacterAfter = firstCharacterAfter.toUpperCase();
        after = firstCharacterAfter + after.slice(1);
        str = str.replace(before, after)
    }else if(!hasCapital.test(firstCharacterBefore)){
        after = after.toLowerCase();
        str = str.replace(before, after);
    }
    return str;
  }
  
  console.log(myReplace("A quick brown fox Jumped over the lazy dog", "Jumped", "leaped"));