/**
 Convert the characters &, <, >, " (double quote), and ' (apostrophe), in a string to their corresponding HTML entities.
 */

function convertHTML(str) {

    for (let i = 0; i < str.length; i++) {
        if(str[i] === "&"){
            str = str.slice(0, i) + "&amp;" + str.slice(i + 1);
        }else if(str[i] === "<"){
            str = str.slice(0, i) + "&lt;" + str.slice(i + 1);
        }else if(str[i] === ">"){
            str = str.slice(0, i) + "&gt;" + str.slice(i + 1);
        }else if(str[i] === '"'){
            str = str.slice(0, i) + "&quot;" + str.slice(i + 1);
        }else if(str[i] === "'"){
            str = str.slice(0, i) + "&apos;" + str.slice(i + 1);
        }
        
    }
    return str;
}

console.log(convertHTML('Stuff in "quotation marks"'));