const buttons = document.querySelectorAll('.grid button');
const wonDiv = document.getElementsByClassName('won')[0];
let turn = 1; // odd is X, even is O
let firstButton = true;
let gameboard = Array(9).fill('-'); // Initialize gameboard with empty strings
let playerWonX = false;
let playerWonO = false;
let draw = false; // Change to false to properly handle the draw condition
const reset = document.getElementById('reset');
reset.addEventListener("click", function(){
    turn = 1; // odd is X, even is O
    firstButton = true;
    gameboard = Array(9).fill('-'); // Initialize gameboard with empty strings
    playerWonX = false;
    playerWonO = false;
    draw = false; // Change to false to properly handle the draw condition
    buttons.forEach((btn) => {
        btn.textContent = '';
    });
    wonDiv.innerHTML = "";
})

function Gameboard(index) {
    function won(player) {
        if (
            (gameboard[0] == player && gameboard[0] == gameboard[1] && gameboard[0] == gameboard[2]) ||
            (gameboard[3] == player && gameboard[3] == gameboard[4] && gameboard[3] == gameboard[5]) ||
            (gameboard[6] == player && gameboard[6] == gameboard[7] && gameboard[6] == gameboard[8]) ||
            (gameboard[0] == player && gameboard[0] == gameboard[4] && gameboard[0] == gameboard[8]) ||
            (gameboard[2] == player && gameboard[2] == gameboard[4] && gameboard[2] == gameboard[6])
        ) {
            return true;
        }
        return false;
    }

    function empty(gameboard) {
        for (let i = 0; i < 9; i++) {
            if (gameboard[i] == '-') {
                return true;
            }
        }
        return false;
    }

    function modifyGameboard(index, gameboard) {
        if (gameboard[index] == '-' && !playerWonO && !playerWonX && !draw) {
            gameboard[index] = turn % 2 !== 0 ? 'X' : 'O';
        }
    }

    console.log("Before move:", gameboard);

    modifyGameboard(index, gameboard);

    console.log("After move:", gameboard);

    playerWonX = won('X');
    playerWonO = won('O');
    draw = !empty(gameboard);

    if (playerWonX || playerWonO || draw) {
        console.log("Final gameboard:", gameboard);
    }
}

buttons.forEach((btn) => {
    btn.addEventListener("click", function () {
        if(!playerWonO && !playerWonX){
            
            const index = btn.dataset.index;
            console.log("Button clicked:", index);
    
            if (firstButton) {
                console.log("First move!");
                firstButton = false; // Update firstButton after the first move
            }
    
            const player = turn % 2 !== 0 ? 'X' : 'O';
    
            if (btn.textContent == '' && !playerWonX && !playerWonO && !draw) {
                btn.textContent = player;
                turn++;
                Gameboard(index);
            }
    
            if (playerWonX || playerWonO) {
                let p = document.createElement('p');
                p.textContent = "Player " + player + " won!";
                wonDiv.appendChild(p);
    
                // Disable further clicks after a win or draw
                buttons.forEach((btn) => {
                    btn.removeEventListener("click", () => {});
                });
            } else if(draw){
                let p = document.createElement('p');
                p.textContent = "Its a draw.";
                wonDiv.appendChild(p);
            }
        }
    });
});
