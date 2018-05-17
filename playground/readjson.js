
const fs = require('fs');

const json = fs.readFileSync('note.json');

const note = JSON.parse(json);

console.log(typeof(note));
console.log(note.title);