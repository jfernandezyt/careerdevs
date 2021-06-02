async function myFunction() {
    let date = "2021-06-01";
    let mainDiv = document.getElementById("maindiv");
    let url = 'https://api.nasa.gov/planetary/apod'
    let nasaKey = 'aahM9Th6BxVPBrW9SNVxWIdbayUvQpGE3zUHYJb0';
    let parameters = `?date=${date}&api_key=${nasaKey}`;
    let temp;
    let btn = document.getElementById("btn");
    let img = document.createElement("img");
    url += parameters;
    /*
    let Http = new XMLHttpRequest();

    Http.open("GET", url)

    Http.onload = function (e) {
        if (e) {
            console.log(e)
        }
        temp = JSON.parse(this.responseText);
        img.src = temp.url;
        img.alt = "Cool NASA stuff";
        img.width = "200";
        img.height = "200";
        btn.style.display = "none";
        mainDiv.appendChild(img);

    };

    Http.send();
    */

    /*
    temp = await fetch(url)
        .then(data => { return data.json() })
        .then(res => res)
        .catch(error => console.log(error))


    img.src = temp.url;
    img.alt = "Cool NASA stuff";
    img.width = "200";
    img.height = "200";    
    btn.style.display = "none";
    mainDiv.appendChild(img);
*/
}