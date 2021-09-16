import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Button, Card, Container, Modal, ModalBody } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import Cards from "../components/cards";
import BookForm from "../components/bookForms";
import { AlertContext } from "../components/contexts/alertContext";
import { UserDetailsContext } from "../components/contexts/userContext";

const containerStyle = {
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  flexWrap: "wrap",
};

function ProfilePage() {
  const { setAlertState } = useContext(AlertContext);
  const { userData, setUserData } = useContext(UserDetailsContext);
  const [booksBySeller, setBooksBySeller] = useState([]);
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState({
    status: false,
    type: "",
    data: {},
  });
  console.log("User profile: ", userData);

  useEffect(() => {
    const getListedBooks = async () => {
      const response = await axios
        .get("http://localhost:5000/books/" + userData?._id)
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error getting seller books: ", err);
        });
      console.log("get Listed books: ", response);
      if (response?.data?.length) {
        setBooksBySeller([...response?.data]);
      }
    };
    getListedBooks();
  }, [userData]);

  useEffect(() => {
    const getUserProfile = async () => {
      const userInfo = await axios
        .get("http://localhost:5000/users/login", { withCredentials: true })
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error: ", err);
        });
      if (userInfo?.loggedIn) {
        setUserData(userInfo?.data);
      } else {
        history.push("/login");
      }
    };
    getUserProfile();
  }, []);

  const deleteBook = async (book) => {
    await axios
      .delete("http://localhost:5000/books/delete/" + book?._id)
      .then((res) => res.data)
      .catch((err) => {
        console.log("Error Deleting: ", err);
      });
    let items = [...booksBySeller];
    const index = items.findIndex((item) => item?._id === book?._id);
    items.splice(index, 1);
    setBooksBySeller([...items]);
    setAlertState({
      show: true,
      type: "info",
      msg: "Deleted Book Successfully!",
    });
  };
  return (
    <>
      {userData._id ? (
        <>
          <h4 className={"display-4 mb-3"}>{"Welcome " + userData?.name}</h4>
          <Cards
            type={"profile"}
            name={userData?.name}
            email={userData?.email}
            address={userData?.address}
          />
          {userData?.isSeller ? (
            <Button
              onClick={() => setModalOpen({ type: "add", status: true })}
              variant={"outline-success"}>
              {"Add Books"}
            </Button>
          ) : null}
          {modalOpen.status ? (
            <Modal className={"p-3"} show={modalOpen.status}>
              <Modal.Header>
                {modalOpen.type === "edit" ? "Edit Book" : "Add Book"}
              </Modal.Header>
              <ModalBody>
                {modalOpen.type === "edit" ? (
                  <BookForm
                    type={modalOpen.type}
                    setPopup={setModalOpen}
                    bookData={modalOpen.data}
                    booksBySeller={booksBySeller}
                    setBooks={setBooksBySeller}
                  />
                ) : (
                  <BookForm
                    type={modalOpen.type}
                    setPopup={setModalOpen}
                    sellerName={userData?.name}
                    booksBySeller={booksBySeller}
                    setBooks={setBooksBySeller}
                    sellerAddress={userData?.address}
                    sellerID={userData?._id}
                  />
                )}
              </ModalBody>
            </Modal>
          ) : null}
          {userData?.isSeller ? (
            <Container fluid={"md"} className={"mt-3"}>
              {userData?.soldList?.length ? (
                <>
                  <h3 className={"display-5 mb-2"}> {"Books Sold"} </h3>
                  <Container fluid={"md"} style={{ ...containerStyle }}>
                    {userData?.soldList?.map((book, i) => (
                      <Cards
                        key={i}
                        type={"bookSold"}
                        name={book?.name}
                        sellerName={book?.sellerName}
                        sellerAddress={book?.sellerAddress}
                        address={book?.address}
                        buyerName={book?.boughtBy}
                        price={book?.price}
                        soldOn={book?.soldOn}
                      />
                    ))}
                  </Container>
                </>
              ) : (
                <h3 className={"display-5 mb-2"}> {"No Books Sold yet!"} </h3>
              )}
            </Container>
          ) : null}
          {userData?.isSeller ? null : (
            <Container>
              {userData?.boughtList?.length ? (
                <>
                  <h3 className={"display-5 mb-2 mt-3"}> {"Books Bought"} </h3>
                  <Container fluid={"md"} style={{ ...containerStyle }}>
                    {userData?.boughtList?.map((book, i) => (
                      <Cards
                        key={i}
                        type={"bookBought"}
                        name={book?.name}
                        sellerName={book?.sellerName}
                        sellerAddress={book?.sellerAddress}
                        address={book?.address}
                        price={book?.price}
                        soldOn={book?.soldOn}
                      />
                    ))}
                  </Container>
                </>
              ) : (
                <h3 className={"display-5 mb-2 mt-3"}>
                  {"No Books Bought yet!"}
                </h3>
              )}
            </Container>
          )}
          {userData?.isSeller ? (
            <Container className={"mt-2"} fluid={"md"}>
              {booksBySeller?.length ? (
                <>
                  <h3 className={"display-5 mb-2 mt-3"}>
                    {"Books Listed By You"}
                  </h3>
                  <Container fluid={"md"} style={{ ...containerStyle }}>
                    {booksBySeller?.map((book, i) => (
                      <Card key={i} style={{ width: "fit-content" }}>
                        <Card.Body>
                          <Cards
                            type={"bookListed"}
                            name={book?.name}
                            sellerName={book?.sellerName}
                            sellerAddress={book?.sellerAddress}
                            price={book?.price}
                            stock={book?.stock}
                          />
                        </Card.Body>
                        <Card.Footer>
                          <Button
                            onClick={() =>
                              setModalOpen({
                                status: true,
                                type: "edit",
                                data: book,
                              })
                            }
                            variant={"warning"}>
                            {"Edit"}
                          </Button>
                          <Button
                            onClick={() => deleteBook(book)}
                            className={"ml-2"}
                            variant={"outline-danger"}>
                            {"Delete"}
                          </Button>
                        </Card.Footer>
                      </Card>
                    ))}
                  </Container>
                </>
              ) : (
                <h3 className={"display-5 mb-2 mt-3"}>
                  {"No Books Listed By You!"}
                </h3>
              )}
            </Container>
          ) : null}
          <Link to={"/booklist"} style={{ textDecoration: "none" }}>
            <Button variant={"outline-primary"}>{"Checkout Products"}</Button>
          </Link>
        </>
      ) : null}
    </>
  );
}

export default ProfilePage;
