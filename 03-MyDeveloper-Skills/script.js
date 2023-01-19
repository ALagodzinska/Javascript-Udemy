// Remember, we're gonna use strict mode in all scripts now!
'use strict';
// Setting up Prettier, snippets, todo highlights and vs Code
/*
// prettier delete unneeded lines, change single quotes to double
const x = 23;
if (x === 23) console.log(23);

const calcAge = birthYear => 2037 - birthYear;
// whener i write cl and hit enter it will give console.log
console.log();
// now can use highlihted BUG, FIXME, TODO, NOTE
// snippet - to create shorten version of repeated lines - cd - console.log();
*/
// Installing Node.JS and Setting up a Dev Environment
/*
const calcAge = birthYear => 2037 - birthYear;
// Live server applys the changes on save will trigger reload
//console.log(calcAge(1991));
console.log(calcAge(1991));
// -g - means that it should be installed globally, be accesible everywhere from your computer
// Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy Unrestricted
// Live server will open html file by default
*/
// Using Google stackoverflow and MDN
/*
// Problem 1: Given an array of temperatures of one day, calculate the temperature amplitude. Keep in mind that sometimes there might be a sensor error
const temperatures = [3, -2, -6, -1, 'error', 9, 13, 17, 14, 9, 5];

// 1) Understanding the problem
// What is temperature amplitude - difference between highest and lowest temperature
// How to compute max and min temperatures?
// What a sensor error look like? And What to do? - just ignore an error

// 2) Breaking up into sub-problem
// - How to ignore errorss?
// - Find max value in temperature array
// - Find min value from temperature array
// - Subtract min from max(amplitude) and return it

const calcTempAmplitude = function (temps) {
  //assume that first item in array is max
  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue; // ignore errors

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};

const amplitude = calcTempAmplitude(temperatures);
console.log(amplitude);

//Problem 2: Function noew should recieve 2 arrays

// 1) Understanding the problem
// With two arrays should we implement functionality twice? - No! Just merge two arrays

// 2) Breaking up into sub-problem
// Merge two arrays

//.concat - merge array
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

const calcTempAmplitudeNew = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = temps[0];
  let min = temps[0];

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue; // ignore errors

    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};

const amplitudeNew = calcTempAmplitudeNew([3, 5, 1], [9, 0, 5]);
console.log(amplitudeNew);
*/
// Debugging with the console and Breakpoints
/*
const measureKelvin = function () {
  const measurement = {
    type: 'temp',
    unit: 'celsius',

    /// C) Fix
    value: Number(prompt('Degree celsius')),
  };
  // B) Find The Bug
  console.log(measurement);
  console.table(measurement); //display nice formaatted table

  console.log(measurement.value);
  console.warn(measurement.value); //displ;ay as a warning
  console.error(measurement.value); // display as an error

  const kelvin = measurement.value + 273;
  return kelvin;
};
// A) Identify the bug
console.log(measureKelvin());

// Using a debugger
const calcTempAmplitudeBug = function (t1, t2) {
  const temps = t1.concat(t2);
  console.log(temps);

  let max = 0;
  let min = 0;

  for (let i = 0; i < temps.length; i++) {
    const curTemp = temps[i];
    if (typeof curTemp !== 'number') continue; // ignore errors

    debugger; // like a breakpoint in chrome debugger
    if (curTemp > max) max = curTemp;
    if (curTemp < min) min = curTemp;
  }
  console.log(max, min);
  return max - min;
};

const amplitudeBug = calcTempAmplitudeBug([3, 5, 1], [9, 4, 5]);
// A) Identify
console.log(amplitudeBug);
*/
