//Values And Variables
/*
let js = "amazing";
console.log(40 + 8 + 23 - 10);

console.log("Jonas");
console.log(23);

let firstName = "Matilda";

console.log(firstName);
console.log(firstName);
console.log(firstName);

//Variablre name conventions
let jonas$matilda = 'JM';
let $function = 27; ///can use reserved names with $ or _
let PI = 3.1415; ///constant, write with uppercase
let KEY = "Secret Word"; /// constant

let myFirstJob = "Coder";
let myCurrentJob = "Teacher";

let job1 = "Programmer";
let job2 = "Teacher";

console.log(myFirstJob);
*/
//Data types
/*
let javascriptIsFun = true;
console.log(javascriptIsFun);

console.log(typeof true); //get type of value
console.log(typeof javascriptIsFun);
console.log(typeof 23);
console.log(typeof "Jonas");

javascriptIsFun = "YES!";
console.log(typeof javascriptIsFun);

let year;
console.log(year); //undefined value
console.log(typeof year); //undefined type

year = 1991;
console.log(typeof year);

console.log(typeof null); //bug that type of null is an object
*/
//Let, const and var
/*
// let for a variables that can change later.
//Let - Reassign the value to a variable, mutate variable
let age = 30;
age = 31;

//Const not supposed to change in future, is immutable
const birthYear = 1991;
//birthYear = 1990; //will not work, cannot be mutated
//const job; //need to be declared

//Var - should be avoided
var job = "programmer";
job = "teacher";
//Let is block scoped and var is function scoped

//this doesnt create a variable
//It creates a global object property
lastName = "Lagodzinska";
console.log(lastName);
*/
//Basic Operators
/*
// Math Operators
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;
console.log(ageJonas, ageSarah);

console.log(ageJonas * 2, ageJonas / 10, 2 ** 3);
// 2 ** 3 = means to the power of 3 = 2 * 2 * 2 (stepenj)

//join or concatonate strings
const firstName = "Stacy";
const lastName = "Godzinsky";
console.log(firstName + " " + lastName);

// Assignment operators
let x = 10 + 5; //15
x += 10; //25 = (x = x + 10)
x *= 4; // x = x * 4 = 100
x++; // x = x + 1
x--; // x = x - 1
x--;
console.log(x);

// Comparison Operators
console.log(ageJonas > ageSarah); // >, <, >=, <=
console.log(ageSarah >= 18);

const isFullAge = ageSarah >= 18;

console.log(now - 1991 > now - 2018)
*/
//Operator Precedence
/*
//Order in which operators are executed
const now = 2037;
const ageJonas = now - 1991;
const ageSarah = now - 2018;

console.log(now - 1991 > now - 2018);

console.log(25 - 10 - 5);

let x, y; //declared two empty values
x = y = 25 - 10 - 5;// x = y = 10, x = 10
console.log(x, y);

const averageAge = (ageJonas + ageSarah) / 2;
console.log(ageJonas, ageSarah, averageAge);
*/
//String and Template Literals
/*
const firstName = "Stacy";
const job = "Programmer";
const birthYear = 1998;
const year = 2024;

const stacy = "I'm " + firstName + ", a " + (year - birthYear)
    + " years old " + job + "!";
console.log(stacy);

const stacyNew = `I'm ${firstName}, a ${year - birthYear} years old ${job}!`;
console.log(stacyNew);

console.log(`Just a regular string...`);

console.log("String with \n\
multiple \n\
lines");

console.log(`String
multiple
lines`);
*/
// Taking decisions if/else statement
/*
const age = 15;
//control structure
if (age >= 18) {
    console.log("Sarah can start driving licence 🙌🚗");
} else {
    const yearsLeft = 18 - age;
    console.log(`Sarah is too young. Wait another ${yearsLeft} years (┬┬﹏┬┬) 🤐`)
}

const birthYear = 2012;
let century;

if (birthYear <= 2000) {
    century = 20
} else {
    century = 21
}
console.log(century);
*/
// Type convertion and coertion
/*
// type convertion
const inputYear = "1991";
//Parse to number
console.log(Number(inputYear), inputYear);
console.log(Number(inputYear) + 18);

console.log(Number("Stacy")); // got NaN - not a number
console.log(typeof NaN); // invalid number

//Parse to string
console.log(String(23), 23);

//type coertion
console.log("I am " + 23 + " years old");
console.log("I am " + String(23) + " years old");
console.log("23" + "10" + 3); //are concatonated 23103
console.log("23" - "10" - 3); //minus operator triggers oposite convertions, string convert to numbers
console.log("hel" - "10" - 3); //NaN
console.log("23" * "2"); //converted to numbers
console.log("23" / "2"); //same for deviding

let n = "1" + 1; //11
n = n - 1; //10
console.log(n);
*/
// Truthy and Falsy Values
/*
// 6 falsy values: 0, "", undefined, false, null, NaN
// All of them will be converted to false

console.log(Boolean(0));
console.log(Boolean(undefined));
console.log(Boolean("Stacy")); //not an empty string
console.log(Boolean({})); // empty object = true
console.log(Boolean(""));

const money = 100;
//in if parantesis js will convert it to boolean
if (money) {
    console.log("Don't spend it all :)");
} else {
    console.log("You should get a job!");
}

let height; //it is undefined
if (height) {
    console.log("YAY! Height is defined!");
} else {
    console.log("Height is undefined!");
}
*/
// Equality Operators == VS ===
/*
const age = "18";
// if we hawe if statement only one line, can omit the code
if (age === 18) console.log("You just became an adult :D (strict)");
// === strict equality operator does not do type coertion
// == do type coertion
if (age == 18) console.log("You just became an adult :D (loose)");

//prompt - like a smaill inmput form
//gettiong a string
const favourite = Number(prompt("What's your favourite number?"));
console.log(favourite);
console.log(typeof (favourite));

if (favourite === 23) {
    console.log("Cool! 23 is an amazing number!");
} else if (favourite === 7) {
    console.log("7 is also a cool number!");
} else if (favourite === 9) {
    console.log("9 is also a cool number!");
} else {
    console.log("Number is not 23, 7 or 9");
}
// not equal strict - !==; not strict - !=
if (favourite !== 23) console.log("Why not 23?");
*/
// Boolean Logic -and | or | not(inverts expression)
// Logical Operators
/*
const hasDriversLicence = true; // A
const hasGoodVision = true; // B
// && - and
console.log(hasDriversLicence && hasGoodVision);
// || - or
console.log(hasDriversLicence || hasGoodVision);
// ! - not operator
console.log(!hasDriversLicence);

if (hasDriversLicence && hasGoodVision) {
    console.log("Sarah is able to drive!");
} else {
    console.log("Someone else should drive...");
}

const isTired = false; // C
console.log(hasDriversLicence && hasGoodVision && isTired);

if (hasDriversLicence && hasGoodVision && !isTired) {
    console.log("Sarah is able to drive!");
} else {
    console.log("Someone else should drive...");
}
*/
// The switch statement
/*
const day = "Monday";
// Strict comparison!
switch (day) {
    case "Monday": // day === 'monday'; compare in strict equality
        console.log("Plan course structure");
        console.log("Go to coding meetup");
        break; // tells to stop
    case "Tuesday":
        console.log("Prepare theory videos");
        break;
    case "Wednesday": //can do both cases same block
    case "Thursday":
        console.log("Write code examples");
        break;
    case "Friday":
        console.log("Record videos");
        break;
    case "Saturday":
    case "Sunday":
        console.log("Enjoy the weekend :D");
        break;
    default:
        console.log("Not a valid day");
}

if (day === "Monday") {
    console.log("Plan course structure");
    console.log("Go to coding meetup");
} else if (day === "Tuesday") {
    console.log("Prepare theory videos");
} else if (day === "Wednesday" || day === "Thursday") {
    console.log("Write code examples");
} else if (day === "Friday") {
    console.log("Record videos");
} else if (day === "Saturday" || day === "Sunday") {
    console.log("Enjoy the weekend :D");
} else {
    console.log("Not a valid day");
}
*/
// Statements and Expressions
/*
//Expression - piece of code that produces a value
3 + 4; // expression
1998; // expression, will produce a value
true && false && !false; // expression, produce bool value
//Statements - performs actions, doesent produce a value
if (23 > 10) { //if / else statement
    const str = "23 is bigger";
}

const me = "Stacy";
console.log(`I'm ${2023 - 1998} years old  ${me}`); // cant put here statements
*/
// The Conditional (Ternary) Operator
/*
//Conditional operator - if/else statement but in one lin// ternary operator - because have three parts; is an expression
const age = 23;
age >= 18 ? console.log("I like to drink wine 🍷") : console.log("I like to drink water 🤽🏾");

const drink = age >= 18 ? "wine 🍷" : "water 🤽🏾";
console.log(drink);

let drink2; //otherwise we declare variable outside
if (age >= 18) {
    drink2 = "wine 🍷";
} else {
    drink2 = "water 🤽🏾";
}
console.log(drink2);

// can write it inside of a template literal - ${}, because it produces a value
console.log(`I like to drink ${age >= 18 ? "wine 🍷" : "water 🤽🏾"}`);
*/