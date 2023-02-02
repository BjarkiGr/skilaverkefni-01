export function parse(input) {
  const fs = require('fs');

  fs.readFile('./data/islenska.csv', 'utf8', function (err, data) {
    console.log(data);
  });

}
