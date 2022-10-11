var globals;
var rounds;
var currentPlayer;

var diceSfx = [new Audio("assets/sfx/die1.ogg"), new Audio("assets/sfx/die2.ogg"), new Audio("assets/sfx/die3.ogg"), new Audio("assets/sfx/die4.ogg"), new Audio("assets/sfx/die5.ogg")]

window.onload = () => {
    reset();
    document.getElementById("btn-new-game").addEventListener("click", reset)
}

// Reset the game.
function reset() {
    // Starting values.
    console.log("Reset")
    globals = [0, 0]
    rounds = [0, 0]
    currentPlayer = 2;

    // Set global scores to 0.
    document.querySelector("#player1 .player-score").innerHTML = "0";
    document.querySelector("#player2 .player-score").innerHTML = "0";

    // Add a click event for roll and hold buttons.
    document.querySelector("#player1 .roll").addEventListener("click", roll)
    document.querySelector("#player1 .hold").addEventListener("click", hold)
    document.querySelector("#player2 .roll").addEventListener("click", roll)
    document.querySelector("#player2 .hold").addEventListener("click", hold)

    turn();
}

function turn() {
    // Set the rounds back to 0.
    rounds = [0, 0]
    document.querySelector("#player1 .round").innerHTML = "0";
    document.querySelector("#player2 .round").innerHTML = "0";

    // Swaps current player.
    let disabledPlayer = currentPlayer;
    currentPlayer = currentPlayer == 1 ? 2 : 1

    // Disable and enable buttons.
    document.querySelector(`#player${currentPlayer} .hold`).disabled = false;
    document.querySelector(`#player${currentPlayer} .roll`).disabled = false;
    document.querySelector(`#player${disabledPlayer} .hold`).disabled = true;
    document.querySelector(`#player${disabledPlayer} .roll`).disabled = true;
}

// Rolls a dice and adds it to the round value, if the roll is 1, the round doesn't get added to the global and it's the next player's turn.
function roll() {
    let diceRoll = Math.floor(Math.random() * 6) + 1;
    let diceEl = document.querySelector(`#player${currentPlayer} .dice`);

    // Animate and styles the dice image.
    diceEl.style.backgroundImage = `url('images/dice${diceRoll}.png')`;
    diceEl.classList.remove("dice-anim");
    diceEl.offsetWidth;
    diceEl.classList.add("dice-anim");
    
    diceSfx[Math.floor(Math.random() * 3)].play();

    if (diceRoll == 1) {
        turn();
    } else {
        rounds[currentPlayer - 1] += diceRoll;
        document.querySelector(`#player${currentPlayer} .round`).innerHTML = `+${rounds[currentPlayer - 1]}`;
    }
}

// Adds round value to global value and goes to the next turn.
function hold() {
    diceSfx[2+currentPlayer].play();
    globals[currentPlayer - 1] += rounds[currentPlayer - 1];
    document.querySelector(`#player${currentPlayer} .player-score`).innerHTML = globals[currentPlayer - 1];
    turn();
}