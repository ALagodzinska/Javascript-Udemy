// Challenge #1
const game = {
  team1: 'Bayern Munich',
  team2: 'Borrussia Dortmund',
  players: [
    [
      'Neuer',
      'Pavard',
      'Martinez',
      'Alaba',
      'Davies',
      'Kimmich',
      'Goretzka',
      'Coman',
      'Muller',
      'Gnarby',
      'Lewandowski',
    ],
    [
      'Burki',
      'Schulz',
      'Hummels',
      'Akanji',
      'Hakimi',
      'Weigl',
      'Witsel',
      'Hazard',
      'Brandt',
      'Sancho',
      'Gotze',
    ],
  ],
  score: '4:0',
  scored: ['Lewandowski', 'Gnarby', 'Lewandowski', 'Hummels'],
  date: 'Nov 9th, 2037',
  odds: {
    team1: 1.33,
    x: 3.25,
    team2: 6.5,
  },
};
// 1) array deconstructuring
console.log('____Challenge 1____');
const [players1, players2] = game.players;
console.log('-----1-----');
console.log(players1);
console.log(players2);
// 2) rest syntax
const [gk, ...fieldPlayers] = players1;
console.log('-----2-----');
console.log(gk);
console.log(fieldPlayers);
// 3) spread operator
const allPlayers = [...players1, ...players2];
console.log('-----3-----');
console.log(allPlayers);
// 4) unpacking array and adding new ones
const players1Final = [...players1, 'Thiago', 'Coutinho', 'Perisic'];
console.log('-----4-----');
console.log(players1Final);
// 5) destructuring object
const { team1, x: draw, team2 } = game.odds;
// nested destructuring
const {
  odds: { team1: team1Nest, x: drawNest, team2: team2Nest },
} = game;
console.log('-----5-----');
console.log(team1, draw, team2);
console.log(team1Nest, drawNest, team2Nest);
// 6)
const printGoals = function (...players) {
  console.log(`${players.length} goals were scored!`);
  for (let i = 0; i < players.length; i++) {
    console.log(players[i]);
  }
};
console.log('-----6-----');
printGoals('Davies', 'Muller', 'Lewandowski', 'Kimmich');
printGoals('Davies', 'Muller');
// to sptread array into separate variables
printGoals(...game.scored);
// 7)
console.log('-----7-----');
team1 < team2 && console.log('Team 1 is more likely to win!');
team1 > team2 && console.log('Team 2 is more likely to win!');

// Challenge #2
// 1)
console.log('____Challenge 2____');
for (const [i, player] of game.scored.entries())
  console.log(`Goal ${i + 1}: ${player}`);
// 2)
let average = 0;
const odds = Object.values(game.odds);
console.log(odds);
for (const score of odds) average += score;
average /= odds.length;
console.log(`Average odd: ${average}`);
// 3)
console.log(game.odds);
for (const [key, value] of Object.entries(game.odds)) {
  console.log(
    `Odd of ${key !== 'x' ? `victory ${game[key]} ` : 'draw'}: ${value}`
  );
}
// 4)
console.log('____________BONUS______________');
const scorers = {};
for (const value of game.scored) {
  if (!scorers[value]) {
    scorers[value] = 1;
  } else {
    scorers[value] += 1;
  }
}

const scorers2 = {};
for (const player of game.scored) {
  scorers2[player] ? scorers2[player]++ : (scorers2[player] = 1);
}

console.log(scorers);

// Challenge #3
console.log('____Challenge 3____');

const gameEvents = new Map([
  [17, '⚽ GOAL'],
  [36, '� Substitution'],
  [47, '⚽ GOAL'],
  [61, '� Substitution'],
  [64, '� Yellow card'],
  [69, '� Red card'],
  [70, '� Substitution'],
  [72, '� Substitution'],
  [76, '⚽ GOAL'],
  [80, '⚽ GOAL'],
  [92, '� Yellow card'],
]);

// 1)
const events = [...new Set(gameEvents.values())];
console.log(events);
// 2)
gameEvents.delete(64);
console.log(gameEvents);
// 3)
let x = 0;
let averg = 0;
for (let event of gameEvents.keys()) {
  event = event > 90 ? 90 : event;
  averg += event - x;
  x = event;
}
averg = averg / gameEvents.size;
// averg = Math.round(averg / gameEvents.size);
console.log(averg);
console.log(`An event happened, on average, every ${averg} minutes`);

const time = [...gameEvents.keys()].pop(); // returns last deleted element from array
console.log(time);
console.log(
  `An event happened, on average, every ${time / gameEvents.size} minutes`
);
// 4)
for (const [min, event] of gameEvents) {
  console.log(`[${min > 45 ? 'SECOND' : 'FIRST'} HALF] ${min}: ${event}`);
}

// Challenge #4
console.log('____Challenge 4____');

document.body.append(document.createElement('textarea'));
document.body.append(document.createElement('button'));

document.querySelector('button').addEventListener('click', function () {
  // get data from textarea
  const data = document.querySelector('textarea').value;
  console.log(data);
  // devide data into array
  const dataArr = data.split('\n');
  console.log(dataArr);
  //remove spaces before and after, all to lowercase and check if has _
  for (const [i, str] of dataArr.entries()) {
    if (!str.includes('_')) continue;
    // split by _
    const [firstWord, secondWord] = str.trim().toLowerCase().split('_');
    const finalStr =
      firstWord +
      secondWord.replace(secondWord[0], secondWord[0].toUpperCase());
    console.log(
      // if we add just empty spaces can not specify
      finalStr.padEnd(20),
      '✅'.repeat(i + 1)
    );
  }
});
