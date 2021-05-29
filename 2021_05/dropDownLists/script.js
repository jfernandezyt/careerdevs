const javaScriptHotel = {
    roomTypes: ["Single", "Double", "Suite"],
    availableRoomNumbers: [[1000, 1001, 1002, 1003], [2000, 2001], [3000]],
    bookedRooms: [[], [], []]
}

function loadAvailableRooms() {
    let showRoomsBtn = document.getElementById('showrooms');

    if (showRoomsBtn.style.display === "block") {
        showRoomsBtn.style.display = "none";
    }

    let mainDiv = document.createElement("div");
    mainDiv.id = "maindiv";
    document.body.appendChild(mainDiv);

    createAvailableDropDown();
    createBookedDropDown();  
    createAvailableList();
    createBookedList();  
}

function createAvailableDropDown() {
    let mainDiv = document.getElementById("maindiv");
    availRoomsList = document.createElement("select");
    availRoomsList.setAttribute("id", "availablerooms");
    availRoomsList.addEventListener("change", bookRoom);
    availRoomsList.addEventListener("change", updateList);

    let counter = 0;
    //console.log(javaScriptHotel)
    for(let i = 0; i < javaScriptHotel.availableRoomNumbers.length; i++){
        //console.log(javaScriptHotel.availableRoomNumbers.length, "test1")
        for(let j = 0; j < javaScriptHotel.availableRoomNumbers[i].length; j++){
            //console.log(javaScriptHotel.availableRoomNumbers[i].length, "test2")
            //console.log(javaScriptHotel.availableRoomNumbers[i][j]);
            let tempElement = document.createElement("option");
            tempElement.value = javaScriptHotel.availableRoomNumbers[i][j];
            tempElement.innerText = javaScriptHotel.availableRoomNumbers[i][j];
            availRoomsList.options[counter] = tempElement;
            counter++;
        }
    }

    mainDiv.appendChild(availRoomsList);
    document.body.appendChild(mainDiv);
}

function createBookedDropDown() {
    let mainDiv = document.getElementById("maindiv");
    bookedRoomsDropDown = document.createElement("select");
    bookedRoomsDropDown.setAttribute("id", "bookedrooms");
    bookedRoomsDropDown.addEventListener("change", returnRoom);
    bookedRoomsDropDown.addEventListener("change", updateList);

    mainDiv.appendChild(bookedRoomsDropDown);
    document.body.appendChild(mainDiv);
}

function createAvailableList(){
    let availableRoomsDropDown = document.getElementById("availablerooms");
    let availableRoomsList = document.createElement("ul");
    let mainDiv = document.getElementById("maindiv");
    let title = document.createElement("h1");
    availableRoomsList.id = "availableroomslist";

    title.innerText = "Available Rooms";
    mainDiv.appendChild(title);        

    for(let i=0; i < availableRoomsDropDown.options.length; i++){
        let tempElement = document.createElement("li");
        tempElement.id = availableRoomsDropDown.options[i].value;
        tempElement.innerText = availableRoomsDropDown.options[i].value;
        //console.log(availableRoomsDropDown.options[i]);
        availableRoomsList.appendChild(tempElement);
    }    
    mainDiv.appendChild(availableRoomsList);
}
function createBookedList(){
    let bookedRoomsDropDown = document.getElementById("bookedrooms");
    let bookedRoomsList = document.createElement("ul");
    let mainDiv = document.getElementById("maindiv");
    let title = document.createElement("h1");
    bookedRoomsList.id = "bookedroomslist";

    title.innerText = "Booked Rooms";
    mainDiv.appendChild(title);        
    
    for(let i=0; i < bookedRoomsDropDown.options.length; i++){
        let tempElement = document.createElement("li");
        tempElement.id = bookedRoomsDropDown.options[i];
        tempElement.innerText = bookedRoomsDropDown.options[i];
        bookedRoomsList.appendChild(tempElement);
    }    
    mainDiv.appendChild(bookedRoomsList);
}

function bookRoom() {
    let bookedRoomsDropDown = document.getElementById("bookedrooms");
    let availRoomsList = this;

    let userSelect = availRoomsList.selectedOptions[0];
    availRoomsList.options[availRoomsList.selectedIndex].remove();
    bookedRoomsDropDown.options[bookedRoomsDropDown.length] = userSelect;

}

function returnRoom() {
    let availableList = document.getElementById("availablerooms");
    let bookedRoomsDropDown = this;

    let userSelect = bookedRoomsDropDown.selectedOptions[0];
    bookedRoomsDropDown.options[bookedRoomsDropDown.selectedIndex].remove();
    availableList.options[availableList.length] = userSelect;
}

function updateList(){
    let dropDownName = this.id; 
    let list = (dropDownName === "availablerooms") ? "bookedroomslist": "availableroomslist";
    let dropDown = (dropDownName === "availablerooms") ? "bookedrooms": "availablerooms";
     
    
    dropDown = document.getElementById(dropDown);

    list = document.getElementById(list);
    let temp;
    temp = dropDown.options[dropDown.options.length-1];
    let elementToRemove = document.getElementById(temp.value);
    
    let tempElement = document.createElement("li");
    tempElement.id = temp.value;
    tempElement.innerText = temp.value;
    list.appendChild(tempElement);

    elementToRemove.remove();  

}