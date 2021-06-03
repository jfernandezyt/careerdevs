/*
You will be provided with an initial array (the first argument in the destroyer function), followed by one or more arguments. Remove all elements from the initial array that are of the same value as these arguments.

Note: You have to use the arguments object.
*/

function destroyer() {
    let array = arguments[0];

    for(let i = 1; i < arguments.length; i++){
        for(let j=0; j < array.length; j++){
            if(array[j] === arguments[i]){
                array.splice(j, 1);
                j--;
            }
        }
    }
    return array;
  }
  
  console.log(destroyer(["tree", "hamburger", 53], "tree", 53))