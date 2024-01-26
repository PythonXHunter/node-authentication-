const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const upload = multer();
const session = require('express-session');
const cookieparser = require('cookie-parser');
const userRouter = require('./routes/route');
const userLogin = require('./middleware/checkLoginIn');

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

app.use('/', userRouter);
app.use('/protected_page', userLogin.checkLoginIn);

const port = 3000;

app.listen(port, console.log("Server is listening..."));