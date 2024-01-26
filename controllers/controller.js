// const obj = require('../dummy_data');
const Users = [];
// const users = obj.Users;

userCreateGet = (req, res) => {
  console.log(Users);
  res.render("signup");
}

userCreatePost = (req, res) => {
  if(!req.body.id || !req.body.password){
    return res.status(400).json({ message: "Invalid details" });
  } else {
    for(let i=0;i<Users.length;i++){
      let user = Users[i];
      if(req.body.id === user.id){
        return res.render('signup', {
          message: "User Already Exists! Login or choose another user id"
        });
      }
    }
    const { id, password } = req.body;
    const newUser = { id: id, password: password};
    Users.push(newUser);
    req.session.user = newUser;
    console.log(req.session);
    res.redirect('/login');
  }
}

userLoginGet = (req, res) => {
  console.log(Users);
  res.render("login");
}

userLoginPost = (req, res) => {
  if(!req.body.id || !req.body.password){
    return res.render("login", {
      message: "Please enter both id and password"
    });
  } else {
    Users.forEach(user => {
      if(user.id !== req.body.id && user.password !== req.body.password){
        req.session.user = user;
        return res.render('login', {
          message: "Invalid credentials!"
        });
      }
    });
  }
  res.redirect('/protected_page');
}

userSecurePage = (req, res) => {
  res.render('protected_page', { id: req.session.user.id });
}

userLoginAgain = (req, res) => {
  res.render('signup_again');
}

module.exports = {
  userCreateGet,
  userCreatePost,
  userLoginGet,
  userLoginPost,
  userSecurePage,
  userLoginAgain,
};