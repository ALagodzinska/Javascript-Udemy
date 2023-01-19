'use strict';
// Challenge #1

// Problem:
/*
Given an array of forecasted maximum temperatures, the thermometer displays a 
string with the given temperatures. Example: [17, 21, 23] will print "... 17ºC in 1 
days ... 21ºC in 2 days ... 23ºC in 3 days ..."
Your tasks:
1. Create a function 'printForecast' which takes in an array 'arr' and logs a 
string like the above to the console. Try it with both test datasets.
2. Use the problem-solving framework: Understand the problem and break it up 
into sub-problems!
*/
// 1) Understand the problem
// - How to display each day temperature? - togrther in one line
// - Array transformed to string, separeted by 3 dots
// - What is the X days? - index + 1

// 2) Breaking into Sub-problems
// Transform array into a string
// Transform each element to string with ºC
// String need to contain day (index + 1)
// ... between elements, before and in the end of the string

const temp1 = [17, 21, 23];
const temp2 = [12, 5, -5, 0, 4];

const printForecast = function (arr) {
  let forecast = '... ';
  for (let i = 0; i < arr.length; i++) {
    forecast += `${arr[i]}ºC in ${i + 1} days ... `;
  }
  console.log(forecast);
};

printForecast(temp1);
printForecast(temp2);
