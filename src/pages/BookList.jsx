import axios from "axios";
import { useState, useEffect } from "react";
import {
  Container,
  FormControl,
  InputGroup,
  Navbar,
  Button,
} from "react-bootstrap";
import { Link, useHistory, useParams } from "react-router-dom";
import Cards from "../components/cards";

function BookList() {
  const [books, setBooks] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [search, setSearch] = useState("");
  const { id } = useParams();
  const history = useHistory();

  console.log(books);
  useEffect(() => {
    const getBooks = async () => {
      const resdata = await axios
        .get("http://localhost:5000/books/")
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error Fetching books: ", err);
        });
      setBooks(resdata.data);
    };
    getBooks();
    document.title = "All Books!";
  }, []);

  return (
    <>
      <Navbar bg='light' variant='light'>
        <Container>
          <Navbar.Brand href='#'> {"BookStore"} </Navbar.Brand>
          <Link
            to={{
              pathname: `/cartCheckout/${id}`,
              state: {
                bookList: JSON.stringify(cartItem),
              },
            }}
            style={{ textDecoration: "none" }}>
            <Button variant={"dark"}>
              {`Proceed to checkout : ${cartItem?.length}`}
            </Button>
            <Link to={"/profile/" + id} style={{ textDecoration: "none" }}>
              <Button variant={"outline-primary"}>{"Profile"}</Button>
            </Link>
          </Link>
        </Container>
      </Navbar>

      <h4 className={"display-5"}> {"Search for Your Fav books"} </h4>
      <Container fluid={"md"} className={"mt-3"}>
        <InputGroup className={"mt-2 mb-3"}>
          <FormControl
            placeholder={"Search books here!"}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </InputGroup>

        <Container
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-evenly",
          }}>
          {search.length
            ? books
                ?.filter((book) => book?.name === search)
                ?.forEach((book, i) => (
                  <Cards
                    key={i}
                    type={"book"}
                    bookData={book}
                    addToCart={true}
                    cartItem={cartItem}
                    setCartItem={setCartItem}
                  />
                ))
            : books?.map((book, i) => (
                <Cards
                  key={i}
                  type={"book"}
                  bookData={book}
                  addToCart={true}
                  cartItem={cartItem}
                  setCartItem={setCartItem}
                />
              ))}
        </Container>
      </Container>
    </>
  );
}

export default BookList;
