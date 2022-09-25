const CHOICES = ["rock", "paper", "scissors"];
const WINNERMAP = {
    "rock": "paper",
    "scissors": "rock",
    "paper": "scissors"
}
let count = 5;
let score = {
    "computer": 0,
    "player": 0
};


// Computer returns a random of RPS
function getComputerChoice() {
    let choice = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[choice];
}


// Player selection of RPS
function playerSelection() {
    let choice = prompt("Please enter your choice: \n Rock, Paper or Scissors").toLowerCase();
    console.log(choice);
    
    while (!CHOICES.includes(choice)) {
        choice = prompt("Please only enter 'Rock', 'Paper' or 'Scissors': ");
        choice = choice.toLowerCase();
    };
    
    return choice;
}


// Announce the winner
function announceWinner(pChoice, cChoice, isWinner) {
    if (isWinner) { 
        return `You Win!  ${pChoice} beats ${cChoice}.`;
    } 
    return `You Lose.  ${cChoice} beats ${pChoice}.`;
}


// Evaluate the choices
function compareChoices(pChoice, cChoice) {
    return announceWinner(pChoice, cChoice, WINNERMAP[cChoice] == pChoice);
}


// Play a round of RPS
function playRound(compChoice, playerChoice) { 
    // Play a round of RPS, returning the winner
    let result = null;
    // Evaluate the choices and see who won
    
    if (compChoice == playerChoice) {
        result = "Tie";
        return result;
    }
    
    result = compareChoices(playerChoice, compChoice);
    return result;
}


function whoWon(outcome) {
    return outcome.includes("Tie") ? "tie" : outcome.includes("Win") ? "player" : "computer";
}


function gameWinnerMsg(gameScore) {
    let winner = gameScore["computer"] == gameScore["player"]? "Tie" : gameScore["computer"] > gameScore["player"] ? "computer" : "player";
    // Based on the winner, set the message to display
    return winner == "Tie" ? "You Tied! Wait, this isn't supposed to happen!?" : `The Winner is ${winner}!`;
}


// Mirror the console output in the html
function consoleDisplay() {
    var realConsoleLog = console.log;
    let div = document.querySelector(".output");
    var conMessages = [];
    div.value = "";
    
    console.log = function () {
        var message = [].join.call(arguments, "\n");
        conMessages.push(message); 
        message = conMessages.join("\n");
        div.value = message;
        realConsoleLog.apply(console, arguments);
    };
    
    console.log("Welcome to Rock, Paper, Scissors.\n");
}


// A full game is five rounds
function game() {
    consoleDisplay();
    
    // Use the loop to iterate through five games and return the winner, if there is one
    for (let i = 0; i < count + 1; i++) {
        let roundWinner = playRound(getComputerChoice(), playerSelection());
        alert(roundWinner);
        let winner = whoWon(roundWinner);
        console.log(winner);
        score[winner]++;
    }
    
    // Depending on the score, determine the winner
    let msg = gameWinnerMsg(score);
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
    let result = playRound(getComputerChoice(), playerSelection());
    alert(result)
}