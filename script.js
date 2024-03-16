'use strict';

const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const btnNew = document.querySelector('.btn--new');
const imgDice = document.querySelector('.dice');
const currentScorePlayer1 = document.querySelector('#current--0');
const currentScorePlayer2 = document.querySelector('#current--1');
const player1Sec = document.querySelector('.player--0');
const player2Sec = document.querySelector('.player--1');
const scorePlayer1 = document.querySelector('#score--0');
const scorePlayer2 = document.querySelector('#score--1');

// Function for restart
let scores, currentScore, activePlayer, playing;

const start = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;
  currentScorePlayer1.textContent = 0;
  currentScorePlayer2.textContent = 0;
  scorePlayer1.textContent = 0;
  scorePlayer2.textContent = 0;
  imgDice.classList.add('hidden');
  player1Sec.classList.add('player--active');
  player2Sec.classList.remove('player--active');
  player1Sec.classList.remove('player--winner');
  player2Sec.classList.remove('player--winner');
};
start();
// Function Switch player
const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  player1Sec.classList.toggle('player--active');
  player2Sec.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
};
// User rolls dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate random dice roll
    const randomDice = Math.trunc(Math.random() * 6) + 1;
    // Assign the randomDice to the images
    imgDice.classList.remove('hidden');
    imgDice.src = `dice-${randomDice}.png`;
    // Is the randomDice = 1? No: Add dice roll to current score. Yes: Switch Player
    if (randomDice !== 1) {
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore += randomDice;
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

// User holds score
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to total score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // If score >= 100, player win
    if (scores[activePlayer] >= 100) {
      // Finish game
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

// Users resets game
btnNew.addEventListener('click', start);
