/*
The DNA strand is missing the pairing element. Take each character, get its pair, and return the results as a 2d array.

Base pairs are a pair of AT and CG. Match the missing element to the provided character.

Return the provided character as the first element in each array.

For example, for the input GCG, return [["G", "C"], ["C","G"], ["G", "C"]]

The character and its pair are paired up in an array, and all the arrays are grouped into one encapsulating array.

*/

function pairElement(str) {
    let pairHolder = [];

    for (let i = 0; i < str.length; i++) {
        const element = str[i];
        if(element === 'A'){
            let tempArr = [element, "T"];
            pairHolder.push(tempArr);
        }else if(element === 'T'){
            let tempArr = [element, "A"];
            pairHolder.push(tempArr);
        }else if(element === 'C'){
            let tempArr = [element, "G"];
            pairHolder.push(tempArr);
        }else if(element === 'G'){
            let tempArr = [element, "C"];
            pairHolder.push(tempArr);
        }
    }
    return pairHolder;
  }

  console.log(pairElement("GCG"))