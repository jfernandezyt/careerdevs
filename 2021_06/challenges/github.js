/*
XHR	definition- (XMLHttpRequest) an API in the form of an object, used to transfer data 	
between a web browser and web server. Used to retrieve data with the 	
purpose of constantly changing the already loaded web page. Can be used with 	
protocols other than HTTP. Data can be in the form of XML, HTML or plain text but 	
JSON is mostly used.


AJAX definition - (Asynchronous Javascript and XML) is a set of web developement 
techniques using web api's on the client-side to create asynchronous web apps. 
This technique allows the developer to make calls to udpate already loaded webpages. 
As already stated this technique uses web api's and that includes XHR. It is a group of technologies.

 */



//window.onload =  myFunction();

function myFunction(){
    // 1) Creating an instance of an XMLHttpRequest
    let element = document.createElement("div");
    let element1 = document.createElement("img");
    let btn = document.getElementById("btn");
    btn.remove();
    let xhr = new XMLHttpRequest();
    let url = 'https://api.github.com/users';
    //console.log(xhr.status,1)
    // console.log(xhr.readyState,'a')
    // 2) Open the Http Request 
    xhr.open("GET", url)
    //console.log(xhr.status,2)
    // console.log(xhr.readyState,'b')
    // 3) Create onload callback to handle response
    xhr.onload = function (ProgressEvent) {
        if(ProgressEvent){
            console.log('hererererere')
            console.log(ProgressEvent , 1111111);
        }
        /************************************** */
        let temp = JSON.parse(this.responseText);
        console.log(temp);
        element.innerText = temp[0].login;
        element1.src= temp[0].avatar_url
        /*************************************** */
    }

    //console.log(xhr.responseText, "response text")
    //console.log(xhr.status,4)
    // console.log(xhr.readyState,'d')
    // 4) Send our XMLHttpRequest to be fulfilled or not 
    xhr.send();
    //console.log(xhr.status,5)
    // console.log(xhr.readyState,'e')

    document.body.appendChild(element);
    document.body.appendChild(element1);
}