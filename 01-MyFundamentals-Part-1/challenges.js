// Coding Challenge #1 && Coding Challenge #2
/*
const markMass = 78;
const markHeight = 1.69;
const johnMass = 92;
const johnHeight = 1.95;

// const markMass = 95;
// const markHeight = 1.88;
// const johnMass = 85;
// const johnHeight = 1.76;

console.log(`Mark's mass: ${markMass}, height: ${markHeight}
John's mass: ${johnMass}, height: ${johnHeight}`);

const markBMI = CountBMI(markMass, markHeight);
const johnBMI = johnMass / johnHeight ** 2;

if (markBMI > johnBMI) {
    console.log(`Mark's
BMI (${markBMI}) is higher than John's (${johnBMI})! 👨🏽`);
} else {
    console.log(`John's (${johnBMI}) is higher than Mark's
BMI (${markBMI})! 🧒🏾`);
}

function CountBMI(mass, height) {
    return mass / height ** 2;
}
*/
// Coding Challenge #3
/*
const dolphinScoreOne = 96;
const dolphinScoreTwo = 108;
const dolphinScoreThree = 89;

const koalasScoreOne = 88;
const koalasScoreTwo = 91;
const koalasScoreThree = 110;

//Bonus 1 Data
// const dolphinScoreOne = 97;
// const dolphinScoreTwo = 112;
// const dolphinScoreThree = 101;

// const koalasScoreOne = 109;
// const koalasScoreTwo = 95;
// const koalasScoreThree = 123;

//Bonus 2 Data
// const dolphinScoreOne = 97;
// const dolphinScoreTwo = 112;
// const dolphinScoreThree = 101;

// const koalasScoreOne = 109;
// const koalasScoreTwo = 95;
// const koalasScoreThree = 106;

const dolphinAverageScore = (dolphinScoreOne + dolphinScoreTwo + dolphinScoreThree) / 3;
const koalasAverageScore = (koalasScoreOne + koalasScoreTwo + koalasScoreThree) / 3;
console.log(dolphinAverageScore, koalasAverageScore);
// My version
if (dolphinAverageScore >= 100 || koalasAverageScore >= 100) {
    if (dolphinAverageScore > koalasAverageScore) {
        console.log(`Dolphins won with average score ${dolphinAverageScore}! 🏆🐬`);
    } else if (koalasAverageScore > dolphinAverageScore) {
        console.log(`Koalas won with average score ${koalasAverageScore}! 🏆🐨`);
    } else {
        console.log("Draw! 🙀");
    }
} else {
    console.log("No Team win a trophy! 😨");
}
// Course version
if (dolphinAverageScore > koalasAverageScore && dolphinAverageScore >= 100) {
    console.log(`Dolphins won with average score ${dolphinAverageScore}! 🏆🐬`);
} else if (koalasAverageScore > dolphinAverageScore && koalasAverageScore >= 100) {
    console.log(`Koalas won with average score ${koalasAverageScore}! 🏆🐨`);
} else if (dolphinAverageScore === koalasAverageScore &&
    dolphinAverageScore >= 100 && koalasAverageScore >= 100) {
    console.log("Draw! 🙀");
} else {
    console.log("No Team win a trophy! 😨");
}
*/
// Coding Challenge #4
const bill = 275;
// const bill = 40;
// const bill = 430;

let tip = bill >= 50 && bill <= 300 ? bill * 0.15 : bill * 0.2;
console.log(`The bill was ${bill}, the tip was ${tip}, and the total value ${bill + tip}`);