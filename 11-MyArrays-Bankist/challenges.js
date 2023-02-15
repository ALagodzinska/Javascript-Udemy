'use strict';

// Challenge #1
/*
const checkDogs = function (dogsJulia, dogsKate) {
  const fixedJuliaArr = dogsJulia.slice(1, -2);
  //   console.log(fixedJuliaArr);
  // OR
  const dogsJuliaCorrected = dogsJulia.slice();
  dogsJuliaCorrected.splice(0, 1);
  dogsJuliaCorrected.splice(-2);

  const dogsTogether = fixedJuliaArr.concat(dogsKate);
  //   console.log(dogsTogether);
  dogsTogether.forEach(function (dogAge, i) {
    console.log(`Dog number ${i + 1}
is ${
      dogAge < 3 ? `still a puppy 🐶` : `an adult, and is ${dogAge} years old`
    }`);
  });
};

console.log('____TEST1____');
checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);
console.log('____TEST2____');
checkDogs([9, 16, 6, 8, 3], [10, 5, 6, 1, 4]);
*/
// Challenge #2
/*
const calcAverageHumanAge = function (ages) {
  const dogHumanAge = ages.map(dogAge =>
    dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4
  );
  const adults = dogHumanAge.filter(age => age >= 18);
  const average = adults.reduce((acc, age) => acc + age, 0) / adults.length;

  // 2, 3 => (2+3)/2 = 2.5 === 2/2 + 2/3 = 2.5
  // could devide immideitly

  const average2 = adults.reduce(
    (acc, age, i, arr) => acc + age / arr.length,
    0
  );
  console.log(average2);

  return average;
};

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/
// Challenge #3
/*
const calcAverageHumanAge = ages =>
  ages
    .map(dogAge => (dogAge <= 2 ? dogAge * 2 : 16 + dogAge * 4))
    .filter(age => age >= 18)
    .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
console.log(calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]));
*/
// Challenge #4
/*
const dogs = [
  { weight: 22, curFood: 250, owners: ['Alice', 'Bob'] },
  { weight: 8, curFood: 200, owners: ['Matilda'] },
  { weight: 13, curFood: 275, owners: ['Sarah', 'John'] },
  { weight: 32, curFood: 340, owners: ['Michael'] },
];

// 1)
dogs.forEach(
  dog => (dog.recommendedFood = Math.trunc(dog.weight ** 0.75 * 28))
);
console.log(dogs);

// 2)
const sarahDog = dogs.find(dog => dog.owners.includes('Sarah'));
console.log(
  `Sarah's dog eat too ${
    sarahDog.curFood > sarahDog.recommendedFood ? 'much' : 'little'
  }`
);

// 3)
const ownersEatTooMuch = dogs
  .filter(dog => dog.curFood > dog.recommendedFood)
  .flatMap(dog => dog.owners);

const ownersEatTooLittle = dogs
  .filter(dog => dog.curFood < dog.recommendedFood)
  .flatMap(dog => dog.owners);

console.log(ownersEatTooMuch, ownersEatTooLittle);

// 4)
console.log(`${ownersEatTooMuch.join(' and ')}'s dogs eat too much!`);

console.log(`${ownersEatTooLittle.join(' and ')}'s dogs eat too much!`);

// 5)
console.log(dogs.some(dog => dog.curFood === dog.recommendedFood));

// 6)
const checkEatingOk = dog =>
  dog.curFood > dog.recommendedFood * 0.9 &&
  dog.curFood < dog.recommendedFood * 1.1;

console.log(dogs.some(checkEatingOk));

// 7)
const dogsEatingOk = dogs.filter(checkEatingOk);
console.log(dogsEatingOk);

// 8)
const sortedDogs = dogs
  .slice()
  .sort((a, b) => a.recommendedFood - b.recommendedFood);
console.log(sortedDogs);
*/
