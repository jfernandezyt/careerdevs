const rentalPlace = function (locations, carsPerLocation) {
    let counter = 1;
    let temp = {
        locations: []
    }

    for (let i = 0; i < locations; i++) {

        temp.locations.push([]);
        for (let j = 0; j < carsPerLocation; j++) {
            temp.locations[i].push({})
            temp.locations[i][j].carId = "car " + (counter);
            temp.locations[i][j].isBooked = false;
            temp.locations[i][j].costADay = 10 * (i + 1);
            counter++;
        }
    }
    return temp;
}


const locations = 5, carsPerLocation = 7;
const rentalCompany = rentalPlace(locations, carsPerLocation);
//console.log(rentalCompany.locations[0]);

function loadAllElements() {
    let mainDiv, search, bookFirstCarBtn, bookByLocationBtn, bookByCarNumberBtn, availableCarsList, bookedCarsList, wallet, revenue, bookCarBtn, bookLocationBtn, bookCarNumBtn, close, closeOne;

    mainDiv = document.createElement("div");
    mainDiv.id = "maindiv";
    document.body.appendChild(mainDiv);

    search = createSearch();
    bookFirstCarBtn = createBookFirstCarButton();
    bookByLocationBtn = createBookByLocationBtn();
    bookByCarNumberBtn = createBookByCarNumberBtn();
    availableCarsList = createAvailableCarsList(); //array
    close = createCloseOutBtn();
    bookedCarsList = createBookedCarsList()//array
    closeOne = createCloseOutOneBtn();
    wallet = createWallet()//array
    revenue = createRevenue()//array

    mainDiv.appendChild(search);
    mainDiv.appendChild(bookFirstCarBtn);
    mainDiv.appendChild(bookByLocationBtn);
    mainDiv.appendChild(bookByCarNumberBtn);
    mainDiv.appendChild(availableCarsList[0]);
    mainDiv.appendChild(availableCarsList[1]);
    mainDiv.appendChild(close);
    mainDiv.appendChild(bookedCarsList[0]);
    mainDiv.appendChild(bookedCarsList[1]);
    mainDiv.appendChild(closeOne);
    mainDiv.appendChild(wallet[0]);
    mainDiv.appendChild(wallet[1]);
    mainDiv.appendChild(wallet[2]);
    mainDiv.appendChild(revenue[0]);
    mainDiv.appendChild(revenue[1]);

    searchBar = document.getElementById("searchbar");
    bookCarBtn = document.getElementById("bookfirstcar");
    bookLocationBtn = document.getElementById("bookbylocation");
    bookCarNumBtn = document.getElementById("bookbycarnum");
    closeAllBtn = document.getElementById("closeoutall");
    closeOneBtn = document.getElementById("closeoutone");
    walletBtn = document.getElementById("walletbutton");

    searchBar.setAttribute("onkeyup", "search()");
    bookCarBtn.setAttribute("onclick", "bookFirstCarAvailable()");
    bookLocationBtn.setAttribute("onclick", "bookByLocation()");
    bookCarNumBtn.setAttribute("onclick", "bookByCarNumber()");
    closeAllBtn.setAttribute("onclick", "closeContract()");
    closeOneBtn.setAttribute("onclick", "closeOne()");
    walletBtn.setAttribute("onclick", "addFunds()");
    searchBar.focus();

}

function createSearch() {
    let searchBar;

    searchBar = document.createElement("input");
    searchBar.id = "searchbar";
    searchBar.type = "text";
    searchBar.placeholder = "Search for car to book...";

    return searchBar;
}

function search() {
    let input, ul, li, searchText;
    input = document.getElementById("searchbar");
    searchText = input.value;
    ul = document.getElementById("availablecars");
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

function createAvailableCarsList() {
    let list, label;

    list = document.createElement("ul");
    list.id = "availablecars";

    label = document.createElement("h2");
    label.innerText = "Available Cars";

    for (let i = 0; i < rentalCompany.locations.length; i++) {
        for (let j = 0; j < rentalCompany.locations[i].length; j++) {
            if (rentalCompany.locations[i][j].isBooked === false) {
                let temp = document.createElement("li");
                temp.id = rentalCompany.locations[i][j].carId;
                temp.innerText = rentalCompany.locations[i][j].carId;
                temp.style.display = "none";
                temp.setAttribute("onclick", "book(this)");
                list.appendChild(temp);
            }
        }
    }
    return [label, list];
}

function createBookedCarsList() {
    let list, label;

    list = document.createElement("ul");
    list.id = "bookedcars";

    label = document.createElement("h2");
    label.innerText = "Booked Cars";

    return [label, list];
}

function createBookFirstCarButton() {
    let btn;

    btn = document.createElement("button");
    btn.id = "bookfirstcar";
    btn.innerText = "Book the first available car.";

    return btn;

}

function createBookByLocationBtn() {
    let btn;

    btn = document.createElement("button");
    btn.id = "bookbylocation";
    btn.innerText = "Book by the location.";

    return btn;
}

function createBookByCarNumberBtn() {
    let btn;

    btn = document.createElement("button");
    btn.id = "bookbycarnum";
    btn.innerText = "Book by a Specific car.";

    return btn;
}

function createWallet() {
    let wallet, label, walletBtn;

    wallet = document.createElement("div");
    wallet.id = "wallet";
    wallet.innerText = "10000";

    label = document.createElement("h2");
    label.innerText = "Wallet: ";

    walletBtn = document.createElement("button");
    walletBtn.id = "walletbutton";
    walletBtn.innerText = "Add Funds";

    return [label, wallet, walletBtn];
}

function addFunds() {
    let label, currentAmount;

    label = document.getElementById("wallet");
    currentAmount = parseInt(label.innerText);

    currentAmount += 100;
    label.innerText = String(currentAmount);
}

function createRevenue() {
    let revenue, label;

    revenue = document.createElement("div");
    revenue.id = "revenue";
    revenue.innerText = "0";

    label = document.createElement("h2");
    label.innerText = "Revenue: ";

    return [label, revenue];
}

function createCloseOutBtn() {
    let btn;

    btn = document.createElement("button");
    btn.id = "closeoutall";
    btn.innerText = "Close out all open contracts.";

    return btn;
}

function createCloseOutOneBtn() {
    let btn;

    btn = document.createElement("button");
    btn.id = "closeoutone";
    btn.innerText = "Close out a specific customer contract or car.";

    return btn;
}

function book(carToBook, customer) {
    let bookedList, currentFunds, revenue, tempCustomer = {};

    if (customer === undefined) {
        tempCustomer.name = prompt("Please enter your name: ");
        tempCustomer.daysRenting = prompt("Please enter the amount of days renting the vehicle for: ");
        customer = tempCustomer;
    }

    bookedList = document.getElementById("bookedcars");
    revenue = document.getElementById("revenue");
    wallet = document.getElementById("wallet");

    revenueNumber = parseInt(revenue.innerText);
    currentFunds = parseInt(wallet.innerText);

    if (carToBook) {
        for (let i = 0; i < rentalCompany.locations.length; i++) {
            for (let j = 0; j < rentalCompany.locations[i].length; j++) {
                if (carToBook.innerText === rentalCompany.locations[i][j].carId) {
                    customer.cost = rentalCompany.locations[i][j].costADay * customer.daysRenting;
                    if (customer.cost > currentFunds) {
                        alert(`Sorry, you could not book this vehicle, the cost(${customer.cost}) exceeded your current funds.`);
                        return;
                    } else {
                        alert(`Congratulations ${customer.name}, you just booked ${rentalCompany.locations[i][j].carId}, for ${customer.daysRenting} days. \n This came out to a total of ${customer.cost}`)
                        currentFunds -= customer.cost;

                        wallet.innerText = String(currentFunds);
                        revenue.innerText = String((revenueNumber + customer.cost));

                        rentalCompany.locations[i][j].isBooked = true;
                        rentalCompany.locations[i][j].customer = customer;
                        carToBook.style.display = "";
                        carToBook.removeAttribute("onclick");
                        carToBook.setAttribute("onclick", "closeContract(this)");
                        bookedList.appendChild(carToBook);
                        return;
                    }
                }
            }
        }
    }
}

function closeContract(car) {
    let availableList, mainDiv, newAvailList, bookedList, newBookedList, message;
    message = "Thank you for booking with us: \n\n"
    mainDiv = document.getElementById("maindiv");

    availableList = document.getElementById("availablecars");
    bookedList = document.getElementById("bookedcars");
    newBookedList = createBookedCarsList();
    newBookedList = newBookedList[1];

    if (car) {
        for (let i = 0; i < rentalCompany.locations.length; i++) {
            for (let j = 0; j < rentalCompany.locations[i].length; j++) {
                if (car.innerText === rentalCompany.locations[i][j].carId) {
                    rentalCompany.locations[i][j].isBooked = false;                   
                    car.removeAttribute("onclick");
                    car.setAttribute("onclick", "book(this)");
                    availableList.appendChild(car);
                    newAvailList = createAvailableCarsList();
                    newAvailList = newAvailList[1];
                    alert(`Thank you for booking with us, ${rentalCompany.locations[i][j].customer.name}, you rented the car for ${rentalCompany.locations[i][j].daysRenting} at a cost of ${rentalCompany.locations[i][j].costADay} per day, \ntotaling ${rentalCompany.locations[i][j].customer.cost}.`)
                    rentalCompany.locations[i][j].customer = "";
                    mainDiv.replaceChild(newAvailList, availableList)
                    return;
                }
            }
        }
    } else {
        for (let i = 0; i < rentalCompany.locations.length; i++) {
            for (let j = 0; j < rentalCompany.locations[i].length; j++) {
                if (rentalCompany.locations[i][j].isBooked === true) {
                    rentalCompany.locations[i][j].isBooked = false;
                    message += rentalCompany.locations[i][j].customer.name + `for ${rentalCompany.locations[i][j].customer.rentingDays} days\n`;
                    rentalCompany.locations[i][j].customer = "";
                }
            }
        }
        message += "\nWe hope to see you all again!";
        alert(message);
        mainDiv.replaceChild(newBookedList, bookedList);
    }
}

function bookFirstCarAvailable() {
    let availCars, customer = {}

    customer.name = prompt("Please enter your name: ");
    customer.daysRenting = prompt("Please enter the amount of days renting the vehicle for: ");

    availCars = document.getElementById("availablecars");

    book(availCars.firstChild, customer);
    return;
}

function bookByLocation() {
    let availCars, index, location, isLocation, customer = {}

    customer.name = prompt("Please enter your name: ");
    customer.daysRenting = prompt("Please enter the amount of days renting the vehicle for: ");

    while (isLocation !== true) {
        location = prompt(`which location would you like to book from ?\n (please enter a number from 1 - ${rentalCompany.locations.length + 1})`);
        location = parseInt(location);
        if (location < 0 || location > rentalCompany.locations.length + 1) {
            isLocation = false;
        } else {
            isLocation = true;
        }
    }

    index = location - 1;
    availCars = document.getElementById("availablecars");
    availCars = document.getElementsByTagName("li");

    if (rentalCompany.locations[index].length > 0) {
        for (let i = 0; i < availCars.length; i++) {
            if (availCars[i].innerText === rentalCompany.locations[index][0].carId) {
                book(availCars[i], customer);
                return;
            }
        }
    }

}

function bookByCarNumber() {
    let availCars, carNum, isCarNum, customer = {}, temp = "car ";

    customer.name = prompt("Please enter your name: ");
    customer.daysRenting = prompt("Please enter the amount of days renting the vehicle for: ");

    while (isCarNum !== true) {
        carNum = prompt(`Please enter the car id of the vehicle about to be rented (up to the id #${(locations * carsPerLocation) + 1}): `)
        carNum = parseInt(carNum);
        if (carNum < 0 || carNum > (locations * carsPerLocation) + 1) {
            isCarNum = false;
        } else {
            isCarNum = true;
        }

    }
    carNum = temp + String(carNum);
    availCars = document.getElementById("availablecars");
    availCars = document.getElementsByTagName("li");


    for (let i = 0; i < availCars.length; i++) {
        if (availCars[i].innerText === carNum) {
            book(availCars[i], customer);
            return;
        }
    }
}

function closeOne() {
    let car, temp;

    temp = prompt("Please enter customer name or car #: ");

    for (let i = 0; i < rentalCompany.locations.length; i++) {
        for (let j = 0; j < rentalCompany.locations[i].length; j++) {
            if (rentalCompany.locations[i][j].isBooked === true && rentalCompany.locations[i][j].customer.name === temp) {
                car = document.getElementById(rentalCompany.locations[i][j].carId);
                closeContract(car)
                return;
            }
            if (rentalCompany.locations[i][j].isBooked === true && rentalCompany.locations[i][j].carId === temp) {
                car = document.getElementById(rentalCompany.locations[i][j].carId);
                closeContract(car)
                return;
            }

        }
    }
    alert("This is not a valid entry, please try again");
}