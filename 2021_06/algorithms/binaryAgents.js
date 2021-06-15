/**
Return an English translated sentence of the passed binary string.

The binary string will be space separated.

 */

function binaryAgent(str) {
    let binaryWords = str.split(' ');
    let wordArray = [];
    for (let i = 0; i < binaryWords.length; i++) {
        const element = binaryWords[i];
        let total = 0;
        for (let j = 0; j < element.length; j++) {
            const binaryCharacter = parseInt(element[j]);
            if (j === 0) {
                if (binaryCharacter === 1) {
                    total += 2 ** 7
                }
            } else if (j === 1) {
                if (binaryCharacter === 1) {
                    total += 2 ** 6
                }
            } else if (j === 2) {
                if (binaryCharacter === 1) {
                    total += 2 ** 5
                }
            } else if (j === 3) {
                if (binaryCharacter === 1) {
                    total += 2 ** 4
                }
            } else if (j === 4) {
                if (binaryCharacter === 1) {
                    total += 2 ** 3
                }
            } else if (j === 5) {
                if (binaryCharacter === 1) {
                    total += 2 ** 2
                }
            } else if (j === 6) {
                if (binaryCharacter === 1) {
                    total += 2 ** 1
                }
            } else if (j === 7) {
                if (binaryCharacter === 1) {
                    total += 2 ** 0
                }
            }

        }
        wordArray.push(String.fromCharCode(total));

    }
    //console.log(wordArray.join(''));
    return wordArray.join('');
}

binaryAgent("01000001 01110010 01100101 01101110 00100111 01110100 00100000 01100010 01101111 01101110 01100110 01101001 01110010 01100101 01110011 00100000 01100110 01110101 01101110 00100001 00111111");