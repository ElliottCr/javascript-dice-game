var globals;
var rounds;
var currentPlayer;

window.onload = () => {
    reset();
    document.getElementById("btn-new-game").addEventListener("click", reset)
}

function reset() {
    console.log("Reset")
    globals = [0, 0]
    rounds = [0, 0]
    currentPlayer = 2;

    turn();

    //console.log(document.querySelector("#player1 .hold").innerHTML);
    //document.querySelector("#player1 .hold").disabled = true;
}

function turn() {
    console.log(currentPlayer);
    let disabledPlayer = currentPlayer;
    currentPlayer = currentPlayer == 1 ? 2 : 1
    document.querySelector(`#player${currentPlayer} .hold`).disabled = false;
    document.querySelector(`#player${currentPlayer} .roll`).disabled = false;
    document.querySelector(`#player${disabledPlayer} .hold`).disabled = true;
    document.querySelector(`#player${disabledPlayer} .roll`).disabled = true;
}