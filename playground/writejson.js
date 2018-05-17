
const fs = require('fs');

const note={
  title: "This is title",
  body:"This is body of the message"
}

fs.writeFileSync("jsonfile.json", JSON.stringify(note));

console.log("Done!");