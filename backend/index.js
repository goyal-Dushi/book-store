const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 5000;
const UserRouter = require("./routes/users.routes");
const BooksRouter = require("./routes/books.routes");
const CheckoutRouter = require("./routes/checkout.routes");

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/bookStore", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;

db.once("open", () => {
  console.log("Database connection established!");
});

app.get("/", (req, res) => {
  res.send("Home page, Check console!");
});

app.use("/books", BooksRouter);
app.use("/users", UserRouter);
app.use(CheckoutRouter);

app.listen(PORT, () => {
  console.log("Server started on Port: ", PORT);
});
