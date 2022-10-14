// QuerySelector Variables
const header = document.querySelector('.header');
const boxes = document.querySelectorAll('.box');
const gameOptions = document.querySelector('.game-options');
const gameOptionsText = document.querySelector('.game-options-text');
const button = document.querySelector('.button');
const restart = document.getElementById('restart');
const player1ScoreHTML = document.querySelector('.player-1-score');
const player2ScoreHTML = document.querySelector('.player-2-score');
const tieHTML = document.querySelector('.tie');
const body = document.querySelector('body');
const continueButton = document.querySelector('.continue')

// Game Variables
let isOver = false;
let playerTurn = '';
let currentStarter = '';
let winner = '';
let player1Score = 0;
let player2Score = 0;
let tie = 0;
let count = 0;

// Function that slices score string to get the score number
const getNumber = function(str) {
    return str.split(" ")[-1]
}


// Handle Button input from user
// Iterate through each button (P1, P2)
button.addEventListener('click', function() {

    // Change text and buttons from UI
    gameOptions.style.visibility = 'hidden';
    gameOptionsText.style.visibility = 'visible';
    restart.style.visibility = 'visible';
    gameOptionsText.textContent = 'Press button to restart game';
    header.textContent = 'Place X to start the game!';

    currentStarter = 'X'
    playerTurn = 'X'

    // Remove Xs and Os from the game board
    boxes.forEach(box => {
        box.textContent = '';
        })
    })


// Restart match if restart button is pressed
restart.addEventListener('click', function() {
    location.reload();
})

// Function that checks if user won
const checkScore = function() {
    if (boxes[0].textContent === playerTurn & boxes[1].textContent === playerTurn & boxes[2].textContent === playerTurn) null    
    else if (boxes[3].textContent === playerTurn & boxes[4].textContent === playerTurn & boxes[5].textContent === playerTurn) null
    else if (boxes[6].textContent === playerTurn & boxes[7].textContent === playerTurn & boxes[8].textContent === playerTurn) null
    else if (boxes[0].textContent === playerTurn & boxes[3].textContent === playerTurn & boxes[6].textContent === playerTurn) null
    else if (boxes[1].textContent === playerTurn & boxes[4].textContent === playerTurn & boxes[7].textContent === playerTurn) null
    else if (boxes[2].textContent === playerTurn & boxes[5].textContent === playerTurn & boxes[8].textContent === playerTurn) null
    else if (boxes[0].textContent === playerTurn & boxes[4].textContent === playerTurn & boxes[8].textContent === playerTurn) null
    else if (boxes[2].textContent === playerTurn & boxes[4].textContent === playerTurn & boxes[6].textContent === playerTurn) null

    // If no one won, check turn count, if it's 9, game is over
    else {
        if (count === 9){
            tie++;
            tieHTML.textContent = tie;
            winner = 'Tie';
            isOver = true
            return 

        } else return
    };

    // Update variables if someone won the match
    isOver = true;
    winner = playerTurn;
    if (winner === 'X') {
        player1Score++;
        player1ScoreHTML.textContent = player1Score;
    }
    else if (winner === 'Y') {
        player2Score++;
        player2ScoreHTML.textContent = player2Score;
    }
};

// Match is over, update variables
const matchOver = function() {

    body.style.backgroundColor = 'green'; // set background to green
    header.textContent = winner === 'Tie' ? `It's a tie, press continue` : `Player ${winner} won the match, press continue`; // adjust text
    header.style.marginLeft = '50px'
    continueButton.style.visibility = 'visible'; // Show continue button
    currentStarter = currentStarter === 'X' ? 'Y' : 'X'; // Switch whoever starts the game

    // Continue if user presses start
    continueButton.addEventListener('click', function(){
        // Remove Xs and Os from the game board
        boxes.forEach(box => {
            box.textContent = '';
        })

        // Update variables to restart game
        continueButton.style.visibility = 'hidden';
        body.style.backgroundColor = 'cadetblue';
        header.textContent = `Place ${currentStarter} to start the game!`;
        winner = '';
        isOver = false;
        playerTurn = currentStarter;
        count = 0;
    })
};


// Play the match
boxes.forEach(box => {
    box.addEventListener('click', function() {
        // Don't let user play in already filled spot
        if (box.textContent != '') return;
        // Don't let user play if match is finished
        if (isOver) return;

        // Fill in spot for user's play
        box.textContent = playerTurn;
        // Increase turn's count
        count++;
        // Check score function to see if someone won
        checkScore();

        // Switch playerTurn and change text
        playerTurn = playerTurn === 'Y' ? 'X': 'Y';
        header.textContent = `${playerTurn}, it's your turn`;

        // Is someone won or it's a tie, call matchOver function
        if (isOver) matchOver();
    })
})
