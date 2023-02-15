'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements, sort = false) {
  // empty container then add new elements
  containerMovements.innerHTML = '';

  // creat a copy to use sort method
  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (movement, i) {
    const type = movement > 0 ? 'deposit' : 'withdrawal';

    // easy to create html with template literal
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
          <div class="movements__value">${movement}€</div>
        </div>`;

    // accepts two strings 1 - position where to attach an element, where to place it
    // 2 - string containing html we want to insert
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

// console.log(containerMovements.innerHTML);

const calcDisplayBalance = function (acc) {
  // setting new property
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance}€`;
};

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;

  const out = account.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;

  // interest is paid on each deposit
  const interest = account.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter((interest, i, arr) => {
      // console.log(arr);
      return interest >= 1;
    })
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};

// Adding new property usernames to users
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(word => word[0])
      .join('');
  });
};
createUsernames(accounts);
// console.log(accounts);

const updateUI = function (currentAccount) {
  // Display movements
  displayMovements(currentAccount.movements);
  // Display balanmce
  calcDisplayBalance(currentAccount);
  // Display summary
  calcDisplaySummary(currentAccount);
};

// Event Handlers
let currentAccount;

// default action is to reload
// while cursor is in an input field and enter key is pressed it will automatically trigger this button
btnLogin.addEventListener('click', function (event) {
  event.preventDefault(); // prevents this form from submitting
  // console.log('Login');

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  // optional chaining property will be read only if account property exsists
  // to avoid errors
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and Welcome message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    // make ui visible
    containerApp.style.opacity = 100;

    // clear the input fields
    inputLoginUsername.value = inputLoginPin.value = '';

    // make field to loose its focus
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (event) {
  event.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  // Add negative to sender and add positive to recepient
  // Update UI
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener('click', function (event) {
  event.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    // Add movement
    currentAccount.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (event) {
  event.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    Number(inputClosePin.value) === currentAccount.pin
  ) {
    // return an index of a first element in array that matches its condition
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // mutates underlying array, no need to save array
    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
  labelWelcome.textContent = 'Log in to get started';
});

let sorted = false;
btnSort.addEventListener('click', function (event) {
  event.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

// alert(' I love you beijbi4ka! ❤️ 😻');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
/*
const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
*/
/////////////////////////////////////////////////
// Simple Array Methods (slice, splice, reverse, concat, join)
/*
// Slice
let arr = ['a', 'b', 'c', 'd', 'e'];

// with slice extract any part of the array
// start extracting starting at 'c'
// returns new array
console.log(arr.slice(2)); // c,d,e
// end parameter is not included in the output
console.log(arr.slice(2, 4)); // s,d
// starts from the end of the array
console.log(arr.slice(-2)); // d,e
console.log(arr.slice(1, -2)); //b,c
// slice to create a shallow copy of any array
// want to chain multiple methods together
console.log(arr.slice()); // get copy of same array
console.log([...arr]); // copy array, same result

// Splice
// change the original array
console.log(arr.splice(2));
console.log(arr); // in array remains all that wasnt extracted
// take part of array return it, and remove it from original array

arr = ['a', 'b', 'c', 'd', 'e'];

// use case -remove last element from array
arr.splice(-1);
console.log(arr); // everything except the last element of array

// 2- takes 2 elements
arr.splice(1, 2);
console.log(arr);

// Reverse
arr = ['a', 'b', 'c', 'd', 'e'];

// reverse mutates the original array
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse());
console.log(arr2);

// Concat
// used to concatonate two arrays
// joins two arrays together
// doesent mutate original array
const letters = arr.concat(arr2);
console.log(letters);
// same result
console.log([...arr, ...arr2]);

// Join

// returns a string with specified separator
console.log(letters.join('-'));
*/
// The New At Method
/*
const arr = [23, 11, 64];
console.log(arr[0]);
console.log(arr.at(0)); // get value at certain position

// getting last array element
console.log(arr[arr.length - 1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1)); // negative index start wrighting from the right side
// at method is good for method chaining

// at method also works on strings
console.log('stacy'.at(0));
console.log('stacy'.at(-1));
*/
// Looping Arrays: Foreach
/*
// positive -deposits, negative -withdrawal
const movements2 = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements2) {
// how to acess counter in for of loop
for (const [i, movement] of movements2.entries()) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposeted ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
    // removes a sign before number - math.abc
  }
}

console.log('----- FOREACH -----');
// each element of array passed as an argument
// foreach passes inside - index, element and current array
// order matters!!
// first - element! second - index! third - array!
// can use one parameter, can use all of them
// accepts callbackfunction
movements2.forEach(function (movement, i, array) {
  if (movement > 0) {
    console.log(`Movement ${i + 1}: You deposeted ${movement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(movement)}`);
  }
});
// 0: function(200)
// 1: function(450)
// ....
// canot break foreach loop, always loop over an entire array
// dont work break and continue
*/
// Foreach With Maps and Sets
/*
// MAp
const currencies2 = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// SEt
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
// Key is the same as value, because set doesent have keys or indexes
// _ - means variable unecessary
currenciesUnique.forEach(function (value, _, set) {
  console.log(`${value}: ${value}`);
});
*/
// The Map Method
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

const eurToUsd = 1.1;
// multiply each element with eurToUSd

// method returns a new array with updated/new elements
// use function
// const movementsUSD = movements.map(function (movement) {
//   // return a new value that we want to have at current position
//   return movement * eurToUsd;
// });

const movementsUSD = movements.map(movement => movement * eurToUsd);

console.log(movements);
console.log(movementsUSD);

// loop through array
const movementsUSDfor = [];
for (const movement of movements) movementsUSDfor.push(movement * eurToUsd);
console.log(movementsUSDfor);

// map method also has acess to value, index and whole array

const movementsDescriptions = movements.map(
  (movement, i, arr) =>
    `Movement ${i + 1}: You ${
      movement > 0 ? 'deposited' : 'withdrew'
    } ${Math.abs(movement)}`
);
console.log(movementsDescriptions);
*/
// The Filter Method
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Get acess to value, index and array
// return a boolean value
// only array elements for which condition is true will be added to new array
const deposits = movements.filter(function (movement, index, array) {
  return movement > 0;
});
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

const withdrawals = movements.filter(mov => mov < 0);
console.log(withdrawals);
*/
// The Reduce Method
/*
// All elements in array to one single value
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// result of reduce is one value!
// accumulator is like a snowball
// first value is an accumulator, valuer to keep add to or do any action
// const balance = movements.reduce(
//   function (accumulator, currentValue, index, array) {
//     // in each loop return updated accumulator
//     console.log(`Iteration number ${index}: ${accumulator}`);
//     return accumulator + currentValue;
//   },
//   // initial value of accumulator (in this case we want to start from 0)
//   0
// );

const balance = movements.reduce(
  (accumulator, currentValue) => accumulator + currentValue,
  0
);

console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);

// Maximum value of movements
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);
*/
// The Magic of Chaining Methods
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
const eurToUsd = 1.1;

// Piepline
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  // how to debug such operations
  .map((mov, i, arr) => {
    console.log(arr);
    return mov * eurToUsd;
  })
  // .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

// dont chain splice and reverse method because they mutate original array
*/
// The Find Method
/*
// can retrieve one element from an array based on condition
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// loops over array
// needs a callback function that returns a boolean
// only return the first elemnt in the array that satisfy the condition
// only returns an element itself
const firstWithdrawl = movements.find(mov => mov < 0);

console.log(movements);
console.log(firstWithdrawl); // -400

console.log(accounts); // array contains objects

// mutates an object if assign new values to properties
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account); // gets only one object

let jessicaAcc = {};
for (const acc of accounts) {
  if (acc.owner === 'Jessica Davis') {
    jessicaAcc = acc;
    break;
  }
}
console.log(jessicaAcc);
*/
// Some and Every
/*
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// Some Method
// Equality check
// if any value in array is exacly equal
console.log(movements.includes(-130)); // is in array get true
// same
console.log(movements.some(mov => mov === -130));

// Can specify a condition
// accepts condition
// if there is any value where condition is true, return true
const anyDeposits = movements.some(mov => mov > 5000); // false
console.log(anyDeposits);

// Every method

// Only returns true if all elemnts in array satisfy the condition
console.log(movements.every(mov => mov > 0)); // false
// in this array all elemnts are above 0
console.log(account4.movements.every(mov => mov > 0)); // true

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
*/
// Flat and Flatmap
/*
const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// remove the nested arrays and flatens the array
console.log(arr.flat());

const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
// flat method only goes one level deep when flattening an array
console.log(arrDeep.flat());
// fix that with depth parameter
// goes also into the second level of nesting
console.log(arrDeep.flat(2));

// get an array containing all movements from all accounts
const accountMovements = accounts.map(acc => acc.movements);
console.log(accountMovements);
// array with all movements
const allMovements = accountMovements.flat();
console.log(allMovements);
const overallBalance = allMovements.reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance);

const overallBalance2 = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance2);

// using flat and map after each other
// Flat map - combines map and flat into one method
const overallBalance3 = accounts
  .flatMap(acc => acc.movements) // map method that in the end flatens result, only goes one level deep, CANNOT CHANGE IT!
  .reduce((acc, mov) => acc + mov, 0);
console.log(overallBalance3);
*/
// Sorting Arrays
/*
// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
// get array sorted alphabetiacally
console.log(owners.sort());
// mutates an array!!!!
console.log(owners);

// Numbers
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// sort method does the sorting based on strings
// converts everytrhing to strings and then make the result
// all minuses, then 1, etc
console.log(movements);
// dont work as expected
// console.log(movements.sort());

// return < 0, A will be before B (keep order)
// return > 0, B will be before A (switch order)
// Ascending order
movements.sort((a, b) => {
  if (a > b) return 1;
  if (b > a) return -1;
});

console.log(movements);

movements.sort((a, b) => a - b);
console.log(movements);
// Descending order
movements.sort((a, b) => {
  if (a > b) return -1;
  if (b > a) return 1;
});
console.log(movements);

movements.sort((a, b) => b - a);
console.log(movements);
*/
// More Ways of Creating and Filling Arrays ( fill(), Array.from())
/*
const arr = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// creates new array with seven empty elements
// whenever we pass only one numeric parameter it creates a new array with that count of empty values
const x = new Array(7);
const y = new Array('new');
console.log(x);
console.log(y);

// nothing happens, cant call on empty array
x.map(() => 5);
console.log(x);

// Empty arrays + fill method
// on empty arrays can call fill method
// mutate an underlying array
// fill all with concrete value
//x.fill(1);

// we can specify from which index to fill an array
// and an end parameter - when to finish
// firsi is value; second - start point, third - endpoint
x.fill(1, 3, 5);
console.log(x);

// can fill defined array
arr.fill(23, 2, 6);
console.log(arr);

// Array.from
// creating an array
const t = Array.from({ length: 7 }, () => 1);
console.log(t);

// if we are not using an element use an _
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

const randomDices = Array.from({ length: 100 }, () =>
  Math.ceil(Math.random() * 6)
);
console.log(randomDices);

// get an array from ui
labelBalance.addEventListener('click', function () {
  // first argument what is gonna be converted into array,
  // second is callback function that will modify each element inthe array
  const movementsUI = Array.from(
    // array like structure
    document.querySelectorAll('.movements__value'),
    // mapping function, converted raw elemnts to numbers
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  movementsUI2 = [...document.querySelectorAll('.movements__value')]; // also rcreatse an array
});
*/
// Summary Which Array Method To Use
/*
// 1) To Mutate Original Array

// ADD TO ORIGINAL:
// - .push (adds to the end)
// - .unshift (adds to the start)

// REMOVE FROM ORIGINAL:
// - .pop (removes from the end)
// - .shift (removes from the start)
// - .splice (removes from any position)

// OTHERS:
// .reverse
// .sort
// .fill

// 2) A New Array

//  COMPUTED FROM ORIGINAL:
// - .map (loop, modify each element)

// FILTERED USING CONDITION:
// - .filter

// PORTION OF ORIGINAL:
// - .slice

// ADDING ORIGINAL TO OTHER:
// - .concat

// FLATTENING THE ORIGINAL:
// - .flat
// - .flatMap

// 3) An Arrray Index

// BASED ON VALUE:
// - .indexOf // gets concrete value

// BASED ON TEST CONDITION:
// - .findIndex // can search for an element based on a condition

// 4) An Array Element

// BASED ON TEST CONDITION:
// - .find

// 5) Know If Array Includes

// BASED ON VALUE:
// - .includes // if contains single value

// BASED ON TEST CONDITION:
// - .some // any (at least one)
// - .every // all

// 6) A new String

// BASED ON SEPARATOR STRING:
// - .join

// 7) To Transform A Value

// BASED ON ACCUMULATOR:
// - .reduce (boil down array to single value of any type: number, string, boolean, or even new array or object)

// 8) To Just Loop Array

// BASED ON CALLBACK:
// - .forEach (does not create a new array, just loops over it)
*/
// Array Methods Practice
/*
// 1)
const bankDepositSum = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 0)
  .reduce((sum, cur) => sum + cur, 0);

console.log(bankDepositSum);

// 2) Number of deposits over 1000
const numDeposits1000 = accounts
  .flatMap(acc => acc.movements)
  .filter(mov => mov > 1000).length;

// can use reduce to count something in an array
const numDeposits1000_ = accounts
  .flatMap(acc => acc.movements)
  .reduce((count, cur) => (cur > 1000 ? ++count : count), 0);
// .reduce((count, cur) => (cur > 1000 ? count + 1 : count), 0);

console.log(numDeposits1000);
console.log(numDeposits1000_);

let a = 10;
// the ++ increment the value but still return a previous value
console.log(a++);
console.log(a);

// Solutiuon prefixed ++ operator
console.log(++a);

// 3)
const { deposits, withdrawals } = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sum, cur) => {
      // cur > 0 ? (sum.deposits += cur) : (sum.withdrawals += cur);
      sum[cur > 0 ? 'deposits' : 'withdrawals'] += cur;
      return sum;
    },
    { deposits: 0, withdrawals: 0 }
  );

console.log(deposits, withdrawals);

const sumArr = accounts
  .flatMap(acc => acc.movements)
  .reduce(
    (sum, cur) => {
      // cur > 0 ? (sum.deposits += cur) : (sum.withdrawals += cur);
      sum[cur > 0 ? 0 : 1] += cur;
      return sum;
    },
    [0, 0]
  );

console.log(sumArr);

// 4)
// this is a nice title -> This Is a Nice Title

const converTitleCase = function (title) {
  const capitalize = str => str[0].toUpperCase() + str.slice(1);

  const exceptions = ['a', 'an', 'and', 'the', 'but', 'or', 'on', 'in', 'with'];

  const titleCase = title
    .toLowerCase()
    .split(' ')
    .map(word => (exceptions.includes(word) ? word : capitalize(word)))
    .join(' ');
  return capitalize(titleCase);
};
console.log(converTitleCase('this is a nice title'));
console.log(converTitleCase('this is a LONG title but not so long'));
console.log(converTitleCase('and here is another title with an EXAMPLE'));
*/
