
async function myFunction() {
    let newsURL, nasaURL, newsAPI, nasaAPI, weatherAPI;

    /******************************************************************/
    newsAPI = 'b5c7f5212a564d17b994b04e4651330d';

    newsURL = "https://newsapi.org/v2/everything";

    newsParam = `?q="Cardano"&from=${2021 - 05 - 31}&to=${2021 - 05 - 31}&pageSize=10&language=en&sortBy=popularity&apiKey=${newsAPI}`;
    newsURL += newsParam;


    // getAPIInfo(newsURL).then(data => {
    //     //console.log(data);
    //     handleNewsData(data);
    // }).catch(error => console.log(error));  


    /************************************************************** */
    
    nasaAPI = 'aahM9Th6BxVPBrW9SNVxWIdbayUvQpGE3zUHYJb0';
    
    nasaURL = "https://api.nasa.gov/neo/rest/v1/feed";
    let date = "2021-05-31"
    nasaParam = `?start_date=${date}&end_date=${date}&api_key=${nasaAPI}`
    nasaURL += nasaParam;
    console.log(nasaURL)
 
    const nasaHttp = new XMLHttpRequest();
    nasaHttp.open("GET", nasaURL);
    nasaHttp.onload = function (e, data){
        if(e){
            console.log(e)
        }
        console.log(nasaHttp);
    }

    nasaHttp.send();
 
    /***************************************************************** */
  
    weatherAPI = '8fa5c47036ab6cbe5e9d50389fcc2f78';
    weatherURL = "https://api.openweathermap.org/data/2.5/weather";
    
    weatherParam = `?q=Providence&appid=${weatherAPI}`;
    weatherURL += weatherParam;
 
    //using the fetch API to make the request 
    let reponseWeather = fetch(weatherURL)
        .then(response => {return response.json()})
        .catch(error => console.log(error));
    
    reponseWeather.then(data =>{
        //console.log(data);
    })
    .catch(error => console.log(error)); 
}

function getAPIInfo(url) {
    let options = {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }


    let response = fetch(url, options)
        .then(response => { return response.json() })
        .catch(error => {
            //console.log(error)
            return error
        });
    return response; // parses JSON response into native JavaScript objects
}

function handleNewsData(data) {
    let mainDiv = document.getElementById("maindiv");
    let table = document.createElement("table");
    //console.log(mainDiv, table);
    table.appendChild(document.createElement("tr"));
    let keys = Object.keys(data.articles[0]);
    for (let i = 1; i <= keys.length; i++) {
        let temp = document.createElement("th");
        temp.innerText = keys[i];
        table.appendChild(temp);

    }
    //console.log(data);
    table.appendChild(document.createElement("tr"));
    for (let i = 0; i < data.articles.length; i++) {
        for (let j = 1; j <= keys.length; j++) {
            let temp = document.createElement("td");
            //console.log(data.articles[i][keys[j]])
            temp.innerText = data.articles[i][keys[j]];
            table.appendChild(temp);

        }
        table.appendChild(document.createElement("tr"))

    }
    mainDiv.appendChild(table)
    return;
}