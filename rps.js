// Computer returns a random of RPS
function getComputerChoice() {
    const CHOICES = ["Rock", "Paper", "Scissors"];
    let choice = Math.floor(Math.random() * CHOICES.length);
    return CHOICES[choice];
}
// Player selection of RPS
function playerSelection() {
    let choice = prompt("Please enter your choice: \n Rock, Paper or Scissors");
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