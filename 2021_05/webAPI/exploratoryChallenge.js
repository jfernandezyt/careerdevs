function myFunction() {
    let date, newsReq, newsURL, nasaURL, newsAPI, nasaAPI;
    date = document.getElementById("date");
    newsAPI = 'b5c7f5212a564d17b994b04e4651330d';
    nasaAPI = 'aahM9Th6BxVPBrW9SNVxWIdbayUvQpGE3zUHYJb0';
    
    newsURL = "https://newsapi.org/v2/everything";
    nasaURL = "https://api.nasa.gov/neo/rest/v1/feed";

    newsParam = `?q="Cardano"&from=${date.value}&to=${date.value}&pageSize=10&language=en&sortBy=popularity`;
    newsURL += newsParam;

    nasaParam = `?start_date=${date.value}&end_date=${date.value}&api_key=${nasaAPI}`
    nasaURL += nasaParam;

    newsReq = new XMLHttpRequest();

    newsReq.open("GET", newsURL);    
    newsReq.setRequestHeader("X-Api-Key", newsAPI);
    newsReq.send();

    newsReq.onreadystatechange = function(){
        if(this.readyState == 4 && this.status == 200){
            console.log(newsReq.responseText);
        }
    }
    
    $.get(nasaURL,function(data, status){
        console.log(status)
        console.log(`${data.near_earth_objects[date.value][0].name}`);
    })
}