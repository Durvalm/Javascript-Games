const player1Point = document.querySelector('.point-1');
const player2Point = document.querySelector('.point-2');

// Get random number
const getRandomNum = function(max, min, quantity, result) {
    let numsArray = [] // Holds two  numbers for the operation

    while (numsArray.length < quantity) {
        let num = Math.floor(Math.random() * (max - min + 1)) + min;  // (max - min + 1) + min
        // Allow only even nums, different from result, and not already in array
        if (num % 2 === 0 && num != result && !numsArray.includes(num)) numsArray.push(num);
    }
    return numsArray
}

// Change Player Turn
const changeTurn = function(playerTurn, currentPlayer) {
    if (playerTurn === 1) playerTurn = 2
    else if (playerTurn === 2) playerTurn = 1;
    currentPlayer.textContent = `Player ${playerTurn}'s turn`;
    return playerTurn;
}

// Transforms values, ex: (16, 23, X) in equation, ex: (16 x 23) 
const stringifyEquation = function(firstNum, secondNum, operation) {
    return `${firstNum} ${operation} ${secondNum}`
}

// If second number in operation is greater, change order
const changeEquationOrder = function(firstNumber, secondNumber) {
    if (secondNumber > firstNumber){
        let tempValue = firstNumber;
        firstNumber = secondNumber
        secondNumber = tempValue;
    }
    return [firstNumber, secondNumber]
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

// Function that updates textContent score
const updateScore = function(playerTurn, scores) {
    if (playerTurn === 1) {
        player1Point.textContent = scores[0];
    } else if (playerTurn === 2) {
        player2Point.textContent = scores[1];
    }
}

export {getRandomNum, changeTurn, stringifyEquation, changeEquationOrder, sleep,
        updateScore,}