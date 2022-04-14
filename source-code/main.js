// rolling the dice
'use strict'

// run function start when game is loaded
start();

function start() {
    handleRollDice();
}

// function handleRollDice
function handleRollDice() {
    // declare variables
    const players = document.querySelectorAll('.player');
    const playersTotalScoreDisplayBlock = document.querySelectorAll('.score');
    const playersCurrentScoreDisplayBlock = document.querySelectorAll('.current-score');

    const diceBlock = document.querySelector('.dice');

    const newButton = document.querySelector('.btn--new');
    const rollButton = document.querySelector('.btn--roll');
    const holdButton = document.querySelector('.btn--hold');

    // init scores
    let playersTotalScore;
    let playersCurrentScore;

    // init playerNumber
    let playerNumber;

    // init game state
    let gameState;

    // reset everything to the initial state
    reset();

    // click on 'doll dice' button
    rollButton.addEventListener('click', e => {
        if (gameState) {
            // determin playerNumber of current player
            for (let i = 0; i < players.length; i++) {
                (players[i].classList.contains('player--active')) && (playerNumber = i);
            }
            
            // create random diceScore and display on diceBlock
            const diceScore = Math.trunc(Math.random() * 6 + 1);
            
            diceBlock.classList.remove('hidden');
            diceBlock.src = `./assets/dice-${diceScore}.png`;
            
            // check if diceScore is 1 or not
            // if 1 then reset diceScores[playerNumber] to 0, and switch turn
            // if not 1 then display the diceNumber on diceScoreDisplayBlock
            if (diceScore !== 1) {
                playersCurrentScore[playerNumber] += diceScore;
                playersCurrentScoreDisplayBlock[playerNumber].textContent = playersCurrentScore[playerNumber];
            }
            else {
                switchPlayer();
            }
        }
    })

    // click on 'hold' button
    holdButton.addEventListener('click', e => {
        if (gameState) {
            playersTotalScore[playerNumber] += playersCurrentScore[playerNumber];
            if (playersTotalScore[playerNumber] >= 50) {
                // display the winner's score
                playersTotalScoreDisplayBlock[playerNumber].textContent = playersTotalScore[playerNumber];
                // hide the dice and change winner's theme
                diceBlock.classList.add('hidden');
                players[playerNumber].classList.remove('player--active');
                players[playerNumber].classList.add('player--winner');
                // reset game state
                gameState = 0;
            }
            else {
                // store the total number of current player
                playersTotalScoreDisplayBlock[playerNumber].textContent = playersTotalScore[playerNumber];
                switchPlayer();
            }
        }
    })

    // click on 'new game' button
    newButton.addEventListener('click', e => {
        reset();
    })

    // declare function reset currentScore and switch player
    function switchPlayer() {
        // reset the playerCurrentScore to 0
        playersCurrentScore[playerNumber] = 0;
        playersCurrentScoreDisplayBlock[playerNumber].textContent = playersCurrentScore[playerNumber];
        // switch to other player
        playerNumber = (playerNumber = 0) ? 1 : 0;
        players[0].classList.toggle('player--active');
        players[1].classList.toggle('player--active');
    }

    // declare function reset
    function reset() {// init playerNumber
        playerNumber = 0;
        // reset gameState
        gameState = 1;
        // hide the dice
        diceBlock.classList.add('hidden');
        // reset total and current score
        playersTotalScore = [0, 0];
        playersCurrentScore = [0, 0];
        // reset total and current score display to 0// determine initial state
        for (let i =- 0; i < playersTotalScoreDisplayBlock.length; i++) {
            playersTotalScoreDisplayBlock[i].textContent = playersTotalScore[i];
        }
        for (let i =- 0; i < playersCurrentScoreDisplayBlock.length; i++) {
            playersCurrentScoreDisplayBlock[i].textContent = playersCurrentScore[i];
        }
        // reset player
        players[0].classList.remove('player--winner');
        players[0].classList.add('player--active');
        players[1].classList.remove('player--winner');
        players[1].classList.remove('player--active');
    }
}