'use strict'; //activate strict code for entire script
// Activating Strict Mode
/*
//at the beginning of each script
let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log("I can drive )))");

//const interface = "Audio"; - reserved words
//const private = 543;
*/
// Functions
/*
function logger() {
    console.log("My name is Stacy");
}

//invoking  calling / running a function
logger();
logger();
logger();

function fruitProcessor(apples, oranges) {
    console.log(apples, oranges);
    const juice = `Juice with ${apples} apples and ${oranges} oranges`;
    return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);
console.log(fruitProcessor(5, 0));

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

const num = Number("23");
*/
// Functions Declarations vs Expressions
/*
// Function Declaration ->
// can call function before they were defined in a code
const age1 = calcAge1(1991);
function calcAge1(birthYear) {
    return 2037 - birthYear;
}
console.log(age1);

// Function Expression ->
//ananonymous function, store function as variable;
// cant be called before defined in code
const calcAge2 = function (birthYear) {
    return 2037 - birthYear;
}
const age2 = calcAge2(1991);

console.log(age1, age2);
*/
// Arrow Functions
/*
//shorter and faster to write
//Arrow function - dont get this keyword
//with one line of logic && one parameter
const calcAge3 = birthYear => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);

// one or more lines && one parameter
const yearsUntilRetirment = birthYear => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;
    return retirement;
}

console.log(yearsUntilRetirment(1991));

//more than one parameter
const yearsUntilRetirment2 = (birthYear, firstName) => {
    const age = 2037 - birthYear;
    const retirement = 65 - age;
    return `${firstName} retires in ${retirement}`;
}

console.log(yearsUntilRetirment2(1991, "Stacy"));
*/
// Functions Calling Other Functions
/*
function cutFruitPieces(fruit) {
    return fruit * 4;
}

function fruitProcessor(apples, oranges) {
    const applePieces = cutFruitPieces(apples);
    const orangePieces = cutFruitPieces(oranges);

    const juice = `Juice with ${applePieces} pieces of apples and ${orangePieces} pieces of oranges`;
    return juice;
}

console.log(fruitProcessor(2, 3));
*/
// Reviewing Functions
/*
const calcAge = function (birthYear) {
    return 2037 - birthYear;
}

const yearsUntilRetirment = function (birthYear, firstName) {
    const age = calcAge(birthYear);
    const retirement = 65 - age;

    if (retirement > 0) {
        console.log(`${firstName} retires in ${retirement} years`);
        return retirement;
    } else {
        console.log(`${firstName} has already retired.`);
        return -1;
    }
}

console.log(yearsUntilRetirment(1991, "Jonas"));
console.log(yearsUntilRetirment(1950, "Mike"));
*/
// Introduction to Arrays
/*
const friend1 = "Michael";
const friend2 = "Steven";
const friend3 = "Peter";
// can always change array and mutate it
const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);

const years = new Array(1991, 1984, 2008, 2020);
// first element in array
console.log(friends[0]);
console.log(friends[2]);
// number of elements in array
console.log(friends.length);
// last element in array
console.log(friends[friends.length - 1]);

//change/mutate array
friends[2] = "Jay";
console.log(friends);
// cant replace entire array
//friends = ['bob', 'alice'];

const firstName = "Stacy";
const stacy = [firstName, "Godzinsky", 2023 - 1998, "programmer", friends];
console.log(stacy);
console.log(stacy.length);

// Exercise
const calcAge = function (birthYear) {
    return 2037 - birthYear;
}
const birthYears = [1990, 1967, 2002, 2010, 2018];
//cant do operations with arrays
//console.log(calcAge(birthYears)); // NaN
const age1 = calcAge(birthYears[0]);
const age2 = calcAge(birthYears[1]);
const age3 = calcAge(birthYears[birthYears.length - 1]);
console.log(age1, age2, age3);

const ages = [calcAge(birthYears[0]), calcAge(birthYears[1]), calcAge(birthYears[birthYears.length - 1])];
console.log(ages);
*/
// Basic Array Operations (Methods)
/*
const friends = ['Michael', 'Steven', 'Peter'];
// push -adds elements to the end of array
const newLength = friends.push("Jay"); // return the length of array
console.log(friends);
console.log(newLength);

// unshift - add element to the beginning
friends.unshift("John"); // also returns the length of array
console.log(friends);

// Remove elements
// pop - remove last element
const popped = friends.pop(); // returns the removed element
console.log(popped);
console.log(friends);

// shift - remove first elemet from array
friends.shift(); // return element that was removed
console.log(friends);

// in which position is element in array
console.log(friends.indexOf("Steven"));
console.log(friends.indexOf("BOB")); // element which is not in array return -1

friends.push(23);

// check if element is in array (use strict equality for this check)
console.log(friends.includes("Steven")); // return true or false
console.log(friends.includes("Bob"));
console.log(friends.includes("23")); //false
console.log(friends.includes(23)); //true

if (friends.includes("Peter")) {
    console.log("You have a friend called Peter!");
}
*/
// Introduction to objects
/*
// arrays use for order data, objects for unstructured data
// has 5 properties
const jonas = { // object literal syntax {}
    firstName: "Jonas",
    lastName: "Schmedmann",
    age: 2037 - 1991,
    job: "teacher",
    friends: ["Michael", "Peter", "Steven"]
};
*/
// Dot VS Bracket Notation
/*
const jonas = { // object literal syntax {}
    firstName: "Jonas",
    lastName: "Schmedmann",
    age: 2037 - 1991,
    job: "teacher",
    friends: ["Michael", "Peter", "Steven"]
};
console.log(jonas); // properties are ordered alphabeticly
// dot notation to get property of an object
// use real property name
console.log(jonas.lastName);
// brackets notation
console.log(jonas["lastName"]); // can put any expression

const nameKey = "Name";
console.log(jonas["first" + nameKey]);
console.log(jonas["last" + nameKey]);

// console.log(jonas."last" + nameKey); // wrong
// prompt - popupo with an input
const interestedIn = prompt("What do you want to know about Jonas? Choose between firstName, lastName, age, job and friends");
// get undefined if try to access the property that doesnt exist
console.log(jonas[interestedIn]);
// if this value exists it is a truthy value(if undefined will be false)
if (jonas[interestedIn]) {
    console.log(jonas[interestedIn]);
} else {
    console.log("Wrong request! Choose between firstName, lastName, age, job and friends")
}
// Adding new propeerties yto the object
jonas.location = "Portugal";
jonas["twitter"] = "@jonastwit";
console.log(jonas);

// Challenge
console.log(`${jonas.firstName} has ${jonas.friends.length} friends, and his best friend is called ${jonas.friends[0]}`);
*/
// Object Methods
/*
const jonas = { // object literal syntax {}
    firstName: "Jonas",
    lastName: "Schmedmann",
    birthYear: 1991,
    job: "teacher",
    friends: ["Michael", "Peter", "Steven"],
    hasDriversLicense: true,
    // property that holds function expression
    // Function thst is attachet to an object is a method
    calcAge: function (birthYear) {
        return 2037 - birthYear;
    },

    calcAge2: function () { // this reference an object calling a method
        console.log(this);
        return 2037 - this.birthYear;
    },

    calcAge3: function () {
        // created new property
        this.age = 2037 - this.birthYear;
        return this.age;
    },

    getSummary: function () {
        return `${this.firstName} is a ${this.calcAge3()}-year old ${this.job}, and he has ${this.hasDriversLicense ? "a" : "no"} driver's license.`;
    }
};

console.log(jonas.calcAge(1991));
console.log(jonas["calcAge"](1991));

console.log(jonas.calcAge2());

console.log(jonas.calcAge3());
console.log(jonas.age);

// Challenge
console.log(jonas.getSummary());
*/
// The For Loop
/*
// loop is a control structure
// console.log("Lifting weights repetition 1 🏋🏾‍♀️");
// console.log("Lifting weights repetition 2 🏋🏾‍♀️");
// console.log("Lifting weights repetition 3 🏋🏾‍♀️");
// console.log("Lifting weights repetition 4 🏋🏾‍♀️");
// console.log("Lifting weights repetition 5 🏋🏾‍♀️");
// console.log("Lifting weights repetition 6 🏋🏾‍♀️");
// console.log("Lifting weights repetition 7 🏋🏾‍♀️");
// console.log("Lifting weights repetition 8 🏋🏾‍♀️");
// console.log("Lifting weights repetition 9 🏋🏾‍♀️");
// console.log("Lifting weights repetition 10 🏋🏾‍♀️");

// for loop keeps running while condition is true
for (let rep = 1; rep <= 30; rep++) {
    console.log(`Lifting weights repetition ${rep} 🏋🏾‍♀️`);
}
*/
// Looping Arrays, Breaking And Continuing
/*
const jonasArray = [
    "Jonas",
    "Schmedtman",
    2037 - 1991,
    "Teacher",
    ["Michael", "Peter", "Steven"], // array type is an object
    true
];

const types = []; // empty array
// jonas[5] does not exist

for (let i = 0; i < jonasArray.length; i++) {
    // Reading from Jonas array
    console.log(jonasArray[i], typeof (jonasArray[i]));
    // Filling types array
    //types[i] = typeof (jonasArray[i]); // 1 var
    types.push(typeof (jonasArray[i]));
}

console.log(types);

const years = [1991, 2007, 1969, 2020];
const ages = [];

for (let i = 0; i < years.length; i++) {
    ages.push(2037 - years[i]);
}
console.log(ages);

// continue and break statement
// continue - exit current iteration in the loop and move to the next one
// break - just exits and terminates whole loop
console.log("___ONLY STRINGS___");
for (let i = 0; i < jonasArray.length; i++) {
    // if not a string then go to the next iteration
    if (typeof (jonasArray[i]) !== "string") continue;

    console.log(jonasArray[i], typeof (jonasArray[i]));
}

console.log("___BREAK WITH NUMBER___");
for (let i = 0; i < jonasArray.length; i++) {
    if (typeof (jonasArray[i]) === "number") break;

    console.log(jonasArray[i], typeof (jonasArray[i]));
}
*/
// Looping Backwards and Loops in Loops
/*
const jonasArray = [
    "Jonas",
    "Schmedtman",
    2037 - 1991,
    "Teacher",
    ["Michael", "Peter", "Steven"],
    true
];

// looping backwards
for (let i = jonasArray.length - 1; i >= 0; i--) {
    console.log(i, jonasArray[i]);
}

// loop inside a loop
for (let exercise = 1; exercise < 4; exercise++) {
    console.log(`-------- Starting exercise ${exercise}`);

    for (let rep = 1; rep < 6; rep++) {
        console.log(`Exercise ${exercise}: Lifting weights repetition ${rep} 🏋🏾‍♀️`);
    }
}
*/
// The While Loop
/*
for (let rep = 1; rep <= 10; rep++) {
    console.log(`Lifting weights repetition ${rep} 🏋🏾‍♀️`);
}
let rep = 1;
// only condition
while (rep <= 10) {
    console.log(`WHILE: Lifting weights repetition ${rep} 🏋🏾‍♀️`);
    rep++;
}

let dice = Math.trunc(Math.random() * 6) + 1; // math random generates number between 0 and 1; math trunk to get rid of 0.12q1313
//console.log(dice);
// loop without a couinter
while (dice !== 6) {
    console.log(`You rolled a ${dice}`);
    dice = Math.trunc(Math.random() * 6) + 1;
    if (dice === 6) console.log("Loop is about to end...");
}
*/
