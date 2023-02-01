'use strict';
/*
// select and get html element
console.log(document.querySelector('.message'));
// getting a text from an element
console.log(document.querySelector('.message').textContent);
// What is DOM

DOM - Document Object Model; connection between html document and js
Is a structured representation of html documents. Allows JavaScript to access html elements and styles to manipulate them.
DOM is a web api

document.querySelector('.message').textContent = '🎊 Correct Number!';
// console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/
const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

const displayScore = function (score) {
  document.querySelector('.score').textContent = score;
};

const getRandomNumber = function () {
  return Math.trunc(Math.random() * 20) + 1;
};

const setCursorToInputField = function () {
  document.getElementById('number-input').focus();
  document.getElementById('number-input').select();
};

let secretNumber = getRandomNumber();
let score = 20;
let highScore = 0;

var input = document.getElementById('number-input');
input.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    document.getElementById('myBtn').click();
  }
});

document.querySelector('.again').addEventListener('click', function () {
  secretNumber = getRandomNumber();
  score = 20;

  displayMessage('Start guessing...');
  document.querySelector('.number').textContent = '?';
  displayScore(score);
  document.querySelector('.guess').value = '';

  document.querySelector('body').style.backgroundColor = '#dcb5ff';
  document.querySelector('.number').style.width = '15rem';

  document.querySelector('.guess').disabled = false;
  document.querySelector('.check').disabled = false;
  document.querySelector('.check').style.backgroundColor = '#f2f3ee';

  setCursorToInputField();
});

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  if (guess === secretNumber) {
    displayMessage('🎊 Correct Number!');

    document.querySelector('.number').textContent = secretNumber;

    document.querySelector('body').style.backgroundColor = '#e5edc4';
    // mwhen you specify a style it needs to be a string
    document.querySelector('.number').style.width = '30rem';

    document.querySelector('.guess').disabled = true;
    document.querySelector('.check').disabled = true;
    document.querySelector('.check').style.backgroundColor = '#ccc';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
    // when guess is wrong
  } else {
    setCursorToInputField();
    // when there is no input
    if (!guess) {
      displayMessage('🙀 No Number!');

      // when player wins
    } else if (guess !== secretNumber) {
      if (score > 1) {
        displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');
        score--;
        displayScore(score);
      } else {
        displayMessage('😿 You lost the game!');
        displayScore(0);
      }
    }
  }
});
