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



window.onload =  myFunction();

function myFunction(){
    let xhr = new XMLHttpRequest();
    let url = 'https://api.github.com/users';
    xhr.open("GET", url)

    xhr.onload = function(e){
        if(e){
            console.log(e);
        }
        let temp = JSON.parse(this.responseText);

        console.log(temp);
    }

    xhr.send();
}