const CHOICES = ["rock", "paper", "scissors"];
const WINNERMAP = {
    "rock": "paper",
    "scissors": "rock",
    "paper": "scissors"
};
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


function announceWinner(isWinner) {
    if (isWinner) { 
        return `You Win!`;
    } 
    return `You Lose.`;
}


function capitalize(word) {
    let capitalLetter = "";
    capitalLetter = word[0].toUpperCase();
    word = word.slice(1,);
    return capitalLetter + word;
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
    // Play a round of RPS, returning the winner
    let roundWinner = null;
    let message = "";
    let result = null;
    let choices = null;
    
    if (compChoice == playerChoice) {
        result = "tie";
        message = capitalize(result);
    } else {
        result = compareChoices(playerChoice, compChoice);
        message = announceWinner(result);
        roundWinner = whoWon(result);
        choices = roundWinner == "player" ? 
                    [playerChoice, compChoice] : 
                    [compChoice, playerChoice];
        message += announceHowWon(choices);
    }
    
    console.log(message);
    alert(message);
    return roundWinner != null ? roundWinner : message;
} 


function gameWinnerMsg(gameScore) {
    let winner = gameScore["computer"] == gameScore["player"]? 
        "Tie" : 
        gameScore["computer"] > gameScore["player"] ? 
            "computer" : 
            "player";
    // Based on the winner, set the message to display
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
    let count = 5;
    let score = {
        "computer": 0,
        "player": 0
    };
    
    // Use the loop to iterate through five games and return the winner, if there is one
    for (let i = 0; i < count; i++) {
        let compSelection = getComputerChoice();
        let playerChoice = playerSelection();
        console.log(`Computer choice: ${compSelection}`);
        console.log(`Player choice: ${playerChoice}`);
        let roundResult = playRound(compSelection, playerChoice);
        let winner = roundResult == "Tie" ? 
                                "tie" :  
                                roundResult;
        console.log(winner);
        
        if (winner != "tie") {
            score[winner]++;
        }
        console.log(score);
        
    }
    
    console.log(score);
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
