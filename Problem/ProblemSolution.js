var readline = require('readline');

var testCase = 1;

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false,
});

rl.on('line', function (line) {
  var parts = line.split(' ');
  var s = parts[0];
  var k = parseInt(parts[1]);
  main(s.split(''), k, testCase);
  testCase++;
});

function flipChar(c) {
  return c === '+' ? '-' : '+';
}

function main(pancakes, k, caseIndex) {
  var numFlips = 0;
  for (var i = 0; i < pancakes.length; i++) {
    if (pancakes[i] == '-') {
      if (i + k <= pancakes.length) {
        for (var j = i; j < i + k; j++) {
          pancakes[j] = flipChar(pancakes[j]);
        }
        numFlips++;
      } else {
        console.log(`Case #${caseIndex}: IMPOSSIBLE`);
        return;
      }
    }
  }
  console.log(`Case #${caseIndex}: ${numFlips}`);
}
