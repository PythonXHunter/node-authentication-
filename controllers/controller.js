// const obj = require('../dummy_data');
const Users = [];
// const users = obj.Users;
const bcrypt = require('bcrypt');

userCreateGet = (req, res) => {
  // console.log(Users);
  res.render("signup");
}

userCreatePost = async (req, res) => {
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
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: id, password: hashedPassword};
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

userLoginPost = async (req, res) => {
  if(!req.body.id || !req.body.password){
    return res.render("login", {
      message: "Please enter both id and password"
    });
  } else {
    for(let i=0;i<Users.length;i++){
      let user = Users[i];
      const isMatch = await bcrypt.compare(req.body.password, user.password);
      
      // console.log("user", user);
      if((user.id !== req.body.id) && (!isMatch)){
        return res.render("login", {
          message: "Please Enter the correct Id and Password"
        });
      } else if(!isMatch){
        return res.render("login", {
          message: "Please Enter the correct Password"
        });
      } else if(user.id !== req.body.id){
        return res.render("login", {
          message: "Please Enter the correct Id"
        });
      } else {
        return res.redirect('/protected_page');
      }
    }
  }
}

userSecurePage = (req, res) => {
  res.render('protected_page', { id: req.session.user.id });
}


module.exports = {
  userCreateGet,
  userCreatePost,
  userLoginGet,
  userLoginPost,
  userSecurePage,
};