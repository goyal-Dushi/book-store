const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const PORT = 5000;
const UserRouter = require("./routes/users.routes");
const BooksRouter = require("./routes/books.routes");
const CheckoutRouter = require("./routes/checkout.routes");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(
  session({
    secret: "somesecrestofBookstore@123%78237dfnisn",
    resave: false,
    saveUninitialized: true,
  })
);

const mongoURI = "mongodb://localhost:27017/bookStore";

const connectDB = async () => {
  await mongoose.connect(
    mongoURI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    },
    () => {
      console.log("Database connnection established!");
    }
  );
};
connectDB();

app.get("/", (req, res) => {
  res.send("Home page, Check console!");
});

app.use("/books", BooksRouter);
app.use("/users", UserRouter);
app.use(CheckoutRouter);

app.listen(PORT, () => {
  console.log("Server started on Port: ", PORT);
});
