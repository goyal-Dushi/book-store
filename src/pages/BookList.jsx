import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { Container, FormControl, InputGroup, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import Cards from "../components/cards";
import { UserDetailsContext } from "../components/contexts/userContext";

function BookList() {
  const [books, setBooks] = useState([]);
  const [cartItem, setCartItem] = useState([]);
  const [search, setSearch] = useState("");
  const { userData, setUserData } = useContext(UserDetailsContext);

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
    const getUserProfile = async () => {
      const userInfo = await axios
        .get("http://localhost:5000/users/login", { withCredentials: true })
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error: ", err);
        });
      setUserData(userInfo?.data);
    };
    getUserProfile();
  }, []);

  const searchBook = (books) => {
    const response = books
      ?.filter(
        (book) => book.name.toLowerCase().search(search.toLowerCase()) !== -1
      )
      .map((book, i) => (
        <Cards
          key={i}
          type={"book"}
          bookData={book}
          addToCart={true}
          cartItem={cartItem}
          setCartItem={setCartItem}
        />
      ));
    return response;
  };

  return (
    <>
      {userData?._id ? (
        <>
          <Container
            className={"d-flex justify-content-between"}
            style={{ flexWrap: "wrap" }}
            fluid={"md"}>
            <h4 className={"display-5"}> {"Search for Your Fav books"} </h4>
            <Link
              to={{
                pathname: `/cartCheckout`,
                state: {
                  bookList: JSON.stringify(cartItem),
                },
              }}
              style={{ textDecoration: "none" }}>
              <Button variant={"dark"}>
                {`Proceed to checkout : ${cartItem?.length}`}
              </Button>
            </Link>
          </Container>
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
                flexWrap: "wrap",
              }}>
              {search.length
                ? searchBook(books)
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
      ) : null}
    </>
  );
}

export default BookList;
