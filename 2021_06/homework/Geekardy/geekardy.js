/* API: https://opentdb.com/api.php?amount=15 */
const endpoints = ['https://opentdb.com/api.php?amount=6&difficulty=easy', 'https://opentdb.com/api.php?amount=6&difficulty=medium', 'https://opentdb.com/api.php?amount=6&difficulty=hard'];
const pickQuestionsEndPoint = 'https://opentdb.com/api.php?amount=50';

//start a new game from scratch
//clear storage
//populateNameCollection function to get names
function startNewGame() {
    clearLocal()
    populateNameCollection();

    return;
}

//when button is clicked we check to see if there is a valid session in storage
//if there is then we get the last round played and repopulate the questions 
function continueAGame() {
    if (isValidSession() === false) {
        alert("Unfortunately, the previous game is not a valid session, but you can start a new game")
        startNewGame();
    }
    getQuestions(localStorage.getItem("lastplayedround"));
}

//checking if session is valid
// a session is valid when both player names, scores and 
//the last round played item is set
function isValidSession() {
    let arr = []
    for (let j in localStorage) {
        if (j == 'player1Name' || j == "player1score" || j == "player2score" || j == 'player2Name' || j == "lastplayedround") {
            arr.push(j);
        }
    }
    if (arr.length === 5) {
        return true;
    }
    return false;

}

//clear all localstorage items
function clearLocal() {
    for (let j in localStorage) {
        localStorage.removeItem(j);
    }
    return;
}

//call the createModal function 
//which gives us the desired view on the modal
//also, send the modal to the handlemodal function
function populateNameCollection() {
    handleModal(createModal());
    return;
}

//Once the form info is populated and button is clicked
// this function saves the names in local storage
// then lets generate questions with generateQuestions()
function collectNames() {
    let player1Name, player2Name, pickQuestions, check;

    player1Name = document.getElementById("player1Name");
    player2Name = document.getElementById("player2Name");
    pickQuestions = document.getElementsByName("choosequestions");

    localStorage.setItem("player1Name", player1Name.value);
    localStorage.setItem("player2Name", player2Name.value);
    check = getChecked(pickQuestions);
    if (getChecked(pickQuestions) === "Y") {
        closeModal();
        handleModal(createModal(), "pickQuestions")
        return;
    }
    closeModal();
    generateQuestions();
    return;
}

//Create the modal seleton and return it 
function createModal() {
    let modal, content, close;

    modal = document.createElement("div");
    modal.id = "myModal";
    modal.className = "modal";

    content = document.createElement("div");
    content.className = "modal-content";

    close = document.createElement("span");
    close.className = "close";
    close.innerHTML = "&times;"
    close.setAttribute("onclick", "closeModal()");

    content.appendChild(close);

    modal.appendChild(content);

    return modal;
}

//fill the modal with the view wanted
//if no names in local storage then make a names collection form
//if state exists then we go and get a list of questions for the 
//users to chose from, can be changed to check for other things
//later on
async function handleModal(modal, state) {

    let input1, input2, label1, label2, btn1, radioButton1, radioButton2, label3, label4, label5;

    let player1 = (localStorage.getItem("player1Name")) ? localStorage.getItem("player1Name") : null;
    let player2 = (localStorage.getItem("player2Name")) ? localStorage.getItem("player2Name") : null;
    if (!player1 && !player2 && state === undefined) {
        input1 = document.createElement("input");
        input1.type = "text";
        input1.name = "player1Name";
        input1.id = "player1Name";
        input1.placeholder = "Enter Player1 Name";

        input2 = document.createElement("input");
        input2.type = "text";
        input2.name = "player2Name";
        input2.id = "player2Name";
        input2.placeholder = "Enter Player2 Name";

        label1 = document.createElement("label");
        label1.innerText = "Player1 Name:";
        label1.htmlFor = "player1Name";

        label2 = document.createElement("label");
        label2.innerText = "Player2 Name:";
        label2.htmlFor = "player2Name";

        label3 = document.createElement("label");
        label3.innerText = "Do you want to choose your own questions ?";
        label3.htmlFor = "choosequestions";

        label4 = document.createElement("label");
        label4.innerText = "yes:";
        label4.htmlFor = "choosequestions";

        label5 = document.createElement("label");
        label5.innerText = "no:";
        label5.htmlFor = "choosequestions";

        radioButton1 = document.createElement("input");
        radioButton1.type = "radio";
        radioButton1.name = 'choosequestions';
        radioButton1.id = 'choosequestions';
        radioButton1.value = "Y";

        radioButton2 = document.createElement("input");
        radioButton2.type = "radio";
        radioButton2.name = 'choosequestions';
        radioButton2.id = 'choosequestions';
        radioButton2.value = "N";

        btn1 = document.createElement("button");
        btn1.setAttribute("onclick", "collectNames()");
        btn1.innerText = "Submit";

        modal.children[0].appendChild(label1);
        modal.children[0].appendChild(input1);
        modal.children[0].appendChild(document.createElement("br"));
        modal.children[0].appendChild(document.createElement("br"));
        modal.children[0].appendChild(label2);
        modal.children[0].appendChild(input2);
        modal.children[0].appendChild(document.createElement("br"));
        modal.children[0].appendChild(document.createElement("br"));
        modal.children[0].appendChild(label3);
        modal.children[0].appendChild(label4);
        modal.children[0].appendChild(radioButton1);
        modal.children[0].appendChild(label5);
        modal.children[0].appendChild(radioButton2);
        modal.children[0].appendChild(document.createElement("br"));
        modal.children[0].appendChild(document.createElement("br"));
        modal.children[0].appendChild(btn1);

        outputHTML(modal);
    } else if (typeof state !== undefined && state === 'pickQuestions') {
        let allQuestions = await getInfo(pickQuestionsEndPoint)
        let div = document.createElement("div");
        div.id = "listofquestions"
        localStorage.setItem('allQuestions', allQuestions);
        allQuestions = JSON.parse(allQuestions);

        for (let i = 0; i < allQuestions.results.length; i++) {
            let checkbox = document.createElement("input");
            let label = document.createElement("label");

            label.innerText = allQuestions.results[i].question
            label.htmlFor = allQuestions.results[i].question;

            checkbox.type = "checkbox";
            checkbox.name = allQuestions.results[i].question;
            checkbox.value = allQuestions.results[i].question;
            checkbox.value = allQuestions.results[i].question;

            div.appendChild(checkbox);
            div.appendChild(label);
            div.appendChild(document.createElement("br"));


        }
        btn1 = document.createElement("button");
        btn1.setAttribute("onclick", "generatingChosenQuestions()");
        btn1.innerText = "Submit";
        div.appendChild(btn1);
        modal.children[0].appendChild(div);
        outputHTML(modal);
    }
    return;
}

//Gettingn the list of questions the user chose
//creating a data structure that looks like this:
//variable:{
//     results:[
//         0:{
//             results:[
//                 0: "api data",
//                 1: "api data",
//                 2: "api data",
//             ]
//         }
//     ]
// }
//Structure was needed in order to simulate an api response
function generatingChosenQuestions() {
    if (validateNumberOfSelections() === true) {
        let chosenquestion, allQuestions, obj = { results: [] };

        allQuestions = JSON.parse(localStorage.getItem('allQuestions'));
        chosenquestion = document.getElementsByTagName("input");

        for (let i = 0; i < 3; i++) {
            obj.results.push({})
            obj.results[i].results = []

        }
        for (let i = 0; i < chosenquestion.length; i++) {
            if (chosenquestion[i].checked) {
                if (i < 6) {
                    obj.results[0].results.push(allQuestions.results[i]);
                } else if (i < 12) {
                    obj.results[1].results.push(allQuestions.results[i]);
                } else {
                    obj.results[2].results.push(allQuestions.results[i]);
                }
            }
        }
        generateQuestions(obj);
    }
    return;

}

//close modal function
function closeModal() {
    let modal;

    modal = document.getElementById("myModal");

    if (modal && modal.style.display !== "none") {
        modal.remove();
    }
    return;

}


//if: loop though each endpoint to generate the questions
//and save the questions for rounds to be used later
//else if: loop through our created data structure in generatingChosenQuestions()
//loop through it as you would the api responses
async function generateQuestions(chosenQuestions) {
    if (chosenQuestions == undefined) {
        for (let i = 0; i < endpoints.length; i++) {
            let questions = await getInfo(endpoints[i]);
            localStorage.setItem("round" + (i + 1).toString(), questions);
        }
    } else if (chosenQuestions) {
        for (let i = 0; i < chosenQuestions.results.length; i++) {
            let object = chosenQuestions.results[i]
            localStorage.setItem("round" + (i + 1).toString(), JSON.stringify(object));
        }
    }


    getQuestions(1);
    return;
}

//asynchronous call to all the api endpoints
//with await, before using promises the page 
//was loading too fast and data was being called
//before being present
async function getInfo(endpoint) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();

        xhr.open("GET", endpoint);

        xhr.onload = function (progressEvent) {

            resolve(this.responseText);
        }

        xhr.send();

    });
}

//Retrieving the questions that i have for the round
//and displaying to the users
function getQuestions(roundNumber) {
    let round = "round", questions, middle, div, player1Header, player2Header, btn, player1Correct = [], player2Correct = [], correct_answer1, correct_answer2, temp1 = [], temp2 = [], allAnswers1 = [], allAnswers2 = [], previousRound, player1 = {}, player2 = {}, modal, counter;
    modal = document.getElementById("myModal");
    previousRound = document.getElementById(`round${roundNumber - 1}`);
    counter = 1;

    if (modal) {
        closeModal();
    }

    if (previousRound) {
        previousRound.remove();
    }

    div = document.createElement("div");
    btn = document.createElement("button");
    round += roundNumber;
    div.id = round;
    questions = JSON.parse(localStorage.getItem(round));
    middle = (questions.results.length / 2);

    //Player1 Questions
    player1Header = document.createElement("h2");
    player1Header.innerText = `Player "${localStorage.getItem('player1Name')}" questions (Round ${roundNumber}):`;
    div.appendChild(player1Header);
    div.appendChild(document.createElement("br"));

    for (let i = 0; i < middle; i++) {
        let questionText = document.createElement("p");

        questionText.innerText = `${i + 1}) ${questions.results[i].question}`;
        div.appendChild(questionText);
        div.appendChild(document.createElement("br"));
        correct_answer1 = questions.results[i].correct_answer;
        player1Correct.push(correct_answer1);

        if (temp1.length > 0) {
            temp1.splice(0, temp1.length);
            allAnswers1.splice(0, allAnswers1.length);
        }

        temp1.push(correct_answer1);
        allAnswers1 = temp1.concat(questions.results[i].incorrect_answers);
        allAnswers1.sort();

        for (let j = 0; j < allAnswers1.length; j++) {
            let radioButton = document.createElement("input");
            let label = document.createElement("label");

            radioButton.type = "radio";
            radioButton.name = `${localStorage.getItem('player1Name')}${i}`;
            radioButton.id = allAnswers1[j];
            label.innerText = allAnswers1[j];
            label.htmlFor = allAnswers1[j];

            radioButton.value = allAnswers1[j]
            div.appendChild(radioButton);
            div.appendChild(label);
        }
    }

    //Player2 Questions
    player2Header = document.createElement("h2");
    player2Header.innerText = `Player "${localStorage.getItem('player2Name')}" questions (Round ${roundNumber}):`;
    div.appendChild(player2Header);
    div.appendChild(document.createElement("br"));

    for (let i = middle; i < (middle * 2); i++) {
        let questionText = document.createElement("p");
        div.appendChild(document.createElement("br"));

        questionText.innerText = `${counter}) ${questions.results[i].question}`;
        div.appendChild(questionText);
        correct_answer2 = questions.results[i].correct_answer;
        player2Correct.push(correct_answer2);

        if (temp2.length > 0) {
            temp2.splice(0, temp2.length);
            allAnswers2.splice(0, allAnswers2.length);
        }

        temp2.push(correct_answer2);
        allAnswers2 = temp2.concat(questions.results[i].incorrect_answers);
        allAnswers2.sort();

        for (let j = 0; j < allAnswers2.length; j++) {
            let radioButton = document.createElement("input");
            let label = document.createElement("label");

            radioButton.type = "radio";
            radioButton.name = `${localStorage.getItem('player2Name')}${i}`;
            radioButton.id = allAnswers2[j];
            label.innerText = allAnswers2[j];
            label.htmlFor = allAnswers2[j];

            radioButton.value = allAnswers2[j]
            div.appendChild(radioButton);
            div.appendChild(label);
        }
        counter++;
    }

    player1.correct_answers = player1Correct;
    player2.correct_answers = player2Correct;
    localStorage.setItem(`player1round${roundNumber}correctanswers`, JSON.stringify(player1));
    localStorage.setItem(`player2round${roundNumber}correctanswers`, JSON.stringify(player2));



    btn.innerText = "Next Round";
    if (roundNumber == 3) {
        btn.setAttribute("onclick", `updateScores(3)`);
    } else {
        btn.setAttribute("onclick", `updateScores(${roundNumber}); getQuestions(${parseInt(roundNumber) + 1})`);
    }
    div.appendChild(document.createElement("br"));
    div.appendChild(document.createElement("br"));
    div.appendChild(btn);
    outputHTML(div);
    return;
}

//updating scores, round number as a parameter to get
//the correct answers to the given questions in that round
//save score in localstorage
function updateScores(roundNumber) {
    let player1score, player2score, counter = 0;

    player1score = (localStorage.getItem('player1score')) ? parseInt(localStorage.getItem('player1score')) : null;
    player2score = (localStorage.getItem('player2score')) ? parseInt(localStorage.getItem('player2score')) : null;

    let p1CorrectAnswers = JSON.parse(localStorage.getItem(`player1round${roundNumber}correctanswers`));
    let p2CorrectAnswers = JSON.parse(localStorage.getItem(`player2round${roundNumber}correctanswers`));

    if (!player1score && !player2score) {
        player1score = 0
        player2score = 0;


        for (let i = 0; i < p1CorrectAnswers.correct_answers.length; i++) {
            let currentAnswer = document.getElementsByName(`${localStorage.getItem("player1Name")}${i}`);
            let answer = getChecked(currentAnswer);

            if (answer == p1CorrectAnswers.correct_answers[i]) {
                player1score += 1;
            }
        }

        for (let i = p1CorrectAnswers.correct_answers.length; i < (p2CorrectAnswers.correct_answers.length + p1CorrectAnswers.correct_answers.length); i++) {
            let currentAnswer = document.getElementsByName(`${localStorage.getItem("player2Name")}${i}`);
            let answer = getChecked(currentAnswer);

            if (answer == p2CorrectAnswers.correct_answers[counter]) {
                player2score += 1;
            }
            counter++;
        }

    } else {
        for (let i = 0; i < p1CorrectAnswers.correct_answers.length; i++) {
            let currentAnswer = document.getElementsByName(`${localStorage.getItem("player1Name")}${i}`);
            let answer = getChecked(currentAnswer);

            if (answer === p1CorrectAnswers.correct_answers[i]) {
                player1score += 1;
            }
        }

        for (let i = p1CorrectAnswers.correct_answers.length; i < (p2CorrectAnswers.correct_answers.length + p1CorrectAnswers.correct_answers.length); i++) {
            let currentAnswer = document.getElementsByName(`${localStorage.getItem("player2Name")}${i}`);
            let answer = getChecked(currentAnswer);

            if (answer == p2CorrectAnswers.correct_answers[counter]) {
                player2score += 1;
            }
            counter++;
        }
    }
    localStorage.setItem("lastplayedround", roundNumber + 1);
    localStorage.setItem('player1score', player1score);
    localStorage.setItem('player2score', player2score);

    if (roundNumber === 3) {
        announceWinner(player1score, player2score);
        return;
    }

    return;
}

//Announce the winner, check the scores and announce accordingly
function announceWinner(score1, score2) {
    let round = document.getElementById(`round3`);
    let announcement;

    announcement = document.createElement("h1");
    round.remove();

    if (score1 > score2) {
        announcement.innerText = `${localStorage.getItem("player1Name")} is the winner, congratulations!!! Great game ${localStorage.getItem("player2Name")}`;
    } else if (score2 > score1) {
        announcement.innerText = `${localStorage.getItem("player2Name")} is the winner, congratulations!!! Great game ${localStorage.getItem("player1Name")}`;
    } else {
        announcement.innerText = ` Great game: ${localStorage.getItem("player1Name")} and ${localStorage.getItem("player2Name")}. You tied this game, play again ?`;
    }
    outputHTML(announcement);
    return
}

//function to handle all the checking of 
//whether a radio button or checkbox was clicked
function getChecked(element) {
    for (let i = 0; i < element.length; i++) {
        if (element[i].checked) {
            return element[i].value
        }
    }
    return null;
}

//Just output HTML
function outputHTML() {
    let mainDiv = document.getElementById("maindiv");

    for (let i = 0; i < arguments.length; i++) {
        mainDiv.appendChild(arguments[i])
    }
    return;
}

function validateNumberOfSelections() {
    let list = document.getElementsByName("listofquestions");
    let counter = 0;
    if (list) {
        let input = document.getElementsByTagName("input");
        for (let i = 0; i < input.length; i++) {
            if (input[i].checked) {
                counter++;
            }
        }
        if (counter > 18) {
            alert(`You have too many selections, remove: ${counter - 18} selections`);
            return false;
        } else if (counter < 18) {
            alert(`You don't have enough selections, add ${18 - counter} selections`);
            return false;
        } else {
            return true;
        }

    }
}
