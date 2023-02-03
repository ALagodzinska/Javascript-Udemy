'use strict';
// Default Parameters
/*
// parameters are set by default, so we can choose not ot define parameters

const bookings = [];

// can use any expression setting a default
// only works with parameters defined before this one
const createBooking = function (
  flightNum,
  numPassangers = 1,
  price = 199 * numPassangers
) {
  // old way of setting default parameters
  // ES5
  //   numPassangers = numPassangers || 1;
  //   price = price || 199;

  const booking = {
    // automatically create property with this name and value;
    flightNum,
    numPassangers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
// can override defaults
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

// cant skip parameter
createBooking('LH123', 1000);
// workaround - can set skipped value to undefined to get default value
createBooking('LH123', undefined, 1000);
*/
// How Passing Arguments Works: Value VS Reference
/*
// primitive type
const flight = 'LH234';
const stacy = {
  name: 'Stacy Godzinsky',
  passport: 243745859,
};

// flightNum is a copy of a flight variable
const checkIn = function (flightNum, passenger) {
  // different variable, dont reflect on outside variable
  flightNum = 'LH9999';
  // gets the reference to the memory heap
  passenger.name = 'Mrs. ' + passenger.name;
  if (passenger.passport === 243745859) {
    alert('Check in');
  } else {
    alert('Wrong Passport!');
  }
};

checkIn(flight, stacy);
console.log(flight);
console.log(stacy);

// Is same as doing....
const flightNum = flight; // new instance \ copy
const passanger = stacy; // same object; points to the same reference

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 1000000000);
};

newPassport(stacy);
checkIn(flight, stacy);

// passing by value
// passing by reference
// js works only by passing by value, reference to an object is still a value
*/
// First-Class and Higher-Order Functions
/*
// first -class - treats functions as simple value, can store as variable or property, pass function to other function as parameter, can return a function from another function, methods that we can call on functions
// higher-order - recieves another function as argument (addEventListener), returns a new function
*/
// Functions Accepting Callback Functions
/*
// functions that acceps other function as an input

const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

// lower level of obstructions
const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// higher order function, operates at higher level of obstructions
const transformer = function (str, func) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${func(str)}`);

  // can get name of the function
  console.log(`Transformed by: ${func.name}`);
};

// will call this function later
transformer('JavaScript is the best!', upperFirstWord); // transform this string using this function, NOT CALLING THIS FUNCTION HERE
transformer('JavaScript is the best!', oneWord);

// JS use callbacks all the time
const high5 = function () {
  console.log('👋🏻');
};
// callback function
document.body.addEventListener('click', high5);

// performs action foreach item in array
['Jonas', 'Martha', 'Adam'].forEach(high5);

// Callback functions pros
// makes easy to split code
// allow to create abstraction - hide detail of some code implementation, dont care about certain detail level

const action = function (day) {
  if (day !== 6 || day !== 7) {
    console.log('I will study today');
  } else {
    console.log('I will go to play tennis');
  }
};

const washDishes = function (day) {
  if (day % 2 == 0) {
    console.log('Alice do the dishes!');
  } else {
    console.log('Mark do the dishes!');
  }
};

const whatToDO = function (day, func) {
  console.log(`Today is ${day} day of the week!`);
  func(day);
};

whatToDO(2, action);
whatToDO(6, washDishes);
*/
// Functions Returning Functions
/*
//create function that return a new function
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey'); // another function
greeterHey('Jonas');
greeterHey('Steven');

greet('Hey')('Stacy');
greet('Hello')('Jonas');

// functional programming paradigm
// function returning function arrow method
const greetArrow = greeting => name => console.log(`${greeting} ${name}`);

greetArrow('Hi')('friend');
*/
// The Call and Apply Method
/*
// about this keyword and how to set it manually
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function(){} are same
  book(flightNum, name) {
    console.log(
      // this points to lufthansa object
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Stacy Godzinsky');
lufthansa.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book; // set to a variable function from an object
// becomes a regular function, in regural function this keyword points to undefined

// book(23, 'Sarah Williams'); doesnt work

// call, apply, bind

// Call Method
// first parameter is an object we want this keyword to point to
// allows to set this keywords
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');

// Apply Method
// does same as call, takes an array of arguments
// first argument is this keyword object and second array of data
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);
// same as up
book.call(swiss, ...flightData);
*/
// The Bind Method
/*
// allows to call set this keyword, does not immediately calling function, instead return new function

const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function(){} are same
  book(flightNum, name) {
    console.log(
      // this points to lufthansa object
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

const bookLH = book.bind(lufthansa);
const bookEW = book.bind(eurowings);
const bookLX = book.bind(swiss);

bookEW(23, 'Stewen Williams');
// already sets a first argument, makes a preset, now only need a name
// partial application
const bookEW23 = book.bind(eurowings, 23);
bookEW23('Stacy Godzinsky');
bookEW23('Martha Cooper');

// Using Objects with Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  // this keyword here is a button that we click
  console.log(this);
  this.planes++;
  console.log(this.planes);
};

// on click event this keyword always points to the element to which event handler was attached
// inside function this keyword will point to the button
// use bind not call, because call will immediately call a function
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application - we can preset parameters

const addTax = (rate, value) => value + value * rate;

console.log(addTax(0.1, 200));
// to preset rate
// dont care about this keyword - use null
// creates new more specific function
const addVAT = addTax.bind(null, 0.23);
// const addVAT = value => value + value * 0.23;
console.log(addVAT(100));

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};

const addVAT2 = addTaxRate(0.24);
console.log(addVAT2(100));
*/
// Immediately Invoked Function Expressions (IIFE)
/*
// pattern
// for async/await
// create function and execute it once

// simple function
const runOnce = function () {
  console.log('This will never run again!');
  // is encapsulated inside this data scope
  const isPrivate = 23;
};
runOnce();

// console.log(isPrivate); // dont have access to the scope created by function

// Immediately invoked function expression
// wrap in paranthesis()
(function () {
  console.log('This will never run again!');
})(); //call function + ()

// arrow iife
(() => console.log('This will ALSO never run again'))();

// acessible only whithin this block
{
  const isPrivate = 23;
  var notPrivate = 23; // will be acessible
}
*/
// Closures
/*
// a closure happens automatically in certain situations
const secureBooking = function () {
  let passangerCount = 0;

  return function () {
    passangerCount++;
    console.log(`${passangerCount} passengers`);
  };
};

// secure booking is gone, execution context is no longer in the stack
// closure make it possible to still update passengerCount and have acess to passengerCount
// closure make it possible to remember evewrything by the time it was created

// any function has acess to execution context in which it was created! Even after execution context is gone

const booker = secureBooking();
// closure has priority over scope chain
booker(); // 1 passanger
booker();
booker();

console.dir(booker); //display function properties [[]] - internal property that cant be acessed from our code
*/
// More Clousure Examples
/*
// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g(); // a=23 && f = function()
f();

// Reassigning f function
h();
f();
console.dir(f); // have value of b, dont have a value of a

// Example 2
const boardPassengers = function (n, wait) {
  // if remove this variable thaen will use it from global scope
  const perGroup = n / 3;

  // execute function after one second
  // was executed independently from board passengers
  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  // Will not wait 3 sec for set timeout to finish
  console.log(`Will start boarding in ${wait} seconds`);
};

// called later
// setTimeout(function () {
//   console.log('Timer');
// }, 1000);

// proof that closure has priority over global scope chain
const perGroup = 1000;

boardPassengers(180, 3);
*/
