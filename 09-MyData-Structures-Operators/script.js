'use strict';

const weekdays = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];

// Enchanced Object Literals
const openingHours = {
  [weekdays[3]]: {
    open: 12,
    close: 22,
  },
  [weekdays[4]]: {
    open: 11,
    close: 23,
  },
  // [`day-${2 + 4}`]: {
  //   open: 0, // Open 24 hours
  //   close: 24,
  // },
  [weekdays[5]]: {
    open: 0, // Open 24 hours
    close: 24,
  },
};

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  // ES6 enhanced object literals
  openingHours,
  // openingHours: {
  //   thu: {
  //     open: 12,
  //     close: 22,
  //   },
  //   fri: {
  //     open: 11,
  //     close: 23,
  //   },
  //   sat: {
  //     open: 0, // Open 24 hours
  //     close: 24,
  //   },
  // },

  // works same, with different syntax
  order(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  // same as name for object properties
  // immediately destructure an object
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}!`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here is your delecious pasta with ${ing1}, ${ing2} and ${ing3}!`
    );
  },

  orderPizza: function (mainIngridient, ...otherIngridients) {
    console.log(mainIngridient);
    console.log(otherIngridients);
  },
};

// Destructuring Arrays
/*
// destructure - break in smaller structure
const arr = [2, 3, 4];
const a = arr[0];
const b = arr[1];
const c = arr[2];

// destructuring assignment
// destructured array
const [x, y, z] = arr;
console.log(x, y, z);
// original array is not affected
console.log(arr);

// we can extract not all of them just few
const [first, second] = restaurant.categories;
// if we want to get first and third element, just skip one in the middle
const [one, , three] = restaurant.categories;
console.log(first, second);
console.log(one, three);

let [main, , secondary] = restaurant.categories;

// Switching variables
const temp = main;
main = secondary;
secondary = temp;
console.log(main, secondary);

// reassigning values of array
[main, secondary] = [secondary, main];
console.log(main, secondary);

// Recieve 2 return values from a function
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

// With nested array
// Nested Destructuring
const nested = [2, 4, [5, 6]];
const [i, , j] = nested;
console.log(i, j);

const [w, , [l, k]] = nested;
console.log(w, l, k); // all as separete variables

// Default values
// if we set default value then instead of undefined we will get default value
const [p = 1, q = 1, r = 1] = [8, 9];
console.log(p, q, r);
// third will be undefined
*/
// Destructuring Objects
/*
// to destructure objects we use {}
// we need to write exact object names, order does not matter
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

// create variables with specified names
const {
  name: restaurantsName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantsName, hours, tags);

// Setting default values
const { menu = [], starterMenu: starters = [] } = restaurant;
// menu = default value; otherwise will get undefined
console.log(menu, starters);

// Mutating a variables
let a = 111;
let b = 99;
const obj = { a: 23, b: 7, c: 14 };
// override two initial variables
// cant start line with {} because it expects a code block after and we cant use then = sign.
// wrap in () !
({ a, b } = obj);

console.log(a, b);

// Nested objects
// can deconstruct that way and rename
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

// object that we pass in a orderDelivery method
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via De Sole 21',
  mainIndex: 2,
  starterIndex: 2,
});

// else will be taken from default values
restaurant.orderDelivery({
  address: 'Via De Sole 21',
  starterIndex: 1,
});
*/
// The Spread Operator (...)
/*
// unpacking all array elements at one
const arr = [7, 8, 9];
const badNewArr = [1, 2, arr[0], arr[1], arr[2]];
console.log(badNewArr);

// ... - take all values from arr array and take them individually
// take all elemnts out of the array and write them in manually
const newArr = [1, 2, ...arr];
console.log(newArr);

// logs individual elemnts of the array, not as array members
console.log(...newArr);
console.log(1, 2, 7, 8, 9);

// building new array
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

// spread operator take all elements from the array and it doesent create new variables

// Copy array
const mainMenuCopy = [...restaurant.mainMenu];

// Join two or more arrays
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(menu);

// Can use spread operator on all Iterables
// Iterables - all arrays, strrings, maps and sets, but not abjects
// Can use spread operator on object as well
// Use spread operator when building an array or when you pass it in the function
const str = 'Jonas';
const letters = [...str, ' ', 's.'];
console.log(letters);
// spread operator in method
console.log(...str);
// console.log(`${...str} Schemdtamann`); // cant use it here
// expects one value and not multiple separated by comma

// to use ' with '' use \'
// Real-World Example
const ingridients = [
  prompt("Let's make pasta! Ingredient 1?"),
  prompt('Ingridient 2?'),
  prompt('Ingridient 3?'),
];
console.log(ingridients);

restaurant.orderPasta(ingridients[0], ingridients[1], ingridients[2]);
restaurant.orderPasta(...ingridients);

// Objects
// copy all properties of the restaurant into the new object
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Guiseppe' };
console.log(newRestaurant);

const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurantCopy.name);
console.log(restaurant.name);
*/
// Rest Pattern and Parameters
/*
// opposite of spread operator, rest use same syntax
// rest used to pack elements into an array

// 1) Destructuring

// SPREAD - because on the right side of the assignment operator
const arr = [1, 2, ...[3, 4]];

const [] = [1, 2, 3, 4, 5];

// REST - because on LEFT side of the = sign
const [a, b, ...others] = [1, 2, 3, 4, 5];
// take rest of the elemnts and put them into a new array
console.log(a, b, others);

// otherfood does not include any skipped elements
// rest always should be the last
const [pizza, , rissoto, ...otherFood] = [
  ...restaurant.mainMenu,
  ...restaurant.starterMenu,
];
console.log(pizza, rissoto, otherFood);

// Objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(weekdays);

// 2) Functions
// rest parameters (arrays)
// pack multiple values in one array
// function can accept any number of parameters
// can accept both array and single values
const add = function (...numbers) {
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
  console.log(numbers);
};
add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const x = [23, 5, 7];
// if we want to use an array, use spread operator
// othervise it will be accepted as one string ("23,5,7")
add(...x);

// first stored in main argument
// others are simply stored in an array
restaurant.orderPizza('mushroom', 'onions', 'olives', 'spinach');
// main ingridient and empty array
restaurant.orderPizza('mushroom');

//Spread operator - when values! are separeted by comma
// Rest pattern - variable! names separeted by commas
*/
// Short Circuiting (&& and ||)
/*
console.log('-----OR-----');
// RETURN FIRST TRUTHY VALUE OR THE LAST VALUE IF ALL OF THEM ARE FALSY
// OR OPERATOR USED TO SET DEFAULT VALUES
// Use any data type, return any data type, do short-circuiting
// If the first value is a truthy value it will immediately return first value
// return 3
console.log(3 || 'Jonas');
// if first is falsy value, return second
console.log(0 || 'Jonas');
console.log(true || 0); // return true
// even if both are falsy value, then returns the second one
console.log(undefined || null);
// return the first truthy value or if all are falsy, return the last one
console.log(undefined || 0 || '' || 'Hello' || 23 || null);
console.log(undefined || 0 || '' || null);

// both solutions wont work if number of guests is 0;
// gives a default value
// restaurant.numGuests = 0;
restaurant.numGuests = 23;
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1);

// check if value exsists and to set default value
const guests2 = restaurant.numGuests || 10;
console.log(guests2);

console.log('-----AND-----');
// RETURN FIRST FALSY VALUE OR LAST IF ALL OF THEM ARE TRUTHY
// USED TO EXECUTE CODE IN SECOND OPERAND IF THE FIRST ONE IS TRUE
// returns falsy value
// works opposite of or operator
console.log(0 && 'Jonas');
// when is thruthy return the last value
console.log(7 && 'Jonas');

console.log('Hello' && 23 && null && 'Jonas'); // null
console.log('Hello' && 23 && true && 77); // returns the last 77

// practical example
// use when we dont know if property exsists
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}

restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');
*/
// The Nullish Coalescing Opertaor (??)
/*
restaurant.numGuests = 0;

const guests = restaurant.numGuests || 10;
console.log(guests);

// works with nullish values - null, undefined instead of falsy values
// restaurant.numGuests = null;
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect);
*/
// Logical Assignemnt Operators
/*
const rest1 = {
  name: 'Capri',
  numGuests: 20,
  // numGuests: 0,
};

const rest2 = {
  name: 'La Piazza',
  owner: 'Giovanni Rossi',
};

// if rest1.numGuests exsoists it will be returned
rest1.numberGuests = rest1.numGuests || 10;
rest2.numberGuests = rest2.numGuests || 10;

// OR Asiignment operator
// dont work with 0
rest1.numGuests ||= 10; // short form
rest2.numGuests ||= 10;

// Nullish assignment operator
rest1.numGuests ??= 10; // short form
rest2.numGuests ??= 10;

// if the name of owner exsists change it
rest1.owner = rest1.owner && '<Anonymous>'; // set to undefined because owner does not exsists
rest2.owner = rest2.owner && '<Anonymous>';
// short form
rest1.owner &&= '<Anonymous>';
rest2.owner &&= '<Anonymous>';

console.log(rest1);
console.log(rest2); // 10 guests
*/
// Looping Arrays: The FOR-OF Loop
/*
const menu = [...restaurant.starterMenu, ...restaurant.mainMenu];
// same as foreach loop
for (const item of menu) console.log(item);
// can use continue and break keywords

// if want to get indexes
for (const item of menu.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`);
}
// destructure item array
for (const [i, element] of menu.entries()) {
  console.log(`${i + 1}: ${element}`);
}
// areray which in each position contai ns new array, that stores position and value
console.log([...menu.entries()]);
*/
// Enhanced Object Literals
/*
//Easier to write object literals

// bind names, check opening hours property
// syntax for order function in rtestaurant object
*/
// Optional Chaining (.?)
/*
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

if (restaurant.openingHours.fri) console.log(restaurant.openingHours.fri.open);

// console.log(restaurant.openingHours.mon.open);

// With optional chaining
// only if property before question mark exists, only then the open property will be read
// happens only if mon exists
// helps to prevent bugs
console.log(restaurant.openingHours.mon?.open); // undefined
console.log(restaurant.openingHours?.mon?.open);

// Example

const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
for (const day of days) {
  console.log(day);
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

// check if method exists before calling it
// Methods
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist!');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist!');

// check if array is empty, if element at position exists
// Arrays
const users = [{ name: 'Jonas', email: 'hello@jonas.com' }];

console.log(users[0]?.name ?? 'User array empty!');

if (users.length > 0) console.log(users[0]?.name);
else console.log('User array empty!');
*/
// Looping Objects: Object Keys. Values. And Entries
/*
// Property Names
const properties = Object.keys(openingHours);
// array with keys
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;

// looping through object keys
for (const day of Object.keys(openingHours)) {
  // get key names of an object
  openStr += `${day}, `;
}
console.log(openStr);

// Property Values
const values = Object.values(openingHours);
console.log(values);

// entries names + values together
// entries return index number and element itself
const entries = Object.entries(openingHours);
console.log(entries);

// simple destructure for this case [key, value]
// destructure
for (const [key, { open, close }] of entries) {
  console.log(`On ${key} we open at ${open} and close at ${close}`);
}
*/
// Sets
/*
// collection of unique values
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
console.log(ordersSet); // set of 3
// no key value pairs
// removes all duplicates
// order for elements is irrelevant
console.log(new Set('Jonas')); // get each letter separate
console.log(new Set()); // empty set
console.log(ordersSet.size); // items in set
console.log(ordersSet.has('Pizza')); // true // similar to include method in array
console.log(ordersSet.has('Bread')); // false
// add items to set
ordersSet.add('Garlic Bread');
ordersSet.add('Garlic Bread');
console.log(ordersSet); // garlic bread added once
// delete items from set
ordersSet.delete('Risotto');
console.log(ordersSet); // no risotto
// in sets are no indexes
// no way to get value out of the set
// can check if item is in a set or not
// if you need to get value out of use an array
// ordersSet.clear(); // clears whole set
console.log(ordersSet);
// can loop through the set
for (const order of ordersSet) console.log(order);

// Example
const staff = ['Waiter', 'Chef', 'Manager', 'Chef', 'Waiter'];
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
console.log(new Set(staff).size); // to know hoq many unique positions
// convertion from a set to an array
// use spread operator to get all values from set and [] to put it into array

// counting how many different letter are in a string
console.log(new Set('anastasija').size);
*/
// Maps: Fundamentals
/*
// data structures to map data values to keys
// in maps keys can have any type
const rest = new Map(); // easiest way is to create an empty map and fill it
rest.set('name', 'Classico Italiano'); // adding new element to the data structure
rest.set(1, 'Firenze, Italy');
console.log(rest.set(2, 'Lisbon, Portugal')); // not only adds element, but also returns an updated map

rest
  .set('categories', ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'])
  .set('open', 11)
  .set('close', 23)
  .set(true, 'We are Open ^D')
  .set(false, 'We are Closed ^(');
// chain of setting values

console.log(rest.get('name')); // to get value pass name of the key
console.log(rest.get(true));
// data type matter
console.log(rest.get('1')); // undefined

const time = 21;
console.log(rest.get(time > rest.get('open') && time < rest.get('close')));

console.log(rest.has('categories')); // if map has certain keys

rest.delete(2); // delete from map by key value
console.log(rest);
console.log(rest.size); // num of properties
// rest.clear(); // remove all elements from a map

// Maps with array
const arr = [1, 2];
rest.set([1, 2], 'Test'); // array as a key
rest.set(arr, 'Test2');

console.log(rest);

console.log(rest.get([1, 2])); // undefined
// because they are not the same object in the heap
// to make it work use declared variable
// to make them refer to the same place in memory
console.log(rest.get(arr)); // gets Test2

// Maps with Objects
rest.set(document.querySelector('h1'), 'Heading');
console.log(rest);
*/
// Maps: Iteration
/*
// populate map with array
// creating new map from scratch
const question = new Map([
  ['question', 'What is the best programming language in the world?'],
  [1, 'C'],
  [2, 'Java'],
  [3, 'Javascript'],
  ['correct', 3],
  [true, 'Correct🎊'],
  [false, 'Try Again!'],
]);
console.log(question);

// looks same as population of map
console.log(Object.entries(openingHours));

// Easy way to convert objects to maps
const hoursMap = new Map(Object.entries(openingHours));
console.log(hoursMap);

// Iteration
// Quiz app
console.log(question.get('question'));
// destructure key and value
for (const [key, value] of question) {
  if (typeof key === 'number') console.log(`Answer ${key}: ${value}`);
}
const answer = Number(prompt('Your answer?'));
console.log(answer);
console.log(question.get(answer === question.get('correct')));

// conver map to array
// get array of array
console.log([...question]);
console.log(question.entries());
console.log([...question.keys()]); // to get of the mapIterator
console.log(question.values());
*/
// What Data Structure to choose
/*
//Simple list - Array or sets
// Key/Value pairs - Objects or Maps
// Arrays VS Sets
// array to store values in order, when need to manipulate data and if it may contain duplicates
// sets to store unique values, when high performance important - 10x faster, remove duplicates from arrays. Compliments arrays
// Objects VS Maps
// objects traditional structure, easier to write and acess values/ This keyword. Easy working with JSON
// maps offers better performance, keys have any data type, easy to iterate, easy to compute size. Use when keys are not strings
*/
// Working with Strings Part 1 (indexOf, slice)
/*
const airline = 'TAP Air Portugal';
const plane = 'A320';

//can get character of a string at certain position
console.log(plane[0]); //A
console.log(plane[1]); //'3'
console.log(plane[2]); // '2'
console.log('B737'[0]);

// get length of a string
console.log(airline.length);
console.log('B737'.length);

// case sensetive!
console.log(airline.indexOf('r')); // position at which certain letter is in the string | give first occurence
console.log(airline.lastIndexOf('r')); // position of last occurence
console.log(airline.indexOf('Portugal')); // get whole word position

console.log(airline.slice(4)); // 4- position at which extraction will start | starts from zero / return a new string
console.log(airline.slice(4, 7)); // 4 - start, 7 - end parameter. length of the extracted string is always end - beginning \ this case length = 3
console.log(airline.slice(0, airline.indexOf(' ')));
console.log(airline.slice(airline.lastIndexOf(' ') + 1));

console.log(airline.slice(-2)); // extracts from the end
// starts counting from the RIGHT side!
console.log(airline.slice(1, -1)); // AP Air Portuga

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') {
    console.log('You got the middle seat! 🤯😨');
  } else console.log('You got lucky! 🥰');
};
checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

// boxing - takes string and pusts in an object, to be able to run methods on strings
console.log(new String('Jonas')); // it is an object
// js does that behind the scenes when calling method on string
console.log(typeof new String('Jonas'));
console.log(typeof new String('Jonas').slice(1)); // back to string \ all methods return just primitive value
*/
// Working with Strings Part 2 (toUpper/Lower, trim, replace, includes, start/endsWith)
/*
const airline = 'TAP Air Portugal';
// change case of a string
console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnAS'; // Jonas
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect);

const getCorrectName = function (name) {
  const nameLower = name.toLowerCase();
  return nameLower[0].toUpperCase() + nameLower.slice(1);
};
console.log(getCorrectName('stAcY'));

// Comparing e-mail
const email = 'hello@jonas.io';
const loginEmail = '   Hello@Jonas.Io \n';

const lowerEmail = loginEmail.toLowerCase();
const trimmedEmail = lowerEmail.trim(); // removes spaces
console.log(trimmedEmail);

// trimStart - trims whitespaces just from the start, trimEnd - trims only from the end
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// Replacing
const priceGB = '288,97£';
const priceUS = priceGB.replace('£', '$').replace(',', '.'); // replacing
console.log(priceUS);
// can replace entire words
// replace is case sensetive
const announcment =
  'All passangers come to boarding door 23. Boarding door 23!';
console.log(announcment.replace('door', 'gate')); // replaces only first occiurance
console.log(announcment.replaceAll('door', 'gate')); // works!
// regular expression
// to write regular expression write it in /regex/
// /g - stands for global \ will replace it everywhere
console.log(announcment.replace(/door/g, 'gate'));

// Booleans
const plane = 'Airbus A320neo';
console.log(plane.includes('A320'));
console.log(plane.includes('Boeing'));
console.log(plane.startsWith('Air')); // check if string starts with
// ensds with
if (plane.startsWith('Airbus') && plane.endsWith('neo')) {
  console.log('Part of the new Airbus family!');
}

// Practise exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase();
  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are not allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};
checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');
*/
// Working with Strings Part 3(split, join, padStart/End)
/*
// split string by devider and store elements in an array
console.log('a+very+nice+string'.split('+'));
console.log('Jonas Shmdtn'.split(' '));

const [firstName, lastName] = 'Jonas Shmdtn'.split(' ');
console.log(firstName, lastName);

// jopin opposite of split
// joins string using the separator
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('stacy godzinsky');

// padding a string
// add number to a string until it has desired string length
const message = 'Go to gate 23!';
// adds + in the beggining so the string length will be 25
// padEnd will add 10 + morew in the end to make string.length 35
console.log(message.padStart(25, '+').padEnd(35, '+'));
console.log('Jonas'.padStart(25, '+'));

const maskCreditCard = function (number) {
  const str = number + ''; // number as a string / converst to a string
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(1232334545435));
console.log(maskCreditCard('12321343143253'));

// Repeat
// allow to repeat same string multiple times
const message2 = 'Bad weather... All Departures Delayed... ';
// creates big string with repeated values
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'✈️'.repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(12);
*/
// String Methods Practice

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Delayed Departure from FAO to TXL (11h25)
// Arrival from BRU to FAO (11h45)
// Delayed Arrival from HEL to FAO (12h05)
// Departure from FAO to LIS (12h30)

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  // split by ";" and destructure
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '🛑' : ''}${type.replaceAll(
    '_',
    ' '
  )} from ${getCode(from)} to ${getCode(to)} (${time.replace(
    ':',
    'h'
  )})`.padStart(45);
  console.log(output);
}
