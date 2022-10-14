import { getRandomNum, changeTurn, sleep, updateScore, stringifyEquation, changeEquationOrder,
        } from "./helpers.js";

// DOM variables
const body = document.querySelector('body');
const currentPlayer = document.querySelector('.current-player');
const countdown = document.querySelector('.countdown');
const equation = document.querySelector('.equation');
const options = document.querySelectorAll('.option');
const button = document.querySelector('.game-button');
const roundHTML = document.querySelector('.round');
const attemptHTML = document.querySelector('.attempt');

// Other variables
let round = 0;
let attempt = 0;
let sec = 19;
let playerTurn = 2;
let scores = [0, 0];
let answers = [];
let intervalId = '';
let switchMode = false;
let running = false;

// Variables from equation
const operationsArray = ['x', '+', '-', '÷']; // Array of different operations
let randomElement = '';
let result = 0.5;
let firstNumber = 0;
let secondNumber = 0;

// Function that runs countdown
const runCountdown = function(time) {
    sec = time;
    countdown.textContent = sec;
    intervalId = setInterval(function() {
        if (sec <= 0 && switchMode === false) {
            wrongAnswer();
        };
        countdown.textContent = sec;
        sec--;
        }, 1000);
}

// Behavior when user misses the question
const wrongAnswer = function() {
    // before sleep
    body.style.background = 'red';
    options.forEach(option => {
        if (option.textContent == result) {
            option.style.background = 'yellow';
        }
    })
    clearInterval(intervalId);

    // After sleep
    sleep(2000).then(() => {
    options.forEach(option => {
        if (option.textContent == result) {
            option.style.background = 'azure';
        }
    })
    runGame();
    })
} 

// Behavior when user gets the question right
const rightAnswer = function(option) {
    // Before sleep
    body.style.background = 'green';
    option.style.background = 'blue';
    scores[playerTurn - 1] += sec+1;
    updateScore(playerTurn, scores);
    clearInterval(intervalId);

    // After sleep
    sleep(2000).then(() => {
    option.style.background = 'azure';
    runGame();
    })
}

const turnTransition = function() {
    playerTurn = changeTurn(playerTurn, currentPlayer);
    // Change style
    equation.textContent = `It's Player ${playerTurn}'s Turn!`;
    equation.style.padding = '7rem 12rem';
    options.forEach(option => {
        option.textContent = '';
    })
    body.style.background = '';
    body.style.backgroundImage = 'linear-gradient(#753682 0%, #bf2e34 100%)';
    attemptHTML.textContent = `Attempt ${attempt}`;
    // Update round every time count is reset
    if (attempt === 0 && playerTurn === 1) {
        round++;
        roundHTML.textContent = `Round ${round}`;
    };
    clearInterval(intervalId);
    
    // Change variables
    attempt = 0;
    switchMode = true

    // Run 10 seconds countdown to switch player
    runCountdown(9);

    // Go back to game after 10 seconds
    sleep(10000).then(() => { 
        clearInterval(intervalId)
        runGame();
    })
}

// Generates Random Equation
const generateEquation = function() {
    randomElement = Math.floor(Math.random() * operationsArray.length); // Get random operation from array

    // If operation is division or multiplication
    if (randomElement === 0 || randomElement === 3){
        // While loop to make  sure result is not a decimal
        result = 0.5;
        while (result % 1 != 0) {
            [firstNumber, secondNumber] = getRandomNum(20, 2, 2) // Get 2 random nums

            // set result if operation is multiplication
            if (randomElement === 0) result = firstNumber * secondNumber
            // if operation is division, make sure the biggest number is being divided
            else if (randomElement === 3) {
                [firstNumber, secondNumber] = changeEquationOrder(firstNumber, secondNumber)
                // Set result for division
                result = firstNumber / secondNumber;
            }
        }
    } 

    //  If Operation is addition or subtraction
    else if (randomElement === 1 || randomElement === 2){
        [firstNumber, secondNumber] = getRandomNum(100, 50, 2) // Get 2 random nums

        // if operation is addition, set result
        if (randomElement === 1) result = firstNumber + secondNumber

        // if operation is subtraction, make sure second number is smaller than first
        else if (randomElement === 2) {
            [firstNumber, secondNumber] = changeEquationOrder(firstNumber, secondNumber)
            // Set result  for subtraction
            result = firstNumber - secondNumber;
        }
    } 
}

// Generates 4 answer options for the user
const generateAnswers = function() {
    // Get 3 answers which are close to the final result
    answers = getRandomNum(result-10, result+10, 3, result)
    answers.push(result);  // Push final answers to answers array
    answers = answers.sort(() => Math.random() - 0.5) // Sort it
}

// Run game
const runGame = function() {
    body.style.backgroundImage = '';
    body.style.background = 'antiquewhite';
    switchMode = false;

    runCountdown(19);
    generateEquation();  
    generateAnswers();

    // Change text in UI of equation 
    let strEquation = stringifyEquation(firstNumber, secondNumber, operationsArray[randomElement])
    equation.textContent = strEquation;

    //  Change content in UI for the 4 options
    let temp = 0;
    options.forEach(option => {
        option.textContent = answers[temp];
        temp++;
    }) 

    // Change player turn when round === 10
    if (attempt >= 5) {
        attempt = 0
        turnTransition();
    } else {
        // Add one more unity to round
        attempt++;
        attemptHTML.textContent = `Attempt ${attempt}`;
    };
}

// Deal with user choosing option
options.forEach(option => {
    option.addEventListener('click', function() {
        if (switchMode) return;
        // if choice is right
        if (option.textContent == result) {
            rightAnswer(option);
        }
        // if choice is wrong
        else if (option.textContent != result) {
            wrongAnswer(option);
        }
    })
})

// Start/End Game
button.addEventListener('click', function() {
    if (running === true) {
        location.reload();  
    } else {
        running = true;
        button.textContent = 'End'
        button.style.background = 'red'
        turnTransition();
    }
})
