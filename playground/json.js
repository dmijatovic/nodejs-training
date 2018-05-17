
const obj = {
  name: "Dusan Mijatovic"
}

//JSON string
const json=`{
  "name":"Andrew",
  "age": 25
}`

// parse json
const person = JSON.parse(json);

console.log(typeof(person));

