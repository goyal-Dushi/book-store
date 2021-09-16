import axios from "axios";
import { useEffect, useState, useContext } from "react";
import { Card, Button, Container } from "react-bootstrap";
import { useHistory, useLocation } from "react-router-dom";
import Cards from "../components/cards";
import { AlertContext } from "../components/contexts/alertContext";
import { UserDetailsContext } from "../components/contexts/userContext";

const flexEvenlyCenter = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-evenly",
};

const footerStyle = {
  width: "100%",
  marginTop: "50px",
};

function Checkout() {
  const location = useLocation();
  const [booksDetails, setBooksDetails] = useState({ total: 0, list: [] });
  const { setAlertState } = useContext(AlertContext);
  const { userData, setUserData } = useContext(UserDetailsContext);
  const history = useHistory();

  // removing books from list
  const handleRemove = (index) => {
    let items = [...booksDetails.list];
    items.splice(index, 1);
    const total = items.reduce((acc, book) => {
      return (acc += book?.price);
    }, 0);
    setBooksDetails({ total: total, list: [...items] });
  };

  useEffect(() => {
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

  useEffect(() => {
    const books = JSON.parse(location?.state?.bookList);
    if (books?.length) {
      const total = books.reduce((acc, book) => {
        return (acc += book?.price);
      }, 0);
      setBooksDetails({
        total: total,
        list: [...books],
      });
    }
  }, [location?.state?.bookList]);

  const handleCheckout = async () => {
    if (booksDetails.list?.length) {
      const newList = booksDetails.list?.map((book) => {
        let newStock = book?.stock;
        newStock -= 1;
        return {
          ...book,
          stock: newStock,
          soldOn: new Date().toDateString(),
          boughtBy: userData?.name,
          address: userData?.address,
        };
      });
      const response = await axios
        .put("http://localhost:5000/checkout/" + userData?._id, newList, {
          withCredentials: true,
        })
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error Book Checkout: ", err);
        });
      setBooksDetails({ total: 0, list: "" });
      setAlertState({ type: "success", show: true, msg: response?.msg });
      history.replace("/profile");
    }
    return;
  };

  return (
    <>
      {userData?._id ? (
        <>
          <h5 className={"display-5 mb-3"}> {"Buy & Checkout"} </h5>
          <Container
            fluid={"md"}
            style={{ ...flexEvenlyCenter, flexWrap: "wrap" }}>
            {booksDetails?.list?.length ? (
              booksDetails?.list?.map((book, i) => (
                <Card key={i}>
                  <Card.Body>
                    <Cards type={"book"} bookData={book} />
                  </Card.Body>
                  <div style={{ ...flexEvenlyCenter }}>
                    <Button
                      onClick={() => handleRemove(i)}
                      variant={"outline-danger"}>
                      {"Remove"}
                    </Button>
                  </div>
                </Card>
              ))
            ) : (
              <h3 className={"display-4 mt-2 mb-2"}>
                {"No books bought Yet!"}
              </h3>
            )}
            <footer style={{ ...footerStyle }}>
              {booksDetails?.list?.length ? (
                <Container style={{ ...flexEvenlyCenter }} fluid={"md"}>
                  <div> {`Total: ${booksDetails.total}`} </div>
                  <Button
                    onClick={() => handleCheckout()}
                    variant={"outline-success"}>
                    {"Buy & Pay"}
                  </Button>
                </Container>
              ) : null}
            </footer>
          </Container>
        </>
      ) : null}
    </>
  );
}

export default Checkout;
