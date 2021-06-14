/*
Find the missing letter in the passed letter range and return it.

If all letters are present in the range, return undefined.

*/

function fearNotLetter(str) {
    let expected, expectedUTFCode;
    
    expected = (str.charCodeAt(str.length - 1) - str.charCodeAt(0)) + 1 

    if(expected === str.length){
        return undefined;
    }else{
        expectedUTFCode = str.charCodeAt(0);
        for(let i = 0; i < str.length; i++) {
            if(expectedUTFCode === str.charCodeAt(i)){
                expectedUTFCode++;
            }else{
                return String.fromCharCode(expectedUTFCode);
            }
        }
    }
    return str;
  }

  console.log(fearNotLetter("abcdefghjklmno"))