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

app.get('/signup', (req, res, next) => {
  res.render("signup");
});

app.post('/signup', (req, res, next) => {
  if(!req.body.id || !req.body.password){
    res.status(400).send("Invalid details!");
  } else {
    Users.filter(user => {
      if(user.id === req.body.id){
        res.render("signup", {
          message: "User Already Exists! Login or choose another user id"
        });
      }
    });
    const newUser = { id: req.body.id, password: req.body.password };
    Users.push(newUser);
    req.session.user = newUser;
    res.redirect('/protected_page');
  }
});

const port = 3000;

app.listen(port, console.log("Server is listening..."));