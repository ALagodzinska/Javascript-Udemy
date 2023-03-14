'use strict';
// What is Object Oriented Programming:
/*
 - based on concept of objects;
 - use objects to describe real-world features
 - contain data(properties) and code(methods)
 - pack data and corresponding behaviour
 - Objects - self-contained pieces of code
 - API - public interface
 - goal to organize code

 instance - real object created from a class

 4 principles:
 1) abstraction - hide details that dont matter, get overview
 2) encapsulation - keep some methods/properties private inside the class, make it not acesssible otside the class. Prevent external code manipulate object data
 3) inheritance - makes all prop/methods available to the child class, reuse logic that is common to both classes
 4) polymorphism - child class can overwrite a method it inherited from a parent class

 OOP in javascript
  - objects are linked to a PROTOTYPE object
  - Prototype contains methods and object can use them
  - Prototypal inheritance - accessible to all objects linked to a prototype
  - behaviour is delegated to the linked prototype object

  1) constructor functions - create object using a function
  2) es6 classes - modern way of oop; are not classical classes of oop
  3) Object.create - easiest, straightforward way
*/
// Constructor Functions And The New Operator
/*
// built an object using a function
// construction function is called with new operator
// construction functions always start with capital letter
const Person = function (firstName, birthYear) {
  //   console.log(this); // Person {}
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  // Never do this!!!
  // to not duplicate function
  //   this.calcAge = function () {
  //     console.log(2023 - this.birthYear);
  //   };
};

const stacy = new Person('Stacy', 1998); //

console.log(stacy instanceof Person); // true

console.log(stacy);

// 1.empty object is created
// 2. the function is called, this keyword is new empty object {}
// 3. new created object is linked to a prototype
// 4. object is automatically returned from construction function

const matilda = new Person('Matilda', 2006);
const jack = new Person('Jack', 1975);
console.log(matilda, jack);
*/
// Prototypes
/*
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const stacy = new Person('Stacy', 1998);

console.log(Person.prototype);
// not a prototype for person but a person prototype to use for another objects

// To add method to an object
// function to reuse
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};
// can use method even though it is not on object itself

stacy.calcAge(); // object does not contain calcAge method
console.log(stacy.__proto__); // prototype of stacy
console.log(stacy.__proto__ === Person.prototype); // true

console.log(Person.prototype.isPrototypeOf(stacy)); // true
console.log(Person.prototype.isPrototypeOf(Person)); // false

// Prototype of linked objects - Person.prototype
Person.prototype.species = 'Homo Sapiens';
console.log(stacy); // species are in prototype
console.log(stacy.species); // not its own properties
// own properties are onbly if they were defined directly on the object itself
console.log(stacy.hasOwnProperty('firstName')); // true
console.log(stacy.hasOwnProperty('species')); // false

// prototype for person.prototype is object.prototype
// Object.prototype - __proto__ is bull because it is the end of prototype chain
*/
// Prototypal Inheritance On Built-In Objects
/*
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;
};

const stacy = new Person('Stacy', 1998);

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

console.log(stacy.__proto__); // person
console.log(stacy.__proto__.__proto__); // object - is top of the scope chain (Object.prototype)
console.log(stacy.__proto__.__proto__.__proto__); // null

console.log(Person.prototype.constructor); // get function iself
console.dir(Person.prototype.constructor); // points back at person

const arr = [3, 6, 6, 8, 8, 9, 3, 4]; // is the same as -  new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__); // Object.prototype

// all arrays will inherit this method
// generally is not a good idea
Array.prototype.unique = function () {
  return [...new Set(this)];
};
console.log(arr.unique());

const h1 = document.querySelector('h1'); // has 6-7 levels of prototype
console.dir(x => x + 1); // function
*/
// ES6 Classes
/*
// class expression
// const PersonCl = class{};

// class declaration
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // methods will be on prototype on the object, not on the object itself!!!
  // metrhods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  // setting a property that already exsists
  // validation example
  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.__proto__ === PersonCl.prototype); // true

console.log(jessica.age);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

// 1. Classes are not hoisted - cant use before declaration
// (function declarations are hoisted - we can use them before they are declared in the code)
// 2. Class are first-class citizens - can pass them into functions and return them from functions
//(classes are special kind of functions)
// 3. Classes are executed in strict mode
*/
// Setters And Getters
/*
// every object can have setter and getter properties (accesor properties)
// gets and sets value

const walter = new PersonCl('Walter', 1965);

const account = {
  owner: 'jonas',
  movements: [200, 300, 120, 209],

  // read something ads a property but need to do some calculations before
  get latest() {
    return this.movements.slice(-1).pop();
  },

  // need to have at least one parameter
  set latest(mov) {
    this.movements.push(mov);
  },
};

// use it as a property
console.log(account.latest);

// setter
account.latest = 50;
console.log(account.movements);

// setters and getters are pretty useful for data validation
*/
// Static Methods
/*
// constructor function
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};
// adding static method
Person.hey = function () {
  console.log('Hey There 🥰');
  console.log(this); // constructor function
};
Person.hey();
// jonas.hey(); - do not work like that

// class
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // instance method
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // adding static function
  static hey() {
    console.log('Hey There 👾');
    console.log(this);
  }
}

PersonCl.hey(); // points to the entire class
*/
// Object.Create
/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto); // return neew object linked to PersonProto - prototype
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();
*/
// Inheritance Between "Classes": Constructor Functions
/*
const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

const Student = function (firstName, birthYear, course) {
  // calls the function and we are able to specify this keyword
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Creates object with inheritance
// Add at this point so it will not override all the methods added to an object
// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const mike = new Student('Mike', 2020, 'Computer Science');
console.log(mike);
mike.introduce();
mike.calcAge();

console.log(mike.__proto__);
console.log(mike.__proto__.__proto__);

console.log(mike instanceof Student);
console.log(mike instanceof Person);

// fixing to display student ctor
Student.prototype.constructor = Student;

console.dir(Student.prototype.constructor); // points back do person
*/
// Inheritance Between "Classes": ES6 Classes
/*
class PersonCl {
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }

  // instance method
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  get age() {
    return 2037 - this.birthYear;
  }

  set fullName(name) {
    console.log(name);
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // adding static function
  static hey() {
    console.log('Hey There 👾');
    console.log(this);
  }
}

// creates inheritance
class StudentCl extends PersonCl {
  constructor(fullName, birthYear, course) {
    // construction function of the parent class
    // Always needs to happen first
    // responsible for creating the this keyword
    super(fullName, birthYear);
    // if no additional parameters we can - not create constructor
    this.course = course;
  }

  introduce() {
    console.log(`My name is ${this.fullName} and I study ${this.course}`);
  }

  calcAge() {
    console.log(
      `I'm ${
        2037 - this.birthYear
      } years old, but as a student I feel more like ${
        2037 - this.birthYear + 10
      }`
    );
  }
}

const martha = new StudentCl('Martha Jones', 2012, 'Computer Science');
martha.introduce();
martha.calcAge();
*/
// Inheritance Between "Classes": Object.Create
/*
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);

const StudentProto = Object.create(PersonProto);
StudentProto.init = function (firstName, birthYear, course) {
  // reuse init from parent prototype
  PersonProto.init.call(this, firstName, birthYear);
  this.course = course;
};

StudentProto.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const jay = Object.create(StudentProto);
jay.init('Jay', 2010, 'Computer Science');
jay.introduce();
jay.calcAge();
*/
// Another Class Example
// Encapsulation: Protected Properties and Methods
/*
class Account {
  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this._pin = pin;
    // _ - convention to use for protected properties
    this._movements = []; // create properties not based on any input
    this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }

  // interface to our objects
  // Public interface

  getMovements() {
    return this._movements;
  }

  deposit(value) {
    this._movements.push(value);
  }

  withdrawal(value) {
    this.deposit(-value);
  }

  // internal method
  // shouldnt be availeble outside
  _approveLoan(value) {
    return true;
  }

  requestLoan(value) {
    if (this.approveLoan(value)) {
      this.deposit(value);
      console.log('Loan approved');
    }
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
console.log(acc1);

// beter to create methods that interact with the properties
// acc1.movements.push(250);
// acc1.movements.push(-250);
// can still do this
// acc1._movements.push(250);
console.log(acc1.getMovements());

acc1.deposit(250);
acc1.withdrawal(140);
acc1.requestLoan(1000);

console.log(acc1);
*/
// Encapsulation: Private Class Fields and Methods
/*
// 1) Public fields
// 2) Private fields
// 3) Public methods
// 4) Private methods
// (there is also a static version)

class Account {
  // defining a public field
  // 1) Public fields instances
  locale = navigator.language;
  _movements = [];

  // 2) Private fields (instances themselves)
  // SYNTAX THAT MAKES A FIELD PRIVATE - #
  #movements = [];
  // fields have to be out of the constructor
  #pin; // creating an empty private variable

  constructor(owner, currency, pin) {
    this.owner = owner;
    this.currency = currency;
    this.#pin = pin;
    // _ - convention to use for protected properties
    // this._movements = []; // create properties not based on any input
    // this.locale = navigator.language;

    console.log(`Thanks for opening an account, ${owner}`);
  }
  // 3) Public methods

  // interface to our objects
  // Public interface
  getMovements() {
    return this.#movements;
  }

  deposit(value) {
    this.#movements.push(value);
    // return current object
    return this;
  }

  withdrawal(value) {
    this.deposit(-value);
    return this;
  }

  requestLoan(value) {
    if (this.#approveLoan(value)) {
      this.deposit(value);
      console.log('Loan approved');
      return this;
    }
  }

  // 4) Private Methods
  // internal method
  // shouldnt be availeble outside
  // see as a private field
  #approveLoan(value) {
    return true;
  }

  // Static
  // available only on a class itself
  static helper() {
    console.log('Helper');
  }
}

const acc1 = new Account('Jonas', 'EUR', 1111);
acc1.deposit(150);
acc1.withdrawal(240);
acc1.requestLoan(2000);
console.log(acc1);
// cannot acess private property
// console.log(acc1.#movements);
// can get through method
console.log(acc1.getMovements());
// acc1.#approveloan();
Account.helper(); // static method
*/
// Chaining Methods
/*
// return object in each methods to make chainable
acc1.deposit(300).deposit(500).withdrawal(35).requestLoan(2500).withdrawal(400);
console.log(acc1.getMovements());
*/
