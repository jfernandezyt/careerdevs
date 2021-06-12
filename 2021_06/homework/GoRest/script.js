const key = returnKey();

function validate(element) {

    if (element.value == "" || element.value.trim() == "") {
        element.className = "error"
        return false;
    } else {
        element.className = "";
        return true;
    }
}

function getUser() {
    let input, id;
    input = document.getElementById("getid");
    if (input) {
        id = input.value;
        handleRequest("GET", id);
    }
    return;
}

function createUser() {
    let nameInput, emailInput, genderInput, name, email, gender, param;

    nameInput = document.getElementById("namepost");
    emailInput = document.getElementById("emailpost");
    genderInput = document.getElementsByName("genderpost");

    if (nameInput && emailInput && genderInput) {
        name = nameInput.value;
        email = emailInput.value;
        gender = genderInput[0].value;
        param = `{"name":"${name}", "email":"${email}", "status":"Active", "gender":"${gender}"}`;
        handleRequest("POST", param)
    }
}

function getUsersForPut() {
    let inputId, id, nameInput, emailInput, genderInput, statusInput;

    nameInput = document.getElementById("nameput");
    emailInput = document.getElementById("emailput");
    genderInput = document.getElementsByName("genderput");
    statusInput = document.getElementsByName("statusput");
    inputId = document.getElementById("putid");
    id = inputId.value;

    $.get(`https://gorest.co.in/public-api/users/${id}`, function (user) {
        //console.log(user);
        nameInput.value = user.data.name
        emailInput.value = user.data.email
        genderInput.value = user.data.gender
        statusInput.value = user.data.status
    });
}

function updateUser() {
    let inputId, id, nameInput, emailInput, genderInput, statusInput, name, email, gender, param;

    nameInput = document.getElementById("nameput");
    emailInput = document.getElementById("emailput");
    genderInput = document.getElementsByName("genderput");
    statusInput = document.getElementsByName("statusput");
    inputId = document.getElementById("putid");

    if (nameInput && emailInput && genderInput && statusInput && inputId) {
        id = inputId.value;
        name = nameInput.value;
        email = emailInput.value;
        gender = genderInput[0].value;
        status = statusInput[0].value;
        param = `{"name":"${name}", "email":"${email}", "status":"${status}", "gender":"${gender}"}`;
        handleRequest("PUT", param, id);
    }
}

function deleteUser() {
    let input, id;
    input = document.getElementById("delid");
    if (input) {
        id = input.value;
        handleRequest("DELETE", id);
    }
    return;
}

function handleRequest(httpRequest, params) {
    let endpoint, xhr, requestTypes;
    requestTypes = ["GET", "POST", "PUT", "DELETE"];
    endpoint = 'https://gorest.co.in/public-api/users/';
    //console.log(arguments)
    if (requestTypes.includes(httpRequest)) {
        if (params && parseInt(params)) {
            endpoint += params;
        } else if (httpRequest === "PUT") {
            endpoint += arguments[2];
        }
        //console.log(endpoint)
        xhr = new XMLHttpRequest();

        xhr.open(httpRequest, endpoint)

        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.setRequestHeader('Authorization', `Bearer ${key}`)

        console.log(xhr)
        xhr.onload = function (parameterEvent) {
            console.log(this.responseText)
            let temp = JSON.parse(this.responseText)
            //console.log(temp)
            console.log(temp)
            handleResponse(temp, httpRequest);


        }

        if (httpRequest === "POST" || httpRequest === "PUT") {
            xhr.send(params);
        } else if (httpRequest === "GET" || httpRequest === "DELETE") {
            xhr.send();
        }

    }
    return;
}

function handleResponse(response, handledMethod) {
    let responseDiv;

    responseDiv = document.getElementById("responsediv");
    console.log(response.code, 11111111111111111111);
    if (response.code == 200 || response.code == 201 || response.code == 202 || response.code == 204) {
        if (responseDiv && handledMethod === "GET") {
            responseDiv.innerText = `The user retrieved info is
    
id: ${response.data.id} 

name: ${response.data.name}

email: ${response.data.email}

gender: ${response.data.gender}

status: ${response.data.status}

created at: ${response.data.created_at}

updated at: ${response.data.updated_at}`

        } else if (responseDiv && handledMethod === "POST") {
            responseDiv.innerText = `The created user info is
    
id: ${response.data.id} 

name: ${response.data.name}

email: ${response.data.email}

gender: ${response.data.gender}

status: ${response.data.status}

created at: ${response.data.created_at}

updated at: ${response.data.updated_at}`
        } else if (responseDiv && handledMethod === "PUT") {
            responseDiv.innerText = `The updated new user info is
    
id: ${response.data.id} 

name: ${response.data.name}

email: ${response.data.email}

gender: ${response.data.gender}

status: ${response.data.status}

created at: ${response.data.created_at}

updated at: ${response.data.updated_at}`
        } else if (responseDiv && handledMethod === "DELETE") {
            responseDiv.innerText = `The user was successfully deleted`
        }
    }else{
        responseDiv.innerText = "There was an error with the request or response"
    }

    return;
}