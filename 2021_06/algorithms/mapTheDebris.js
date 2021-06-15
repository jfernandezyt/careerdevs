
/*
Return a new array that transforms the elements' average altitude into their orbital periods (in seconds).

The array will contain objects in the format {name: 'name', avgAlt: avgAlt}.

You can read about orbital periods on Wikipedia.

The values should be rounded to the nearest whole number. The body being orbited is Earth.

The radius of the earth is 6367.4447 kilometers, and the GM value of earth is 398600.4418 km3s-2.
*/


function orbitalPeriod(arr) {
    let GM = 398600.4418;
    let earthRadius = 6367.4447;
    let array = [];

    let calculate = function (object) {
        let orbitalperiod = Math.round((2 * Math.PI) * (Math.sqrt((earthRadius + object.avgAlt) ** 3 / GM)));
        return {name: object.name, orbitalPeriod: orbitalperiod}
    }
    
    for(let element in arr){
        console.log(arr[element])
        array.push(calculate(arr[element]));
    }
    return array;
}

console.log(orbitalPeriod([{ name: "sputnik", avgAlt: 35873.5553 }]))