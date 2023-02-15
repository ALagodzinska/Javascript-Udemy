'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data

// DIFFERENT DATA! Contains movement dates, currency and locale

const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 455.23, -306.5, 25000, -642.21, -133.9, 79.97, 1300],
  interestRate: 1.2, // %
  pin: 1111,

  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-12-23T07:42:02.383Z',
    '2020-01-28T09:15:04.904Z',
    '2020-04-01T10:17:24.185Z',
    '2020-05-08T14:11:59.604Z',
    '2023-02-09T17:01:17.194Z',
    '2023-02-11T23:36:17.929Z',
    '2023-02-12T10:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT', // de-DE
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,

  movementsDates: [
    '2019-11-01T13:15:33.035Z',
    '2019-11-30T09:48:16.867Z',
    '2019-12-25T06:04:23.907Z',
    '2020-01-25T14:18:46.235Z',
    '2020-02-05T16:33:06.386Z',
    '2020-04-10T14:43:26.374Z',
    '2023-02-10T18:49:59.371Z',
    '2023-02-12T12:01:20.894Z',
  ],
  currency: 'USD',
  locale: 'en-US',
};

const accounts = [account1, account2];

/////////////////////////////////////////////////
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

/////////////////////////////////////////////////
// Functions

const formatMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));

  const daysPassed = calcDaysPassed(new Date(), date);
  console.log(daysPassed);

  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed} days ago`;
  else {
    return new Intl.DateTimeFormat(locale).format(date);
    // const day = `${date.getDate()}`.padStart(2, 0);
    // const month = `${date.getMonth() + 1}`.padStart(2, 0);
    // const year = date.getFullYear();

    // return `${day}/${month}/${year}`;
  }
};

const formatCur = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};

const displayMovements = function (account, sort = false) {
  containerMovements.innerHTML = '';

  const movs = sort
    ? account.movements.slice().sort((a, b) => a - b)
    : account.movements;

  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';

    const date = new Date(account.movementsDates[i]);
    const displayDate = formatMovementDate(date, account.locale);

    const formattedMovement = formatCur(mov, account.locale, account.currency);

    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__date">${displayDate}</div>
        <div class="movements__value">${formattedMovement}</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

const calcDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = formatCur(acc.balance, acc.locale, acc.currency);
};

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = formatCur(incomes, acc.locale, acc.currency);

  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = formatCur(Math.abs(out), acc.locale, acc.currency);

  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = formatCur(interest, acc.locale, acc.currency);
};

const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

const updateUI = function (acc) {
  // Display movements
  displayMovements(acc);

  // Display balance
  calcDisplayBalance(acc);

  // Display summary
  calcDisplaySummary(acc);
};

const startLogOutTimer = function () {
  const tick = function () {
    // convert to min and sec
    const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const seconds = String(time % 60).padStart(2, 0);
    // In each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${seconds}`;

    // When 0 seconds, stop timer and log out
    if (time === 0) {
      clearInterval(timer);

      labelWelcome.textContent = `Log in to get started`;
      containerApp.style.opacity = 0;
    }

    // Decrease 1s
    time--;
  };

  //Setting time to 5 minutes
  let time = 600;
  // Call the timer every second
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};

///////////////////////////////////////
// Event handlers
let currentAccount, timer;

// Fake Always logged in
// currentAccount = account1;
// updateUI(currentAccount);
// containerApp.style.opacity = 100;
///

btnLogin.addEventListener('click', function (e) {
  // Prevent form from submitting
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    const now = new Date();
    const options = {
      hour: 'numeric',
      minute: 'numeric',
      day: 'numeric',
      month: 'numeric', // if numeric - get the number, if long get name of month
      year: 'numeric', // can say 2-digit
    };
    labelDate.textContent = new Intl.DateTimeFormat(
      currentAccount.locale,
      options
    ).format(now);

    // padStart - if it is one number add 0 in front, because length should be always 2
    // const day = `${now.getDate()}`.padStart(2, 0);
    // const month = `${now.getMonth() + 1}`.padStart(2, 0);
    // const year = now.getFullYear();
    // const hour = `${now.getHours()}`.padStart(2, 0);
    // const min = `${now.getMinutes()}`.padStart(2, 0);
    // labelDate.textContent = `${day}/${month}/${year}, ${hour}:${min}`;
    // day/month/year

    // Clear input fields
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    // Timer
    if (timer) clearInterval(timer);
    timer = startLogOutTimer();

    // Update UI
    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = +inputTransferAmount.value;
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Add transfer date
    currentAccount.movementsDates.push(new Date().toISOString());
    receiverAcc.movementsDates.push(new Date().toISOString());

    // Update UI
    updateUI(currentAccount);

    // Reset timer
    clearInterval(timer);
    timer = startLogOutTimer();
  }
});

btnLoan.addEventListener('click', function (e) {
  e.preventDefault();

  const amount = Math.floor(inputLoanAmount.value);

  if (amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)) {
    setTimeout(function () {
      // Add movement
      currentAccount.movements.push(amount);

      // Add transfer date
      currentAccount.movementsDates.push(new Date().toISOString());

      // Update UI
      updateUI(currentAccount);

      // Reset timer
      clearInterval(timer);
      timer = startLogOutTimer();
    }, 2500);
  }
  inputLoanAmount.value = '';
});

btnClose.addEventListener('click', function (e) {
  e.preventDefault();

  if (
    inputCloseUsername.value === currentAccount.username &&
    +inputClosePin.value === currentAccount.pin
  ) {
    const index = accounts.findIndex(
      acc => acc.username === currentAccount.username
    );
    console.log(index);
    // .indexOf(23)

    // Delete account
    accounts.splice(index, 1);

    // Hide UI
    containerApp.style.opacity = 0;
  }

  inputCloseUsername.value = inputClosePin.value = '';
});

let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// Converting and Checking Numbers
/*
console.log(23 === 23.0);

// numbers are always stored in binary form
// Base 10 - 0 to 9  1/10 = 0.1    3/10 = 3.33333
// Binary base 2 - 0 and 1 // get an infinite fraction from 0.1
// Works this way, cant do very recise calculations
console.log(0.1 + 0.2);
console.log(0.1 + 0.2 === 0.3); // results as false

// convert string to a number
console.log(Number('23'));
console.log(+'23'); // automatically convert all the values to numbers

// Parsing
// can contain letter, js try to find out what it will be
// gets rid of unecessary data
// works only if it starts with nuber
// else will get NaN
console.log(Number.parseInt('30px', 10));
console.log(Number.parseInt('e23', 10));
// second param is - base of numeral system we are using
// working with binary will add 2

// reads decimal number
console.log(Number.parseFloat('2.5rem')); // 2.5
console.log(Number.parseInt('2.5rem')); // 2

// Check if value is not a number
// check if any value is a number
console.log(Number.isNaN(20)); // false
console.log(Number.isNaN('20')); // false
console.log(Number.isNaN(+'20X')); // true
console.log(Number.isNaN(20 / 0)); // false ; gives infinity

// Best way to check for a number
// Better to check if is a number or not
console.log(Number.isFinite(20)); // true
console.log(Number.isFinite('20')); // false
console.log(Number.isFinite(+'20X')); // false
console.log(Number.isFinite(23 / 0)); // false

// Check if is an integer
console.log(Number.isInteger(23));
console.log(Number.isInteger(23.0));
console.log(Number.isInteger(23 / 0));
*/
// Math and Rounding
/*
// square root
console.log(Math.sqrt(25));
console.log(25 ** (1 / 2)); // - same
// cubic root
console.log(8 ** (1 / 3));

// Get maximum value
// does type cohertion
console.log(Math.max(5, 18, 23, 11, 2));
console.log(Math.max(5, 18, '23', 11, 2));
console.log(Math.max(5, 18, '23px', 11, 2)); // result in NaN

// Get minimum value
console.log(Math.min(3, 5, 4, 11, 2, -1));

// area of the circle with its radius
console.log(Math.PI * Number.parseFloat('10px') ** 2);

console.log(Math.random()); // number between 0 and 9
console.log(Math.trunc(Math.random() * 6) + 1);

const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min) + 1) + min; // function that will give a value between min and max
// 0... -> 0...(max - min) -> min...(max - min)
console.log(randomInt(10, 20));

// Rounding integers
console.log(Math.trunc(23.6)); // 23 // simply remove any decimal part

// do type cohertion
// always round to the nearest integer
console.log(Math.round(23.9)); // 24
console.log(Math.round(23.4)); // 23
console.log(Math.round(23.5)); // 24

// round up
console.log(Math.ceil(23.3)); // 24
console.log(Math.ceil(23.7)); // 24

// round down
console.log(Math.floor(23.3)); // 23
console.log(Math.floor('23.7')); // 23

// Difference Trunc and Floor
console.log(Math.trunc(-23.6)); // - 23
// just removes the decimal part
console.log(Math.floor(-23.6)); // - 24 rounds down to -24

// Rounding floating point/ decimals

// toFixed returns a string!
console.log((2.7).toFixed(0)); // 3
console.log((2.7).toFixed(3)); // 2.700
console.log((2.345).toFixed(2)); // 2.35
console.log(+(2.345).toFixed(2)); // converting to a number
*/
// The Remainder Operator
/*
// remainder operator is - %
console.log(5 % 2); // gives a remaining value
// 5/ 2 = 2.5  2+2 = 4 the value left is 5-4 = 1
console.log(5 / 2);
console.log(10 % 7); // 3

console.log(8 % 4); // 0, divides without dec part and is completely divisible

// used to check if number is even or odd
console.log(16 % 2); // if reminder is 0 then its even

const isEven = n => n % 2 === 0;
console.log(isEven(8));
console.log(isEven(23));
console.log(isEven(534));

labelBalance.addEventListener('click', function () {
  console.log(document.querySelectorAll('.movements_row')); // node list
  [...document.querySelectorAll('.movements__row')].forEach(function (row, i) {
    console.log(i);
    // look from top to bottom
    if (i % 2 === 0) row.style.backgroundColor = 'orangered';
    // 0 2 4 6
    if (i % 3 === 0) row.style.backgroundColor = 'blue';
    // 0 3 6 9
  });
});
*/
// Numeric Separators
/*
// 287,460,000,000
const diameter = 287_460_000_000;
// separator is an _ can place it anywhere to make it easy understand with huge numbers
console.log(diameter); // javascript just ignores numeric separators

// makes it obvious
const priceInCents = 345_99;
console.log(priceInCents); // 34599

// same value different meaning
const transferFee = 15_00;
const transferFee2 = 1_500;

// can place it only between two numbers
// cant place two in a row
// const PI = 3._14_15;
// console.log(PI);

console.log(Number('230000'));
console.log(Number('230_000')); // NaN
console.log(parseInt('230_000')); // 230
// Only use numeric separators with numbers!!!
*/
// Working With BIgint
/*
// The biggest number that javascript can saifly represent
console.log(2 ** 53 - 1);
console.log(Number.MAX_SAFE_INTEGER);

// anything that is larger is notr safe
// might loose precision
console.log(2 ** 53 + 1);
console.log(2 ** 53 + 2); // not correct
console.log(2 ** 53 + 4); // same

// n - transforms regular number into a big number!
console.log(368264719830928407398473048342840374n);
console.log(BigInt(3682647198309));

// Operations
console.log(10000n + 10000n); // operators works same
console.log(172324791864578937481203949435n * 1000000n);

const huge = 74973497209740237309n;
const num = 23;
// cant do operation with simple number, need to convert into big int
console.log(huge * BigInt(num));
// error >
// console.log(huge * num);

// but can do
// Exception
console.log(20n > 15);
console.log(20n === 20); // false because they have different type
console.log(typeof 20n);
console.log(20n == 20); // with loose works, type choertion is done

// converted to a string
console.log(huge + 'is REALLY big!!');

// doesnt work >
// console.log(Math.sqrt(16n));

// cut of the decimal part
console.log(11n / 3n); // returns the closest big int
console.log(10 / 3);
*/
// Creating Dates
/*
// Create a date

// 1)
const now = new Date(); // current date and time
console.log(now);

// 2)
// Z - means UTC
console.log(new Date('Aug 02 2020 18:05:41'));
console.log(new Date('December 24, 2015'));
console.log(new Date(account1.movementsDates[0]));

// 3)
// month in javascript is zero based
console.log(new Date(2037, 10, 19, 15, 23, 5));
console.log(new Date(2037, 10, 31)); // November 31st will corect to december 1st
console.log(new Date(2037, 10, 33)); // December 3rd

// 4)
// amount of milliseconds since 1january 1970 (unix time)
console.log(new Date(0)); // shows 1969 due to timezone differences
// converting to milliseconds
console.log(new Date(3 * 24 * 60 * 60 * 1000)); // 3 days later
// 3 * 24 * 60 * 60 * 1000 - is a timestamp

// Working with dates
const future = new Date(2037, 10, 19, 15, 23);
console.log(future);
console.log(future.getFullYear()); // gets year
// Month is 0 based!!
console.log(future.getMonth());
console.log(future.getDate()); // gets day number
console.log(future.getDay()); // gets day of the week
console.log(future.getHours());
console.log(future.getMinutes());
console.log(future.getSeconds());
// can get a formatted string
console.log(future.toISOString()); // international standard
// when you want to convert date into a string

// get timestamp >
console.log(future.getTime());
console.log(new Date(2142285780000));

// gives current timestamp
console.log(Date.now());

// can change date and correct year, month etc
future.setFullYear(2040);
console.log(future);
*/
// Operations with dates
/*
const future = new Date(2037, 10, 19, 15, 23);
console.log(+future); // getting timestamp

const calcDaysPassed = (date1, date2) =>
  Math.abs(date2 - date1) / (1000 * 60 * 60 * 24);
// 100 miliseconds in one second, 60 seconds in 1 minute, 60 minutes in one hour and 24 hours a day

const days1 = calcDaysPassed(new Date(2037, 3, 14), new Date(2037, 3, 4));
console.log(days1);
*/
// Internationalizing Dates (INTL)
/*
// Experimenting with api
const now = new Date();
const options = {
  hour: 'numeric',
  minute: 'numeric',
  day: 'numeric',
  month: 'long', // if numeric - get the number, if long get name of month
  year: 'numeric', // can say 2-digit
  weekday: 'long', // name of the weekday
};

const locale = navigator.language;
console.log(locale);

// labelDate.textContent = new Intl.DateTimeFormat('en-US').format(now);
labelDate.textContent = new Intl.DateTimeFormat(locale, options).format(now);
// to get more language codes google - ISO language code table (lingoes.net)
*/
// Internationalizing Numbers (INTL)
/*
const num = 388764.23;

const options = {
  // can set unit
  // style: 'unit',
  // style: 'percent',
  style: 'currency',
  currency: 'EUR', // have to define manually
  // unit: 'mile-per-hour',
  // unit: 'celsius',
  // useGrouping: false, // removes separators - ","
};

console.log('US', new Intl.NumberFormat('en-US', options).format(num));
console.log('Germany', new Intl.NumberFormat('de-DE', options).format(num));
console.log('Syria', new Intl.NumberFormat('ar-SY', options).format(num));
console.log(
  'Browser',
  navigator.language,
  new Intl.NumberFormat(navigator.language, options).format(num)
);
*/
// Timers: Settimeout and Setinterval
/*
// SetTimeout
// code execution continues, just register code to be called
// async javascript
setTimeout(() => console.log('Here is your pizza 🍕'), 3000);

console.log('Waiting');

// all arguments that are passed after a delay are arguments for function
setTimeout(
  (ing1, ing2) =>
    console.log(`Here is your pizza with ${ing1}  and ${ing2} 🍕`),
  5000,
  'olives',
  'spinach'
);

// before time has passed we can cancel a function call
const ingridients = ['olives', 'spinach'];

const pizzaTimer = setTimeout(
  (ing1, ing2) =>
    console.log(`Here is your pizza with ${ing1}  and ${ing2} 🍕`),
  5000,
  ...ingridients
);

if (ingridients.includes('spinach')) clearTimeout(pizzaTimer);

// SetInterval

// called every second
setInterval(function () {
  const now = new Date();
  console.log(
    [
      `${now.getHours()}`.padStart(2, 0),
      `${now.getMinutes()}`.padStart(2, 0),
      `${now.getSeconds()}`.padStart(2, 0),
    ].join(':')
  );
}, 1000);
*/
