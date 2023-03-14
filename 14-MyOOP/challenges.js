'use strict';

// Challenge #1
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const logSpeed = function (make, speed) {
  console.log(`"${make}" going at ${speed} km/h`);
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  logSpeed(this.make, this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  logSpeed(this.make, this.speed);
};

const bmw = new Car('BMW', 120);
const mercedes = new Car('Mercedes', 95);

bmw.accelerate();
console.log(bmw);
mercedes.brake();
console.log(mercedes);
*/
// Challenge #2
/*
const logSpeed = function (make, speed) {
  console.log(`"${make}" going at ${speed} km/h`);
};

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    logSpeed(this.make, this.speed);
  }

  brake() {
    this.speed -= 5;
    logSpeed(this.make, this.speed);
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

const ford = new CarCl('Ford', 120);
console.log(ford);
ford.accelerate();
ford.brake();
console.log(ford.speedUS);
// setting speed US that changes speed value
ford.speedUS = 50;
console.log(ford);
*/
// Challenge #3
/*
const Car = function (make, speed) {
  this.make = make;
  this.speed = speed;
};

const logSpeed = function (make, speed) {
  console.log(`"${make}" going at ${speed} km/h`);
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  logSpeed(this.make, this.speed);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  logSpeed(this.make, this.speed);
};

const EV = function (make, speed, charge) {
  Car.call(this, make, speed);

  this.charge = charge;
};

EV.prototype = Object.create(Car.prototype);

EV.prototype.chargeBattery = function (chargeTo) {
  this.charge = chargeTo;
};

// overriding method
EV.prototype.accelerate = function () {
  this.speed += 20;
  this.charge--;
  console.log(
    `"${this.make}" going at ${this.speed} km/h, with a charge of ${this.charge}%`
  );
};

const BMW = new Car('BMW', 125);

const tesla = new EV('Tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.accelerate();
BMW.accelerate();
*/
// Challenge #4
/*
const logSpeed = function (make, speed) {
  console.log(`"${make}" going at ${speed} km/h`);
};

class CarCl {
  constructor(make, speed) {
    this.make = make;
    this.speed = speed;
  }

  accelerate() {
    this.speed += 10;
    logSpeed(this.make, this.speed);
  }

  brake() {
    this.speed -= 5;
    logSpeed(this.make, this.speed);
    return this;
  }

  get speedUS() {
    return this.speed / 1.6;
  }

  set speedUS(speed) {
    this.speed = speed * 1.6;
  }
}

class EVCl extends CarCl {
  #charge;

  constructor(make, speed, charge) {
    super(make, speed);
    this.#charge = charge;
  }

  chargeBattery(chargeTo) {
    this.#charge = chargeTo;
    return this;
  }

  accelerate() {
    this.speed += 20;
    this.#charge--;
    console.log(
      `"${this.make}" going at ${this.speed} km/h, with a charge of ${
        this.#charge
      }%`
    );
    return this;
  }
}

const rivian = new EVCl('Rivian', 120, 23);
console.log(rivian);
rivian.accelerate().chargeBattery(90).accelerate().brake().accelerate();
console.log(rivian);

console.log(rivian.speedUS);
*/
