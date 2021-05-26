function createHotel(floors, rooms) {
    let hotel = {
        availableRoomNumbers: [],
        bookedRooms: [],
        costOfRooms: []
    };

    for (let i = 0; i < floors; i++) {
        hotel.availableRoomNumbers.push([]);
        hotel.bookedRooms.push([]);
        hotel.costOfRooms[i] = [(i + 1) * 100];
        for (let j = 0; j < rooms; j++) {
            hotel.availableRoomNumbers[i].push((i + 1) * 1000 + j);
        }
    }
    //console.log(hotel);
    return hotel;

}

const floors = 6;
const rooms = 10;
const hotel = createHotel(floors, rooms);
console.log(hotel)

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
    typeBtn = document.getElementById("bookbytype");
    roomBtn = document.getElementById("bookbynumber");
    floorbtn = document.getElementById("bookbyfloor");
    searchBar = document.getElementById("searchbar");
    walletBtn = document.getElementById("walletbutton");
    checkoutroomsBtn = document.getElementById("checkoutrooms");

    checkoutRoom.setAttribute("onclick", "checkOutNumber()");
    typeBtn.setAttribute("onclick", "bookByRoomType()");
    roomBtn.setAttribute("onclick", "bookByRoomNumber()");
    floorbtn.setAttribute("onclick", "bookRoomByFloor()");
    searchBar.setAttribute("onkeyup", "search()");
    searchBar.focus();
    walletBtn.setAttribute("onclick", "addFunds()");
    checkoutroomsBtn.setAttribute("onclick", "checkOut()");

}

function createSearch() {
    let searchBar;

    searchBar = document.createElement("input");
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
    let availableRoomsList, roomTypes, tempElement;
    availableRoomsList = document.createElement("ul");
    availableRoomsList.id = "availableroomslist";

    for (let i = 0; i < hotel.availableRoomNumbers.length; i++) {
        for (let j = 0; j < hotel.availableRoomNumbers[i].length; j++) {

            tempElement = document.createElement("li");
            tempElement.id = hotel.availableRoomNumbers[i][j];
            tempElement.innerText = hotel.availableRoomNumbers[i][j];
            tempElement.value = hotel.availableRoomNumbers[i][j];
            tempElement.style.display = "none";
            availableRoomsList.appendChild(tempElement);
            tempElement.setAttribute("onclick", "bookRoom(this)");
        }

    }
    return availableRoomsList;
}

function createBookedList() {
    let bookedRoomsList;
    bookedRoomsList = document.createElement("ul");
    bookedRoomsList.id = "bookedroomslist";

    return bookedRoomsList;
}

function createCheckOutAllRooms() {
    let btn;
    btn = document.createElement("button");

    btn.id = "checkoutrooms"
    btn.innerText = "Check all Guests out.";
    return btn;
}

function bookRoom(room) {
    let isEmpty, cost, wallet, index, customer, revenue, daysToBook, customerName, roomType, bookedRoomsList, availableList, availRooms, isFloor;

    isFloor = typeOfBooking(room);

    if (isFloor !== true) {
        roomType = isFloor
    }

    bookedRoomsList = document.getElementById("bookedroomslist");
    availableList = document.getElementById("availableroomslist");
    availRooms = availableList.getElementsByTagName("li");

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
        if (roomType === "Single") {
            index = 0;
        } else if (roomType === "Double") {
            index = 1;
        } else if (roomType === "Suite") {
            index = 2;
        }

        if (hotel.availableRoomNumbers[index].length !== 0) {
            cost = (customer.bookedDays * hotel.costOfRooms[index]);
            if (cost > currentFunds) {

                alert(`You do not have enough funds in your wallet to book this room. 
The cost would be ${cost}, you curently have ${currentFunds} in your wallet`);

            } else {
                for (let i = 0; i < availRooms.length; i++) {
                    if (availRooms[i].innerText == hotel.availableRoomNumbers[index][i]) {
                        customer.bookedRoom = hotel.availableRoomNumbers[index].splice(i, 1)[0];
                        customer.cost = cost;
                        hotel.bookedRooms[index][i] = customer;
                        availRooms[i].style.display = "block";
                        availRooms[i].removeAttribute("onclick");
                        availRooms[i].setAttribute("onclick", "checkOut(this)");
                        bookedRoomsList.appendChild(availRooms[i]);
                        break;
                    }
                }
                customer.cost = cost;
                hotel.bookedRooms[index].push(customer);
                revenue += cost;
                revenueDiv.innerText = String(revenue);
                isEmpty = false;
                currentFunds -= cost;
                wallet.innerText = currentFunds;

                alert(`You booked the room for ${customer.bookedDays} days. 
The cost per day for this room is ${hotel.costOfRooms[index]} 
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
        for (let i = 0; i < hotel.availableRoomNumbers.length; i++) {
            for (let j = 0; j < hotel.availableRoomNumbers[i].length; j++) {
                if (hotel.availableRoomNumbers[i][j] === roomType) {
                    cost = (customer.bookedDays * hotel.costOfRooms[i]);
                    if (cost > currentFunds) {
                        alert(`You do not have enough funds in your wallet to book this room. 
The cost would be ${cost}, you curently have ${currentFunds} in your wallet`);
                    } else {
                        customer.bookedRoom = hotel.availableRoomNumbers[i].splice(j, 1)[0];
                        customer.cost = cost;
                        revenue += cost;
                        revenueDiv.innerText = String(revenue);
                        hotel.bookedRooms[i][j] = customer;
                        room.style = "block";
                        room.removeAttribute("onclick");
                        room.setAttribute("onclick", "checkOut(this)");
                        bookedRoomsList.appendChild(room);
                        currentFunds -= cost;
                        wallet.innerText = currentFunds;
                        alert(`You booked the room for ${customer.bookedDays} days,
the cost per day for this room is ${hotel.costOfRooms[i]}
costing you a total of: ${cost}

Name: ${customer.name}`);
                        return;
                    }
                } else {
                    if (hotel.bookedRooms[i][j] === undefined) {
                        hotel.bookedRooms[i][j] = '';
                    }
                }
            }
        }
    } else if (isFloor === true) {
        index = parseInt(room) - 1;

        if (hotel.availableRoomNumbers[index].length !== 0) {
            cost = (customer.bookedDays * hotel.costOfRooms[index]);
            if (cost > currentFunds) {

                alert(`You do not have enough funds in your wallet to book this room. 
The cost would be ${cost}, you curently have ${currentFunds} in your wallet`);

            } else {
                for (let i = 0; i < availRooms.length; i++) {
                    if (availRooms[i].innerText == hotel.availableRoomNumbers[index][0]) {
                        console.log('heyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy')
                        customer.bookedRoom = hotel.availableRoomNumbers[index].splice(0, 1)[0];
                        customer.cost = cost;
                        hotel.bookedRooms[index].push(customer);
                        availRooms[i].style.display = "block";
                        availRooms[i].removeAttribute("onclick");
                        availRooms[i].setAttribute("onclick", "checkOut(this)");
                        bookedRoomsList.appendChild(availRooms[i]);
                        break;
                    }
                }              
                revenue += cost;
                revenueDiv.innerText = String(revenue);
                isEmpty = false;
                currentFunds -= cost;
                wallet.innerText = currentFunds;

                alert(`You booked the room for ${customer.bookedDays} days. 
The cost per day for this room is ${hotel.costOfRooms[index]} 
costing you a total of: ${cost}
                
Name: ${customer.name}`);
            }


        }
    }


}

function createWallet() {
    let walletLabel, walletBtn, walletTitle;

    walletLabel = document.createElement("div");
    walletBtn = document.createElement("button");
    walletTitle = document.createElement("h2");

    walletLabel.id = "walletlabel";
    walletBtn.id = "walletbutton";
    walletBtn.innerText = "Add Funds to Wallet";
    walletLabel.innerText = "2000";
    walletTitle.innerText = "Wallet";


    return [walletTitle, walletLabel, walletBtn];
}

function addFunds() {
    let label, currentAmount;

    label = document.getElementById("walletlabel");
    currentAmount = parseInt(label.innerText);

    currentAmount += 100;
    label.innerText = String(currentAmount);
}


function checkOut(room) {
    let message, availRoomsList, bookedRoomsList, rooms;

    message = "Thank you for booking with us:";
    availRoomsList = document.getElementById("availableroomslist");
    bookedRoomsList = document.getElementById("bookedroomslist");
    rooms = bookedRoomsList.getElementsByTagName("li")

    if (typeof room === "undefined") {
        let max = rooms.length;
        for (let i = 0; i < max; i++) {
            rooms[0].style.display = "none";
            availRoomsList.appendChild(rooms[0]);
        }
        for (let i = 0; i < hotel.bookedRooms.length; i++) {
            for (let j = 0; j < hotel.bookedRooms[i].length; j++) {
                if (hotel.bookedRooms[i][j] !== '' && hotel.bookedRooms[i][j] !== undefined) {
                    hotel.availableRoomNumbers[i][j] = hotel.bookedRooms[i][j].bookedRoom;
                    message +=
                        `\n ${hotel.bookedRooms[i][j].name}, you stayed for ${hotel.bookedRooms[i][j].bookedDays} days \n`;
                    hotel.bookedRooms[i][j] = "";
                }
            }
        }

        message += "\n We hope to see you all again !";
        alert(message);
    } else {
        if (room) {
            for (let i = 0; i < hotel.bookedRooms.length; i++) {
                for (let j = 0; j < hotel.bookedRooms[i].length; j++) {
                    if (typeof hotel.bookedRooms[i][j].bookedRoom !== undefined) {
                        if (hotel.bookedRooms[i][j].bookedRoom == room.innerText) {
                            room.style.display = "none";
                            availRoomsList.appendChild(room);
                            alert(`Thank you for booking a room with us ${hotel.bookedRooms[i][j].name}
You are now checked out. You were charged ${hotel.bookedRooms[i][j].cost} for your stay.`);
                            hotel.availableRoomNumbers[i].splice(j, 0, hotel.bookedRooms[i][j].bookedRoom);
                            hotel.bookedRooms[i].splice(j, 1);
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
    let btn;
    btn = document.createElement("button");
    btn.id = "bookbyfloor";
    btn.innerText = "Book by floor number";

    return btn;
}
function createBookByRoom() {
    let btn;
    btn = document.createElement("button");
    btn.id = "bookbynumber";
    btn.innerText = "Book by room number";

    return btn;
}

function bookRoomByFloor() {
    let floorNumber;

    floorNumber = prompt(`What floor would you like to book a room on ? 
    \n\n(1-${hotel.availableRoomNumbers.length} are the options)`);

    bookRoom(floorNumber);
}

function bookByRoomNumber() {
    let isRoomFlag, roomNumber;

    while (isRoomFlag !== true) {
        roomNumber = prompt(`Please enter the room you'd like to book: 
`)

        for (let i = 0; i < hotel.availableRoomNumbers.length; i++) {
            for (let j = 0; j < hotel.availableRoomNumbers[i].length; j++) {
                if (roomNumber == hotel.availableRoomNumbers[i][j]) {
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
    let btn;

    btn = document.createElement("button");
    btn.id = "bookbytype";
    btn.innerText = "Book by Room Type";

    return btn;
}

function createCheckoutByNumber() {
    let btn;

    btn = document.createElement("button");
    btn.id = "checkoutnumber";
    btn.innerText = "Check out by Room Number";

    return btn;
}

function checkOutNumber() {
    let roomNumber, bookedRooms, isRoom;

    while (isRoom !== true) {
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
    }

}

function typeOfBooking(booking) {
    let isFloor;
    if (parseInt(booking)) {
        for (let i = 0; i < hotel.availableRoomNumbers.length; i++) {
            for (let j = 0; j < hotel.availableRoomNumbers[i].length; j++) {
                if (hotel.availableRoomNumbers[i][j] == booking) {
                    return booking;
                } else {
                    isFloor = true;
                }
            }
        }
        if (isFloor === true) {
            return isFloor;
        }

    } else if (booking.innerText) {
        for (let i = 0; i < hotel.availableRoomNumbers.length; i++) {
            for (let j = 0; j < hotel.availableRoomNumbers[i].length; j++) {
                if (hotel.availableRoomNumbers[i][j] == booking.innerText) {
                    return parseInt(booking.innerText);
                }
            }
        }
    } else if (typeof booking == "string") {
        return booking;
    }
}