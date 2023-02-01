'use strict';
// Scoping in Practise
/*
function calcAge(birthYear) {
  const age = 2037 - birthYear;
  //   // available here
  //   console.log(firstName);

  function printAge() {
    // still is stacy
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);

    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      // find variable in current scope and use it
      // Creating new variable with same name as other scopes variable
      const firstName = 'Steven';
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);

      function add(a, b) {
        return a + b;
      }

      // reassigning other scope variable
      output = 'New output!';
    }
    // const - cant acess outside block scope
    // console.log(str);
    // var is accessible outside the block,
    // var variables are function soped not block scoped
    console.log(millenial);
    // functions are block scoped in strict mode
    //add(2, 3);
    // manipulated existing variable in child scope
    console.log(output);
  }
  printAge();

  return age;
}

// global variable
// will throw an error because defined before global variable
// calcAge(1998);
const firstName = 'Stacy';
calcAge(1996);
// not able to access here from inner scope
// console.log(age);
// printAge();
*/
// Hoisting and TDZ(Temporal Dead Zone) in practice
/*
// Variables
console.log(me); // undefined
// console.log(job); // cant acess before init
// console.log(year);

var me = 'Jonas'; // hoisted to the value of undefined
// for hob TDZ before this line
let job = 'teacher';
const year = 1991;

// Functions
// can cqall funct declaration before it was assigned
console.log(addDecl(2, 3));
console.log(addArrow); // undefined
// console.log(addExpr(2, 3)); // in temporal deadzone
// console.log(addArrow(2, 3));

// if function is declared with var, different error - method is not a function. Because we try to call undefined

function addDecl(a, b) {
  return a + b;
}

const addExpr = function (a, b) {
  return a + b;
};

var addArrow = (a, b) => a + b;

// Example
// here numProducts will be undefined = false
console.log(numProducts);
if (!numProducts) deleteShoppingCart();

var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}
// create properties on the global window object
var x = 1;
// dont create properties on the global window object
let y = 2;
const z = 3;

console.log(x === window.x);
console.log(y === window.y);
console.log(z === window.z);
*/
// The THIS Keyword in Practise
/*
console.log(this); // is window object

const calcAge = function (birthYear) {
  console.log(2037 - birthYear);
  console.log(this); // is undefined
};
// function not attached to any object
calcAge(1991);

const calcAgeArrow = birthYear => {
  console.log(2037 - birthYear);
  console.log(this); // is window object
  // because arrow function does not have it is own THIS keyword so it use global this keyword
};

calcAgeArrow(1991);

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this); // jonas object
    console.log(2037 - this.year);
  },
};

jonas.calcAge();

const matilda = {
  year: 2017,
};

// method borrowing from one object to another
matilda.calcAge = jonas.calcAge;
matilda.calcAge(); // does funct for matilda object

const f = jonas.calcAge; // COPY FUNCTION TO A NEW VARIABLE
// do not call it
f(); // this keyword turns into undefined - error
*/
// Regular Functions VS Arroe Functions
/*
// create global property
// var firstName = 'Matilda';

const jonas = {
  firstName: 'Jonas',
  year: 1991,
  calcAge: function () {
    console.log(this); // jonas object
    console.log(2037 - this.year);

    // how to preserve this keyword
    const self = this; // self or that

    // Solution 1
    // const isMillenial = function () {
    //   console.log(this);
    //   console.log(self);
    //   //   console.log(this.year >= 1981 && this.year <= 1996);
    //   console.log(self.year >= 1981 && self.year <= 1996);
    // };
    // // regural function call is set to undefined (it is not called from an object)
    // isMillenial();

    // Solution 2
    // works because arrow function uses this keyword from parent scope
    const isMillenial = () => {
      console.log(this);
      console.log(self);
      //   console.log(this.year >= 1981 && this.year <= 1996);
      console.log(self.year >= 1981 && self.year <= 1996);
    };

    isMillenial();
  },

  greet: () => {
    console.log(this);
    console.log(`Hey ${this.firstName}`);
  },
};

jonas.greet(); // Hey undefined | dont have this keyword
console.log(this.firstName); // property that doesnt exsists

jonas.calcAge();

// Arguments keyword
const addExpr = function (a, b) {
  console.log(arguments); // arguments in list of parameters
  return a + b;
};

addExpr(2, 5);
addExpr(2, 5, 6, 7, 8, 9);

// arguments keywords exsists only in regural functions
var addArrow = (a, b) => {
  console.log(arguments);
  return a + b;
};

// addArrow(2, 5, 7);
*/
// Primitives VS Objects (Primitive VS Reference Types)
/*
let age = 30;
let oldAge = age;
age = 31;
console.log(age);
console.log(oldAge);

const me = {
  name: 'Jonas',
  age: 30,
};
const friend = me; // becomes same object
friend.age = 27;

// both get age of 27
console.log(`Friend:`, friend);
console.log('Me', me);
*/
// Primitives VS Objects in Practise
/*
// Primitive types
let lastName = 'Williams';
let oldLastName = lastName;
lastName = 'Davis';

console.log(lastName);
console.log(oldLastName);

// Reference types
const jessica = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
};

// holds reference to original object in heap
const marriedJessica = jessica;
marriedJessica.lastName = 'Davis';

console.log('Before marriage', jessica);
console.log('After marriage', marriedJessica);

// cant do that because of const
// marriedJessica = {};

// Copying objects
const jessica2 = {
  firstName: 'Jessica',
  lastName: 'Williams',
  age: 27,
  family: ['Alice', 'Bob'],
};

// merge two object and creates a new
// only works on first level if will be oject inside an object, it will still point at the same value
const jessicaCopy = Object.assign({}, jessica2);
jessicaCopy.lastName = 'Davis';

console.log('Before marriage', jessica2);
console.log('After marriage', jessicaCopy);

// in both objects family changes
jessicaCopy.family.push('Mary');
jessicaCopy.family.push('John');

// library Lo-Dash for deep cloning
*/
