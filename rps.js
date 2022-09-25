const CHOICES = ["rock", "paper", "scissors"];
const WINNERMAP = {
    "rock": "paper",
    "scissors": "rock",
    "paper": "scissors"
}

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

function playRound(compChoice, playerChoice) { 
    // Play a round of RPS, returning the winner
    let result = null;
    // Evaluate the choices and see who won
    
    if (compChoice == playerChoice) {
        result = "Tie";
    } else {
        result = compareChoices(playerChoice, compChoice);
    }
    
    alert(result);
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
    for (let i = 0; i < count + 1; i++) {
        let result = playRound(getComputerChoice(), playerSelection());
        let winner = result == "Tie" ? "tie" :  result.includes("Win") ? "player" : "computer";
        console.log(winner);
        
        if (winner == "tie") {
            count++;
        } else {
            score[winner]++;
        }
        // console.log(score);
    }
    
    console.log(score);
    // Depending on the score, determine the winner
    let winner = score["computer"] == score["player"]? "Tie" : score["computer"] > score["player"] ? "computer" : "player";
    // Based on the winner, set the message to display
    let msg = winner == "Tie" ? "You Tied! Wait, this isn't supposed to happen!?" : `The Winner is ${winner}!`;
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
    console.log("Display console working.\n");
}