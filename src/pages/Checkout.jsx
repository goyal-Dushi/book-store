import axios from "axios";
import { useEffect, useState } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { Link, useHistory, useLocation, useParams } from "react-router-dom";
import Cards from "../components/cards";

function Checkout() {
  const [bookTotal, setTotal] = useState(0);
  const location = useLocation();
  const [checkedBooks, setCheckedBooks] = useState([]);
  const { id } = useParams();
  const history = useHistory();
  const handleRemove = (index) => {
    let items = [...checkedBooks];
    console.log("Before remove: ", items);
    items.splice(index, 1);
    console.log("After Remove: ", items);
    setCheckedBooks(items);
  };

  const containerStyle = {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  };

  useEffect(() => {
    if (JSON.parse(location?.state?.bookList).length) {
      setCheckedBooks(JSON.parse(location?.state?.bookList));
    }
  }, [location?.state?.bookList]);

  useEffect(() => {
    const total = checkedBooks.reduce((acc, book) => {
      return (acc += book?.price);
    }, 0);
    setTotal(total);
  }, [checkedBooks]);

  const handleCheckout = async () => {
    if (checkedBooks?.length) {
      const newList = checkedBooks?.map((book) => {
        let newStock = book?.stock;
        newStock -= 1;
        return { ...book, stock: newStock, soldOn: new Date().toDateString() };
      });
      const response = await axios
        .put("http://localhost:5000/checkout/" + id, newList)
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error Book Checkout: ", err);
        });
      console.log(response);
      setTotal(0);
      setCheckedBooks([]);
      history.push("/profile/" + id);
    }
    return;
  };

  return (
    <>
      <h5 className={"display-5 mb-3"}> {"Buy & Checkout"} </h5>
      <Container
        fluid={"md"}
        style={{
          ...containerStyle,
          flexDirection: "column",
          height: "100%",
        }}>
        {checkedBooks?.length ? (
          checkedBooks?.map((book, i) => (
            <Card key={i}>
              <Card.Body>
                <Cards type={"book"} bookData={book} />
              </Card.Body>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-evenly",
                }}>
                <Button
                  onClick={() => handleRemove(i)}
                  variant={"outline-danger"}>
                  {"Remove"}
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <h3 className={"display-4 mt-2 mb-2"}> {"No books bought Yet!"} </h3>
        )}
        <footer
          style={{
            width: "100%",
            bottom: "0",
            marginTop: "50px",
            marginBottom: "0px",
          }}>
          <Container style={{ ...containerStyle }} fluid={"md"}>
            <div> {`Total: ${bookTotal}`} </div>
            <Link style={{ textDecoration: "none" }}>
              <Button
                onClick={() => handleCheckout()}
                variant={"outline-success"}>
                {"Buy & Pay"}
              </Button>
            </Link>
          </Container>
        </footer>
      </Container>
    </>
  );
}

export default Checkout;
