const CHOICES = ["rock", "paper", "scissors"];
const WINNERMAP = {
    "rock": "paper",
    "scissors": "rock",
    "paper": "scissors"
};

let count = 5;
const SCORE = {
    "computer": 0,
    "player": 0
};


// Computer returns a random of RPS
function getComputerChoice() {
    let choice = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[choice];
}


// Player selection of RPS
function playerSelection(obj) {
    // let choice = prompt("Please enter your choice: \n Rock, Paper or Scissors").toLowerCase();
    console.log(obj.data);
    
    // while (!CHOICES.includes(choice)) {
    //     choice = prompt("Please only enter 'Rock', 'Paper' or 'Scissors': ");
    //     choice = choice.toLowerCase();
    // };
    
    return obj.data;
}


function buttonListener() { 
    const btns = document.querySelectorAll( ".choice" );
    btns.forEach( btn => btn.addEventListener("click", playerSelection));
}


function capitalize(word) {
    let capitalLetter = "";
    capitalLetter = word[0].toUpperCase();
    word = word.slice(1,);
    return capitalLetter + word;
}


function announceWinner(isWinner) {
    if (isWinner) { 
        return `You Win!`;
    } 
    return `You Lose.`;
}


function announceHowWon(selections) {
    return ` ${capitalize(selections[0])} beats ${capitalize(selections[1])}`;
}


function compareChoices(pChoice, cChoice) {
    return WINNERMAP[cChoice] == pChoice;
}


// Call whoWon with playRound
function whoWon(outcome) {
    return outcome ? 
            "player" : 
            "computer";
}


// Play a round of RPS
function playRound(compChoice, playerChoice) { 
    // Play a round of RPS, returning the winner or message
    let roundWinner = null;
    let message = "";
    let result = "tie";
    
    if (compChoice == playerChoice) {
        message = capitalize(result);
    } else {
        result = compareChoices(playerChoice, compChoice);
        message = announceWinner(result);
        roundWinner = whoWon(result);
        message += announceHowWon(
                    (roundWinner == "player") ? 
                        [playerChoice, compChoice] : 
                        [compChoice, playerChoice]
                    );
    }
    
    console.log(message);
    alert(message);
    return roundWinner != null ? roundWinner : message;
} 


function gameWinnerMsg(gameScore) {
    // Based on the winner, set the message to display
    let winner = gameScore["computer"] == gameScore["player"]? 
                    "Tie" : 
                    gameScore["computer"] > gameScore["player"] ? 
                        "computer" : 
                        "player";
    
    return winner == "Tie" ? 
            "You Tied! Wait, this isn't supposed to happen!?" : 
            `The Winner is ${winner}!`;
}


function consoleDisplay() {
    var realConsoleLog = console.log;
    let div = document.querySelector(".output");
    var conMessages = [];  
    
    console.log = function () {
        var message = [].join.call(arguments, "\n");
        conMessages.push(message); 
        message = conMessages.join("\n");
        div.value = message;
        realConsoleLog.apply(console, arguments);
    };
    
    console.log("Welcome to Rock, Paper, Scissors.\n");
}


function compareChoices(pChoice, cChoice) {
    return announceWinner(pChoice, cChoice, WINNERMAP[cChoice] == pChoice);
}

function announceWinner(pChoice, cChoice, isWinner) {
    if (isWinner) { 
        return `You Win!  ${pChoice} beats ${cChoice}.`;
    } 
    return `You Lose.  ${cChoice} beats ${pChoice}.`;
}


function game() {
    consoleDisplay();
    
    // Use the loop to iterate through five games and return the winner, if there is one
    for (let i = 0; i < count; i++) {
        let compSelection = getComputerChoice();
        let playerChoice = buttonListener();
        let roundResult = playRound(compSelection, playerChoice);
        let winner = roundResult == "Tie" ? 
                        "tie" :  
                        roundResult;
        
        console.log(`Computer choice: ${compSelection}`);
        console.log(`Player choice: ${playerChoice}`);
        console.log(winner);
        
        if (winner != "tie") {
            SCORE[winner]++;
        }
    }
    
    let msg = gameWinnerMsg(SCORE);
    console.log(msg);
    alert(msg);
}






// Tests
function testGetComputerChoice() {
    let run = 15;
    
    while(run != 0) {
        console.log(getComputerChoice());
        console.log(`Debugging: Looping`);
        run--;
    }
}


function testPlayRound() {
    let result = playRound(getComputerChoice(), buttonListener());
    alert(result)
}
