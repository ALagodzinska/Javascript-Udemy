'use strict';

// Challenge #1
/*
const displayResults = function (type) {
  if (typeof type === 'string') {
    console.log(`Poll results are ${type}`);
  } else {
    console.log(type);
  }
};

const poll = {
  question: 'What is your favourite programming language?',
  options: ['0: JavaScript', '1: Python', '2: Rust', '3: C++'],
  // This generates [0, 0, 0, 0]. More in the next section!
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    const selectedOption = Number(
      prompt(
        `${this.question}\n${this.options.join('\n')}\n(Write option number)`
      )
    );

    selectedOption &&
      selectedOption >= 0 &&
      selectedOption < this.answers.length &&
      this.answers[selectedOption]++;

    this.displayResults();
    this.displayResults('string');
  },

  // default set to array
  displayResults(type = 'array') {
    if (type === 'string') {
      console.log(`Poll results are ${this.answers.join(', ')}`);
    } else if (type === 'array') {
      console.log(this.answers);
    }
  },
};

document
  .querySelector('.poll')
  .addEventListener('click', poll.registerNewAnswer.bind(poll));

const data1Arr = [5, 2, 3];
const data2Arr = [1, 5, 3, 9, 6, 1];

// firs is an object to call a method on
// set this keyword on answers property
poll.displayResults.call({ answers: [5, 2, 3] });
poll.displayResults.call({ answers: [5, 2, 3] }, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, 'string');
// need an object with answers property
*/
// Challenge #2
/*
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red';

  document.querySelector('body').addEventListener('click', function () {
    header.style.color = 'blue';
  });
})();
*/
