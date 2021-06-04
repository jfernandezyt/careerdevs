function myFunction(){
    let input = document.getElementById("input");
    let element = document.getElementById("result");
    let key = '8fa5c47036ab6cbe5e9d50389fcc2f78';
    let url = "https://api.openweathermap.org/data/2.5/weather";
    let params = `?q=${input.value}&units=imperial&appid=${key}`;
    url += params;

    let xhr = new XMLHttpRequest();

    xhr.open("GET", url);

    xhr.onload = function(parameterEvent){
        console.log(JSON.parse(this.responseText));
        let weather = JSON.parse(this.responseText);
        let knots = (weather.wind.speed * .868976);
        //console.log(element)
        if(!element){
            element = document.createElement("div");
            console.log(element, 2)
        }else{
            element.innerText = " "
            console.log(element, 1)
        }
        element.id = "result";
        if(weather.main.temp > 38 && weather.main.temp < 99 && knots < 24){
            element.innerText = "All good for launch";
        }else{
            element.innerText = `We can not launch temperature is ${weather.main.temp}, and wind speed in (knots) is ${knots}`
        }
        document.body.appendChild(element)
    }
    
    xhr.send();
    
}