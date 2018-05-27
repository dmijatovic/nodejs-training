
const users=[{
  id:1, name: 'Andres', schoolId: 101 
},{
  id:2, name: 'Jessica', schoolId: 111 
},{
  id:3, name: 'Areqwss', schoolId: 333 
}];


const grades=[{
  id:1,
  schoolId: 101,
  grade:86
},{
  id:2,
  schoolId: 101,
  grade:99
},{
  id:3,
  schoolId: 111,
  grade:55
}];

const getUser = ( id )=>{
  return new Promise((res,rej)=>{
    let user = users.find((user)=> user.id === id);
    if(user){
      res(user);
    }else{
      rej("Cannot find user with id...", id);
    }
  });
}

const getGrades = (schoolId) =>{
  return new Promise((res,rej)=>{
    let gra = grades.filter((grade)=>grade.schoolId===schoolId)
    res(gra); 
  });
}

/*
getUser(2).then((u)=>{
  console.log("user...", u)
},(e)=>{
  console.log(e);
});

getGrades(101).then((g)=>{
  console.log("user 101...", g);
});
*/

/* Chaining promises */
const getStatus = (userId) =>{
  let user;
  return getUser(userId).then((tmpUser)=>{
    user = tmpUser;
    return getGrades(user.schoolId);
  }).then((grades)=>{
    let avg = 0;
    if (grades.length > 0){
      let g = grades.map((grade)=> grade.grade);
      avg = g.reduce((a,b)=> a + b / g.length);
    }
    return `${user.name} has a ${avg}% in the class.`
  });
}

// getStatus(2).then((status)=>{
//   console.log("Using promisses...");
//   console.log(status);
// });


// async function
const getStatusAlt = async (userId) =>{
  //throw Error ('This is an error');
  //return "Mike";

  //get user using await 
  const user = await getUser(userId);
  //console.log(user);
  //get grades now using await
  const grades = await getGrades(user.schoolId);

  let avg = 0;
  if (grades.length > 0){
    let g = grades.map((grade)=> grade.grade);
    avg = g.reduce((a,b)=> a + b / g.length);
  }
  return `${user.name} has a ${avg}% in the class.`;
}

//async function returns Promise
getStatusAlt(2).then((status)=>{
  console.log(status);
},(e)=>{
  console.log("error...", e);
})


console.log();