const javaScriptHotel = {
    roomTypes: ["Single", "Double", "Suite"],
    availableRoomNumbers: [[1000, 1001, 1002, 1003], [2000, 2001], [3000]],
    bookedRooms: [[], [], []],
    costOfRooms: [100, 200, 500]
}
/* Version 1
Create an index.html and hotel.js file.  Connect the files via a script tag.

Create all HTML elements and tags from within hotel.js

allow rooms to be booked by floor number, room number or room type

allow rooms to be returned/checked out by room number only.
Also create a checkout all rooms

Version 2
a. Store the guest name and the number of days when booking a room
b. When checking out a room number, create a message that thanks the guest by name for staying at the hotel and informs them of their total cost.
c. This will require a cost for room types


Version 3 
Keep a running total of the revenues generated after each checkout.


Version 4
Add wallet functionality
add a search bar that prepopulates depending on what is being entered


Other work


Begin completing Free Code Camp Algorithms (turn in two new algos by monday) 
*/

function loadElements() {
    let searchBar, bookedTitle, availTitle, wallet;
    const mainDiv = document.createElement("div");
    mainDiv.id = "maindiv";
    bookedTitle = document.createElement("h2");
    bookedTitle.id = "bookroomstitle";
    bookedTitle.innerText = "Booked Rooms";
    availTitle = document.createElement("h2");
    availTitle.id = "availroomstitle";
    availTitle.innerText = "Available Rooms";
    wallet = createWallet();
    revenue = createRevenue();

    document.body.appendChild(mainDiv);
    mainDiv.appendChild(createSearch());
    mainDiv.appendChild(createFloorBookingBtn());
    mainDiv.appendChild(createBookByRoom());
    mainDiv.appendChild(createBookByRoomType());
    mainDiv.appendChild(availTitle);
    mainDiv.appendChild(createAvailableList());
    mainDiv.appendChild(createCheckOutAllRooms());
    mainDiv.appendChild(bookedTitle);
    mainDiv.appendChild(createBookedList());
    mainDiv.appendChild(createCheckoutByNumber());
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(wallet[0]);
    mainDiv.appendChild(wallet[1]);
    mainDiv.appendChild(wallet[2]);
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(document.createElement("br"));
    mainDiv.appendChild(revenue[0]);
    mainDiv.appendChild(revenue[1]);

    checkoutRoom = document.getElementById("checkoutnumber");
    checkoutRoom.setAttribute("onclick", "checkOutNumber()");
    typeBtn = document.getElementById("bookbytype");
    typeBtn.setAttribute("onclick", "bookByRoomType()");
    roomBtn = document.getElementById("bookbynumber");
    roomBtn.setAttribute("onclick", "bookByRoomNumber()");
    floorbtn = document.getElementById("bookbyfloor")
    floorbtn.setAttribute("onclick", "bookRoomByFloor()");
    searchBar = document.getElementById("searchbar");
    walletBtn = document.getElementById("walletbutton");
    checkoutroomsBtn = document.getElementById("checkoutrooms");
    searchBar.setAttribute("onkeyup", "search()");
    searchBar.focus();
    walletBtn.setAttribute("onclick", "addFunds()");
    checkoutroomsBtn.setAttribute("onclick", "checkOut()");
}

function createSearch() {
    let searchBar = document.createElement("input");

    searchBar.id = "searchbar";
    searchBar.type = "text";
    searchBar.placeholder = "Search for room to book...";

    return searchBar;
}

function search() {
    let input, ul, li, searchText;
    input = document.getElementById("searchbar");
    searchText = input.value;
    ul = document.getElementById("availableroomslist");
    li = ul.getElementsByTagName("li");

    for (let i = 0; i < li.length; i++) {
        if (searchText !== "") {
            if (li[i].innerText.indexOf(searchText) > - 1) {
                li[i].style = "";
            } else {
                li[i].style.display = "none";
            }
        } else {
            li[i].style.display = "none";
        }

    }
}

function createAvailableList() {
    let availableRoomsList = document.createElement("ul");
    availableRoomsList.id = "availableroomslist";


    for (let i = 0; i < javaScriptHotel.availableRoomNumbers.length; i++) {
        let roomTypes = document.createElement("li");
        roomTypes.id = javaScriptHotel.roomTypes[i];
        roomTypes.innerText = javaScriptHotel.roomTypes[i];
        roomTypes.style.display = "none";
        availableRoomsList.appendChild(roomTypes);
        roomTypes.setAttribute("onclick", "bookRoom(this)");
        for (let j = 0; j < javaScriptHotel.availableRoomNumbers[i].length; j++) {
            let tempElement = document.createElement("li");
            tempElement.id = javaScriptHotel.availableRoomNumbers[i][j];
            tempElement.innerText = javaScriptHotel.availableRoomNumbers[i][j];
            tempElement.style.display = "none";
            availableRoomsList.appendChild(tempElement);
            tempElement.setAttribute("onclick", "bookRoom(this)");
        }

    }
    return availableRoomsList;
}

function createBookedList() {
    let bookedRoomsList = document.createElement("ul");
    bookedRoomsList.id = "bookedroomslist";

    return bookedRoomsList;
}

function createCheckOutAllRooms() {
    let btn = document.createElement("button");

    btn.id = "checkoutrooms"
    btn.innerText = "Check all Guests out.";
    return btn;
}

function bookRoom(room) {
    let isEmpty, cost, wallet, index, customer, revenue, daysToBook, customerName, roomType;

    if (parseInt(room)) {
        roomType = parseInt(room);
    } else if (room.innerText) {
        roomType = room.innerText;
        //console.log("test1")
        if (parseInt(roomType)) {
            //console.log("test2")
            roomType = parseInt(roomType);
        }
    } else {
        roomType = room;
    }
    //console.log(typeof roomType);
    let bookedRoomsList = document.getElementById("bookedroomslist");
    let availableList = document.getElementById("availableroomslist");
    let availRooms = availableList.getElementsByTagName("li");
    customerName = prompt("What is your name ?");
    daysToBook = prompt("How many days are you booking the room for ?");

    daysToBook = parseInt(daysToBook);
    customer = {
        name: customerName,
        bookedDays: daysToBook
    }

    wallet = document.getElementById("walletlabel");
    currentFunds = parseInt(wallet.innerText);

    revenueDiv = document.getElementById("revenuetracker");
    revenue = parseInt(revenueDiv.innerText);

    if (typeof roomType === "string") {
        index = (roomType === "Single") ? 0 : (roomType === "Double") ? 1 : 2;
        if (javaScriptHotel.availableRoomNumbers[index].length !== 0) {
            cost = (customer.bookedDays * javaScriptHotel.costOfRooms[index]);
            if (cost > currentFunds) {
                alert(`You do not have enough funds in your wallet to book this room. 
The cost would be ${cost}, you curently have ${currentFunds} in your wallet`);
            } else {
                for (let i = 0; i < availRooms.length; i++) {
                    if (availRooms[i].innerText == javaScriptHotel.availableRoomNumbers[index][0]) {
                        availRooms[i].style.display = "block";
                        availRooms[i].removeAttribute("onclick");
                        availRooms[i].setAttribute("onclick", "checkOut(this)");
                        bookedRoomsList.appendChild(availRooms[i]);
                        break;
                    }
                }
                customer.bookedRoom = javaScriptHotel.availableRoomNumbers[index].shift();
                customer.cost = cost;
                revenue += cost;
                revenueDiv.innerText = String(revenue);
                javaScriptHotel.bookedRooms[index].push(customer);
                isEmpty = false;
                currentFunds -= cost;
                wallet.innerText = currentFunds;
                alert(`You booked the room for ${customer.bookedDays} days. 
The cost per day for this room is ${javaScriptHotel.costOfRooms[index]} 
costing you a total of: ${cost}
                
Name: ${customer.name}`);
            }


        } else {
            isEmpty = true;
        }
        if (isEmpty === true) {
            alert("There are no longer any available rooms of this type.");
            if (room.remove()) {
                room.remove();
            }
        }

    } else if (typeof roomType === "number") {
        for (let i = 0; i < javaScriptHotel.availableRoomNumbers.length; i++) {
            for (let j = 0; j < javaScriptHotel.availableRoomNumbers[i].length; j++) {
                if (javaScriptHotel.availableRoomNumbers[i][j] === roomType) {
                    cost = (customer.bookedDays * javaScriptHotel.costOfRooms[i]);
                    if (cost > currentFunds) {
                        alert(`You do not have enough funds in your wallet to book this room. 
The cost would be ${cost}, you curently have ${currentFunds} in your wallet`);
                    } else {
                        customer.bookedRoom = javaScriptHotel.availableRoomNumbers[i].splice(j, 1);
                        customer.cost = cost;
                        revenue += cost;
                        revenueDiv.innerText = String(revenue);
                        javaScriptHotel.bookedRooms[i][j] = customer;
                        room.style = "block";
                        room.removeAttribute("onclick");
                        room.setAttribute("onclick", "checkOut(this)");
                        bookedRoomsList.appendChild(room);
                        currentFunds -= cost;
                        wallet.innerText = currentFunds;
                        alert(`You booked the room for ${customer.bookedDays} days,
the cost per day for this room is ${javaScriptHotel.costOfRooms[i]}
costing you a total of: ${cost}

Name: ${customer.name}`);
                        return;
                    }
                } else {
                    if (javaScriptHotel.bookedRooms[i][j] === undefined) {
                        javaScriptHotel.bookedRooms[i][j] = '';
                    }
                }
            }
        }
    }


}

function createWallet() {
    let walletLabel = document.createElement("div");
    let walletBtn = document.createElement("button");
    let walletTitle = document.createElement("h2");

    walletLabel.id = "walletlabel";
    walletBtn.id = "walletbutton";
    walletBtn.innerText = "Add Funds to Wallet";
    walletLabel.innerText = "2000";
    walletTitle.innerText = "Wallet";


    return [walletTitle, walletLabel, walletBtn];
}

function addFunds() {
    let label = document.getElementById("walletlabel");
    let currentAmount = parseInt(label.innerText);

    currentAmount += 100;
    label.innerText = String(currentAmount);
}


function checkOut(room) {
    let message = "Thank you for booking with us:";
    let availRoomsList = document.getElementById("availableroomslist");
    let bookedRoomsList = document.getElementById("bookedroomslist");
    let rooms = bookedRoomsList.getElementsByTagName("li")

    if (typeof room === "undefined") {

        for (let i = 0; i <= rooms.length; i++) {
            rooms[0].style.display = "none";
            availRoomsList.appendChild(rooms[0]);
        }
        for (let i = 0; i < javaScriptHotel.bookedRooms.length; i++) {
            for (let j = 0; j < javaScriptHotel.bookedRooms[i].length; j++) {
                if (javaScriptHotel.bookedRooms[i][j] !== '' && javaScriptHotel.bookedRooms[i][j] !== undefined) {
                    javaScriptHotel.bookedRooms[i][j].cost = "";
                    javaScriptHotel.availableRoomNumbers[i].unshift(javaScriptHotel.bookedRooms[i][j].bookedRoom);
                    message +=
                        `\n ${javaScriptHotel.bookedRooms[i][j].name}, you stayed for ${javaScriptHotel.bookedRooms[i][j].bookedDays} days \n`;
                    javaScriptHotel.bookedRooms[i][j].bookedRoom = "";
                    customers.unshift(javaScriptHotel.bookedRooms[i][j]);
                    javaScriptHotel.bookedRooms[i][j] = "";
                }
            }
        }

        message += "\n We hope to see you all again !";
        alert(message);
    } else {
        if (room) {
            console.log(room);
            for (let i = 0; i < javaScriptHotel.bookedRooms.length; i++) {
                for (let j = 0; j < javaScriptHotel.bookedRooms[i].length; j++) {
                    if (typeof javaScriptHotel.bookedRooms[i][j].bookedRoom !== undefined) {
                        if (javaScriptHotel.bookedRooms[i][j].bookedRoom == room.innerText) {
                            room.style.display = "none";
                            availRoomsList.appendChild(room);
                            alert(`Thank you for booking a room with us ${javaScriptHotel.bookedRooms[i][j].name}
You are now checked out. You were charged ${javaScriptHotel.bookedRooms[i][j].cost} for your stay.`);
                            javaScriptHotel.availableRoomNumbers[i].unshift(javaScriptHotel.bookedRooms[i][j].bookedRoom);
                            javaScriptHotel.bookedRooms[i].splice(j, 1);
                            return;
                        }
                    }


                }
            }

        }
    }
}

function createRevenue() {
    let label, tracker;
    tracker = document.createElement("div");
    tracker.id = "revenuetracker";
    tracker.innerText = "0";
    label = document.createElement("h2");
    label.innerText = "Revenue: ";

    return [label, tracker];
}

function createFloorBookingBtn() {
    let btn = document.createElement("button");
    btn.id = "bookbyfloor";
    btn.innerText = "Book by floor number";

    return btn;
}
function createBookByRoom() {
    let btn = document.createElement("button");
    btn.id = "bookbynumber";
    btn.innerText = "Book by room number";

    return btn;
}

function bookRoomByFloor() {
    let isFloor, floorNumber;
    while (isFloor !== true) {
        floorNumber = prompt(`What floor would you like to book a room on ? 
    \n\n(1-3 are the options)`);

        if (floorNumber == 1) {
            floorNumber = "Single";
            isFloor = true;
        } else if (floorNumber == 2) {
            floorNumber = "Double";
            isFloor = true;
        } else if (floorNumber == 3) {
            floorNumber = "Suite";
            isFloor = true;
        } else {
            isFloor = false;
        }
    }
    bookRoom(floorNumber);
}

function bookByRoomNumber() {
    let isRoomFlag, roomNumber;
    while (isRoomFlag !== true) {
        roomNumber = prompt(`Please enter the room you'd like to book: 
`)

        for (let i = 0; i < javaScriptHotel.availableRoomNumbers.length; i++) {
            for (let j = 0; j < javaScriptHotel.availableRoomNumbers[i].length; j++) {
                if (roomNumber == javaScriptHotel.availableRoomNumbers[i][j]) {
                    roomNumber = document.getElementById(roomNumber);
                    isRoomFlag = true;
                    bookRoom(roomNumber);
                    return;
                } else {
                    isRoomFlag = false;
                }
            }

        }
    }


}

function bookByRoomType() {
    let isType, roomType;
    while (isType !== true) {
        roomType = prompt(`What type of room would you like to book ?

        (options: Single, Double, Suite)`);
        if (roomType == "Single" || roomType == "Double" || roomType == "Suite") {
            isType = true;
            bookRoom(roomType);
            return;
        } else {
            isType = false;
        }
    }
}

function createBookByRoomType() {
    let btn = document.createElement("button");
    btn.id = "bookbytype";
    btn.innerText = "Book by Room Type";

    return btn;
}

function createCheckoutByNumber() {
    let btn = document.createElement("button");
    btn.id = "checkoutnumber";
    btn.innerText = "Check out by Room Number";

    return btn;
}

function checkOutNumber() {
    let roomNumber, bookedRooms, isRoom;
    do {
        roomNumber = prompt("What is the room number you'd like to check out ?");
        bookedRooms = document.getElementById("bookedroomslist");
        bookedRooms = bookedRooms.getElementsByTagName("li");

        for (let i = 0; i < bookedRooms.length; i++) {
            //console.log(roomNumber, bookedRooms[i].innerText)
            if (roomNumber == bookedRooms[i].innerText) {
                roomNumber = document.getElementById(roomNumber);
                isRoom = true;
                console.log("test1")
                checkOut(roomNumber);
                break;
            } else {
                isRoom = false;
            }
        }
    } while (isRoom === false)

}