const javaScriptHotel = {
    roomTypes: ["Single", "Double", "Suite"],
    availableRoomNumbers: [[1000, 1001, 1002, 1003], [2000, 2001], [3000]],
    bookedRooms: [[], [], []],

}

function loadAvailableRooms() {
    let showRoomsBtn = document.getElementById('showrooms');
    if (showRoomsBtn.style.display === "block") {
        showRoomsBtn.style.display = "none";
    }

    let mainDiv = document.createElement("div");
    mainDiv.id = "maindiv";
    document.body.appendChild(mainDiv);

    createAvailableList();
    createBookedList();
    createButtons();
}

function createButtons() {
    let bookButton = document.createElement('button');
    let returnButton = document.createElement('button');
    let mainDiv = document.getElementById("maindiv");

    bookButton.addEventListener("click", bookRoom);
    returnButton.addEventListener("click", returnRoom);
    bookButton.innerText = "Book a Room";
    returnButton.innerText = "Return a Room";
    mainDiv.appendChild(bookButton);
    mainDiv.appendChild(returnButton);
}

function bookRoom() {
    let availableList = document.getElementById("availableroomslist");
    let bookedRoomsList = document.getElementById("bookedroomslist");
    let tempElementName = document.createElement('li');
    if (availableList.firstChild != null) {
        tempElementName.id = availableList.firstChild.innerText;
        tempElementName.innerText = availableList.firstChild.innerText;
        availableList.firstChild.remove();
        bookedRoomsList.appendChild(tempElementName);
    }else{
        alert("There aren't any rooms to book.");
    }
}
function returnRoom() {
    let availableList = document.getElementById("availableroomslist");
    let bookedRoomsList = document.getElementById("bookedroomslist");
    let tempElementName = document.createElement('li');

    if (bookedRoomsList.firstChild !== null) {
        tempElementName.id = bookedRoomsList.firstChild.innerText;
        tempElementName.innerText = bookedRoomsList.firstChild.innerText;
        bookedRoomsList.firstChild.remove();
        availableList.appendChild(tempElementName);
    }else{
        alert("There aren't any rooms to return.");
    }
}

function createAvailableList() {
    let availableRoomsList = document.createElement("ul");
    let mainDiv = document.getElementById("maindiv");
    let title = document.createElement("h1");
    availableRoomsList.id = "availableroomslist";

    title.innerText = "Available Rooms";
    mainDiv.appendChild(title);

    for (let i = 0; i < javaScriptHotel.availableRoomNumbers.length; i++) {
        for (let j = 0; j < javaScriptHotel.availableRoomNumbers[i].length; j++) {
            let tempElement = document.createElement("li");
            tempElement.id = javaScriptHotel.availableRoomNumbers[i][j];
            tempElement.innerText = javaScriptHotel.availableRoomNumbers[i][j];
            availableRoomsList.appendChild(tempElement);
        }

    }
    mainDiv.appendChild(availableRoomsList);
}

function createBookedList() {
    let bookedRoomsList = document.createElement("ul");
    let mainDiv = document.getElementById("maindiv");
    let title = document.createElement("h1");
    bookedRoomsList.id = "bookedroomslist";

    title.innerText = "Booked Rooms";
    mainDiv.appendChild(title);

    mainDiv.appendChild(bookedRoomsList);
}