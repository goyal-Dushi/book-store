require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const PORT = 5000;
const middlewares = require('./middlewares/index');
const UserRouter = require('./routes/users.routes');
const userController = require('./controllers/user.controller');
const BooksRouter = require('./routes/books.routes');
const CheckoutRouter = require('./routes/checkout.routes');

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(
  session({
    secret: 'somesecrestofBookstore@123%78237dfnisn',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

const mongoURI = 'mongodb://127.0.0.1:27017/bookStore';

(() => {
  try {
    mongoose.connect(
      mongoURI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {
        console.log('Database connnection established!');
      }
    );
  } catch (err) {
    console.log('Database connection failed: ', err);
  }
})();

const db = mongoose.connection;
db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});
db.once('open', () => {
  console.log('Database connection established!');
});

app.route('/users/register').post(userController.user_register);
app.route('/users/login').post(userController.user_login);

app.use(middlewares.apiCheckMiddleware);

app.use('/books', BooksRouter);
app.use('/users', UserRouter);
app.use(CheckoutRouter);

app.use(middlewares.errorMiddleware);

app.listen(PORT, () => {
  console.log('Server started on Port: ', PORT);
});
