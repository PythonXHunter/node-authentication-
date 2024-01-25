const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const session = require('express-session');
const cookieparser = require('cookie-parser');

app.set("view engine", "pug");
app.set("views", "./views");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());
app.use(cookieparser());
app.use(session({
  secret: "Your secret key",
  resave: false,
  saveUninitialized: false
}));

const Users = [];

app.get('/signup', (req, res) => {
  res.render("signup");
});

app.post('/signup', (req, res) => {
  if(!req.body.id || !req.body.password){
    res.status(400).json({ message: "Invalid details" });
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
    // console.log(req.session);
    res.redirect('/login');
  }
});

function checkSignIn(req, res, next){
  if(req.session.user){
    next();
  } else {
    const err = new Error("Not logged in!");
    next(err);
  }
}

app.get('/protected_page', checkSignIn, (req, res) => {
  res.render('protected_page', { id: req.session.user.id });
});

app.get('/login', (req, res) => {
  console.log(Users);
  res.render("login");
});

app.post('/login', (req, res) => {
  if(!req.body.id || !req.body.password){
    res.render("login", {
      message: "Please enter both id and password"
    });
  } else {
    Users.forEach(user => {
      if(user.id !== req.body.id && user.password !== req.body.password){
        req.session.user = user;
        res.render('login', {
          message: "Invalid credentials!"
        });
      }
    });
  }
  res.redirect('/protected_page');
});

app.get('/signup_again', (req, res) => {
  res.render('signup_again');
});

const port = 3000;

app.listen(port, console.log("Server is listening..."));