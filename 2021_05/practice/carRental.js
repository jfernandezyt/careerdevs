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
    bookCarBtn.setAttribute("onclick", "createModal(this)");
    bookLocationBtn.setAttribute("onclick", "createModal(this)");
    bookCarNumBtn.setAttribute("onclick", "createModal(this)");
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
                temp.setAttribute("onclick", "createModal(this)");
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
    let bookedList, currentFunds, revenue;

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
                        console.log(customer, "book");
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
                    message += rentalCompany.locations[i][j].customer.name + ` for ${rentalCompany.locations[i][j].customer.daysRenting} days\n`;
                    rentalCompany.locations[i][j].customer = "";
                }
            }
        }
        message += "\nWe hope to see you all again!";
        alert(message);
        mainDiv.replaceChild(newBookedList, bookedList);
    }
    return;
}

function bookFirstCarAvailable(cust) {
    let availCars, customer;

    customer = cust;
    availCars = document.getElementById("availablecars");
    console.log(customer, "bookFirstCarAvailable");
    book(availCars.firstChild, customer);
    return;
}

function bookByLocation(cust, loc) {
    let availCars, index, location, customer;

    location = loc;
    customer = cust;

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
    alert("there aren't any more vehicles available at this location.")
    return;
}

function bookByCarNumber(cust, number) {
    let availCars, carNum, customer, temp = "car ";

    customer = cust
    carNum = number;

    carNum = temp + String(carNum);
    availCars = document.getElementById("availablecars");
    availCars = document.getElementsByTagName("li");


    for (let i = 0; i < availCars.length; i++) {
        if (availCars[i].innerText === carNum) {
            book(availCars[i], customer);
            return;
        }
    }
    return;
}

function closeOne(input) {
    let car, temp;

    temp = input;

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
    return;
}

function createModal(element) {
    // id's for the buttons bookfirstcar, bookbylocation, bookbycarnum  (html element property localName)
    let elementType, div, content, close, formType, mainDiv;

    mainDiv = document.getElementById("maindiv");

    div = document.createElement("div");
    div.id = "myModal";
    div.className = "modal";

    content = document.createElement("div");
    content.className = "modal-content";

    close = document.createElement("span");
    close.className = "close";
    close.innerHTML = "&times;"
    close.setAttribute("onclick", "closeModal()");
    elementType = element.localName;

    content.appendChild(close);

    if (elementType === "button") {
        formType = element.id;
    } else if (elementType === "li") {
        formType = "passvalue";
    }

    if (formType === "bookfirstcar") {

        let element1 = document.createElement("label");
        element1.htmlFor = "customername";
        element1.innerText = "Name: "
        content.appendChild(element1);

        let element2 = document.createElement("input");
        element2.type = "text";
        element2.name = "customername";
        element2.id = "customername";
        content.appendChild(element2);
        content.appendChild(document.createElement("br"));
        content.appendChild(document.createElement("br"));

        let element3 = document.createElement("label");
        element3.htmlFor = "bookingdays";
        element3.innerText = "Days Booking: ";
        content.appendChild(element3);

        let element4 = document.createElement("input");
        element4.type = "text";
        element4.name = "bookingdays";
        element4.id = "bookingdays";
        content.appendChild(element4);
        content.appendChild(document.createElement("br"));
        content.appendChild(document.createElement("br"));


        let element5 = document.createElement("button");
        element5.innerText = "Book vehicle";
        element5.setAttribute("onclick", "dictate('bookfirstcar')")
        content.appendChild(element5);
    } else if (formType === "bookbylocation") {

        let element1 = document.createElement("label");
        element1.htmlFor = "customername";
        element1.innerText = "Name: "
        content.appendChild(element1);

        let element2 = document.createElement("input");
        element2.type = "text";
        element2.name = "customername";
        element2.id = "customername";
        content.appendChild(element2);
        content.appendChild(document.createElement("br"));
        content.appendChild(document.createElement("br"));

        let element3 = document.createElement("label");
        element3.htmlFor = "bookingdays";
        element3.innerText = "Days Booking: ";
        content.appendChild(element3);

        let element4 = document.createElement("input");
        element4.type = "text";
        element4.name = "bookingdays";
        element4.id = "bookingdays";
        content.appendChild(element4);
        content.appendChild(document.createElement("br"));
        content.appendChild(document.createElement("br"));

        let element5 = document.createElement("label");
        element5.htmlFor = "carlocation";
        element5.innerText = `Car Location (# between 1 and ${rentalCompany.locations.length + 1}): `;
        content.appendChild(element5);

        let element6 = document.createElement("input");
        element6.type = "text";
        element6.name = "carlocation";
        element6.id = "carlocation";
        content.appendChild(element6);
        content.appendChild(document.createElement("br"));
        content.appendChild(document.createElement("br"));

        let element7 = document.createElement("button");
        element7.innerText = "Book vehicle";
        element7.setAttribute("onclick", "dictate('bookbylocation')");
        content.appendChild(element7);
    } else if (formType === "bookbycarnum") {

        let element1 = document.createElement("label");
        element1.htmlFor = "customername";
        element1.innerText = "Name: "
        content.appendChild(element1);

        let element2 = document.createElement("input");
        element2.type = "text";
        element2.name = "customername";
        element2.id = "customername";
        content.appendChild(element2);
        content.appendChild(document.createElement("br"));
        content.appendChild(document.createElement("br"));

        let element3 = document.createElement("label");
        element3.htmlFor = "bookingdays";
        element3.innerText = "Days Booking: ";
        content.appendChild(element3);

        let element4 = document.createElement("input");
        element4.type = "text";
        element4.name = "bookingdays";
        element4.id = "bookingdays";
        content.appendChild(element4);
        content.appendChild(document.createElement("br"));
        content.appendChild(document.createElement("br"));

        let element5 = document.createElement("label");
        element5.htmlFor = "carnumber";
        element5.innerText = "Car: ";
        content.appendChild(element5);

        let element6 = document.createElement("input");
        element6.type = "text";
        element6.name = "carnumber";
        element6.id = "carnumber";
        content.appendChild(element6);
        content.appendChild(document.createElement("br"));
        content.appendChild(document.createElement("br"));

        let element7 = document.createElement("button");
        element7.innerText = "Book vehicle";
        element7.setAttribute("onclick", "dictate('bookbycarnum')");
        content.appendChild(element7);
    } else if (formType === "closeoutone") {
        let element1 = document.createElement("label");
        element1.htmlFor = "closeinput";
        element1.innerText = "Name: "
        content.appendChild(element1);

        let element2 = document.createElement("input");
        element2.type = "text";
        element2.name = "closeinput";
        element2.id = "closeinput";
        content.appendChild(element2);
        content.appendChild(document.createElement("br"));
        content.appendChild(document.createElement("br"));

        let element3 = document.createElement("button");
        element3.innerText = "Book vehicle";
        element3.setAttribute("onclick", "dictate('closeone')");
        content.appendChild(element3);
    } else if (formType === "passvalue") {
        let element1 = document.createElement("label");
        element1.htmlFor = "customername";
        element1.innerText = "Name: "
        content.appendChild(element1);

        let element2 = document.createElement("input");
        element2.type = "text";
        element2.name = "customername";
        element2.id = "customername";
        content.appendChild(element2);
        content.appendChild(document.createElement("br"));
        content.appendChild(document.createElement("br"));

        let element3 = document.createElement("label");
        element3.htmlFor = "bookingdays";
        element3.innerText = "Days Booking: ";
        content.appendChild(element3);

        let element4 = document.createElement("input");
        element4.type = "text";
        element4.name = "bookingdays";
        element4.id = "bookingdays";
        content.appendChild(element4);
        content.appendChild(document.createElement("br"));
        content.appendChild(document.createElement("br"));

        let element5 = document.createElement("label");
        element5.htmlFor = "carnumber";
        element5.innerText = "Car: ";
        content.appendChild(element5);

        let element6 = document.createElement("input");
        element6.type = "text";
        element6.name = "carnumber";
        element6.id = "carnumber";
        let temp = element.innerText;
        let value = "";
        for(let i =0; i < temp.length; i++){
            if(parseInt(temp[i])){
                value += temp[i];
            }            
        }
        element6.value = value;
        content.appendChild(element6);
        content.appendChild(document.createElement("br"));
        content.appendChild(document.createElement("br"));

        let element7 = document.createElement("button");
        element7.innerText = "Book vehicle";
        element7.setAttribute("onclick", "dictate('bookbycarnum')");
        content.appendChild(element7);
    }
    div.appendChild(content);
    mainDiv.appendChild(div);
}

function closeModal() {
    let modal;

    modal = document.getElementById("myModal");

    if (modal && modal.style.display !== "none") {
        modal.remove();
    }

}

function dictate(type) {
    let name, bookingDays, location, carNum, customer = {};
    name = document.getElementById("customername");
    bookingDays = document.getElementById("bookingdays");
    location = document.getElementById("carlocation");
    carNum = document.getElementById("carnumber");

    if (location) {
        location = parseInt(location.value);
    } else if (carNum) {
        carNum = parseInt(carNum.value);
    }

    customer.name = name.value;
    customer.daysRenting = bookingDays.value;

    closeModal();

    if (type === 'bookfirstcar') {
        bookFirstCarAvailable(customer);
        return;
    } else if (type === 'bookbylocation') {
        if (location > 0 && location < (rentalCompany.locations.length + 1)) {
            bookByLocation(customer, location);
            return;
        }
        alert("The location entered doesn't exist.")
    } else if (type === 'bookbycarnum') {
        if (carNum > 0 || carNum < (locations * carsPerLocation) + 1) {
            bookByCarNumber(customer, carNum);
            return;
        }else{
            bookByCarNumber(customer, carNum);
            return;
        }
    } else if (type === 'closeone') {
        let input = (customer) ? customer : carNum;
        closeOne(input);
        return;
    }
}