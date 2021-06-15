/*
Flatten a nested array. You must account for varying levels of nesting.
*/
function steamrollArray(arr) {
    let newArr = [];
    function handleArray(temp) {
        let tempArr = [];        
        if (Array.isArray(temp)) {
            for(let i = 0; i < temp.length; i ++){
                while(Array.isArray(temp[i])){
                    //console.log(temp[i], "this is line 13");
                    temp[i] = handleArray(temp[i])[0]
                }
                tempArr.push(temp[i]);
            }
        }else{
            tempArr.push(temp);
        }
        return tempArr;
    }

    for (let i = 0; i < arr.length; i++) {
        //console.log(arr[i], "line 25")
        if(Array.isArray(arr[i])){
            let handled = handleArray(arr[i]);
            //console.log(handled, "line 28");
            for (let j = 0; j < handled.length; j++) {
                newArr.push(handled[j]);
            }
        }else{
            //console.log(arr[i], "this is line 33")
            newArr.push(arr[i])
        }
        
    }
    return newArr;

}

console.log(steamrollArray([[["a"]], [["b"]]]), 'line 42');