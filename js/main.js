
// RESIZING THE SPIRAL
// In order to resize the spiral, please, follow these steps:
// 1) In this file change the value of the 'pointSize' variable,
// 2) In the file style.css, at the 'body .board .point' selector change the width and height values.
// All values mentioned above should be the same to provide the optimal execution. 

// Variables
const board = document.querySelector('.board'),
    boardWidth = document.querySelector(".board").offsetWidth,
    boardHeight = document.querySelector(".board").offsetHeight;

const numbers = [],
    primes = [],
    pointSize = 4; // pointSize variable - change the value to resize the spiral

let currentNumber = 2,
    ordinalNumber = 1,
    timer = 1,
    turn = 'right',
    currentSteps = 0,
    totalSteps = 1,
    fromLeft = boardWidth / 2,
    fromTop = boardHeight / 2;

// Main function
const drawSpiral = function () {

    numbers.push(currentNumber);

    let dividersCount = 1;

    const point = document.createElement('div');
    point.classList.add('point');

    // If the currentNumber has more than two dividers, the app finishes checking the currentNumber and goes to the next number.
    for (let i = 0; i < numbers.length; i++) {
        (currentNumber % numbers[i] === 0) ? dividersCount++ : dividersCount;
        if (dividersCount > 2) break;
    }

    // The following if-statement executes only at prime numbers
    if (dividersCount === 2) {
        primes.push(currentNumber);
        point.classList.add('prime');
    }

    // Managing the drawing process
    if (turn === 'right') {
        fromLeft += pointSize;
        point.style.left = `${fromLeft}px`;
        point.style.top = `${fromTop}px`;
        currentSteps++;
        if (currentSteps > totalSteps && totalSteps === 1) {
            fromLeft -= pointSize;
            point.style.left = `${fromLeft}px`;
            turn = 'up';
            currentSteps = 0;
        }
        if (currentSteps === totalSteps && totalSteps > 2) {
            fromLeft -= pointSize;
            point.style.left = `${fromLeft}px`;
            turn = 'up';
            currentSteps = 0;
        }
    }

    if (turn === 'up') {
        fromTop -= pointSize;
        point.style.left = `${fromLeft}px`;
        point.style.top = `${fromTop}px`;
        currentSteps++;
        if (currentSteps > totalSteps) {
            fromTop += pointSize;
            point.style.top = `${fromTop}px`;
            turn = 'left';
            currentSteps = 0;
            totalSteps++;
        }
    }

    if (turn === 'left') {
        fromLeft -= pointSize;
        point.style.left = `${fromLeft}px`;
        point.style.top = `${fromTop}px`;
        currentSteps++;
        if (currentSteps > totalSteps) {
            fromLeft += pointSize;
            point.style.left = `${fromLeft}px`;
            turn = 'down';
            currentSteps = 0;
        }
    }

    if (turn === 'down') {
        fromTop += pointSize;
        point.style.top = `${fromTop}px`;
        point.style.left = `${fromLeft}px`;
        currentSteps++;
        if (currentSteps > totalSteps) {
            fromTop -= pointSize;
            fromLeft += pointSize;
            point.style.left = `${fromLeft}px`;
            point.style.top = `${fromTop}px`;
            turn = 'right';
            currentSteps = 0;
            totalSteps++;
        }
    }

    // Add the point to the DOM
    board.appendChild(point);

    // Increment the number to be checked
    currentNumber++;

    // Repeat the main function
    setTimeout(drawSpiral, timer);
};

// Execute the main function
drawSpiral();