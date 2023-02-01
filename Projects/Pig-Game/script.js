'use strict';

// Selecting elements
// works same
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');

const score0Element = document.querySelector('#score--0');
const score1Element = document.getElementById('score--1');
const current0Element = document.getElementById('current--0');
const current1Element = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const btnRules = document.querySelector('.btn--rules');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');

// Storing empty variables outside
let scores, currentScore, activePlayer, playing;

// Starting Conditions
const init = function () {
  // to store total scores of both players
  scores = [0, 0];
  currentScore = 0;
  // to understand who is playing by 0 or 1
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;

  current0Element.textContent = 0;
  current1Element.textContent = 0;

  // dont display dice
  diceElement.classList.add('hidden');

  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--winner');

  player0Element.classList.add('player--active');
  player1Element.classList.remove('player--active');

  document.getElementById('name--0').textContent = 'PLAYER 1';
  document.getElementById('name--1').textContent = 'PLAYER 2';
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Will add class if it is not there
  // If it is there it will remove it
  // COOL
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
};

// Rolling Dice Functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${dice}.png`;

    // 3. Check for rolled 1:
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    diceElement.classList.add('hidden');
    // 2. Check if players score is >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      document.getElementById(`name--${activePlayer}`).textContent = `PLAYER ${
        activePlayer + 1
      } WON`;
      diceElement.classList.remove('hidden');
      diceElement.src = `firework.png`;

      //btnHold.disabled = true;
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

btnRules.addEventListener('click', openModal);

document.addEventListener('keydown', function (event) {
  if (event.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);
