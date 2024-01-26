const bcrypt = require('bcrypt');

const saltRounds = 10;

const password = "aryan";

const giveHash = async(password) => {
  try{
    return await bcrypt.hash(password, saltRounds);
  } catch(err){
    console.error(err);
  }
}

const comparePassword = async(password, hash) => {
  try {
    return await bcrypt.compare(password, hash);
  } catch(err) {
    console.error(err);
  }
}

const authenticateUser = async(password) => {
  try{
    const hash = await giveHash(password);
    const compare = await comparePassword(password, hash);
    return compare;
  } catch(err){
    console.error(err);
  }
}

authenticateUser(password)
  .then(result => {
    console.log(result);
  })
  .catch(err => console.error(err));

// console.log(hash);
// const getSomething = bcrypt.genSalt(saltRounds, (err, salt) => {
//   bcrypt.hash(password, salt, (err, hash) => {
//     // console.log(hash);
//     return hash;
//   });
// });

// getSomething;
// console.log(getSomething);
// console.log(Users);

