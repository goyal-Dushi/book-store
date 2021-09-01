import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Card, Container, Modal, ModalBody } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import Cards from "../components/cards";
import BookForm from "../components/bookForms";

function ProfilePage() {
  const [userProfile, setUserProfile] = useState({});
  const { id } = useParams();
  const [bookToEdit, setBookToEdit] = useState({});
  const [booksBySeller, setBooksBySeller] = useState([]);
  const [modalOpen, setModalOpen] = useState({ status: false, type: "" });

  console.log("userProfile: ", userProfile);

  const getListedBooks = async () => {
    const response = await axios
      .get("http://localhost:5000/books/" + id)
      .then((res) => res.data.data)
      .catch((err) => {
        console.log("Error getting seller books: ", err);
      });
    console.log("GET LISTED BOOKS: ", response);
    setBooksBySeller(response);
  };

  useEffect(() => {
    const getUser = async () => {
      const userData = await axios
        .get("http://localhost:5000/users/" + id)
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error fetching user: ", err);
        });
      console.log("Inside api: ", userData.data);
      setUserProfile(userData.data);
    };
    getUser();
    // getListedBooks();
  }, [id]);

  useEffect(() => {
    if (!modalOpen.status) {
      getListedBooks();
    }
  }, [modalOpen.status]);

  const containerStyle = {
    display: "flex",
    justifyContent: "space-evenly",
    alignItems: "center",
  };

  const addBook = () => {
    setModalOpen({ type: "add", status: true });
    getListedBooks();
  };

  const editBook = (book) => {
    setBookToEdit(book);
    setModalOpen({ status: true, type: "edit" });
    getListedBooks();
  };

  const deleteBook = async (book) => {
    const response = await axios
      .delete("http://localhost:5000/books/delete/" + book?._id)
      .then((res) => res.data)
      .catch((err) => {
        console.log("Error Deleting: ", err);
      });
    console.log(response);
    getListedBooks();
  };
  return (
    <>
      <h4 className={"display-4 mb-3"}> {"Welcome " + userProfile?.name} </h4>
      <Cards
        type={"profile"}
        name={userProfile?.name}
        email={userProfile?.email}
        address={userProfile?.address}
      />
      {userProfile?.isSeller ? (
        <Button onClick={() => addBook()} variant={"outline-success"}>
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
                bookData={bookToEdit}
              />
            ) : (
              <BookForm
                type={modalOpen.type}
                setPopup={setModalOpen}
                sellerName={userProfile?.name}
                sellerAddress={userProfile?.address}
                sellerID={userProfile?._id}
              />
            )}
          </ModalBody>
        </Modal>
      ) : null}
      <Container fluid={"md"} className={"mt-3"}>
        {userProfile?.soldList?.length ? (
          <>
            <h3 className={"display-5 mb-2"}> {"Books Sold"} </h3>
            <Container fluid={"md"} style={{ ...containerStyle }}>
              {userProfile?.soldList?.map((book, i) => (
                <Cards
                  key={i}
                  type={"bookSold"}
                  name={book?.name}
                  sellerName={book?.sellerName}
                  sellerAddress={book?.sellerAddress}
                  address={"TO be added"}
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
      <Container>
        {userProfile?.boughtList?.length ? (
          <>
            <h3 className={"display-5 mb-2 mt-3"}> {"Books Bought"} </h3>
            <Container fluid={"md"} style={{ ...containerStyle }}>
              {userProfile?.boughtList?.map((book, i) => (
                <Cards
                  key={i}
                  type={"bookBought"}
                  name={book?.name}
                  sellerName={book?.sellerName}
                  sellerAddress={book?.sellerAddress}
                  address={userProfile?.address}
                  price={book?.price}
                  soldOn={book?.soldOn}
                />
              ))}
            </Container>
          </>
        ) : (
          <h3 className={"display-5 mb-2 mt-3"}> {"No Books Bought yet!"} </h3>
        )}
      </Container>
      <Container className={"mt-2"} fluid={"md"}>
        {booksBySeller?.length ? (
          <>
            <h3 className={"display-5 mb-2 mt-3"}> {"Books Listed By You"} </h3>
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
                    <Button onClick={() => editBook(book)} variant={"warning"}>
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
          <h3 className={"display-5 mb-2 mt-3"}>{"No Books Listed By You!"}</h3>
        )}
      </Container>
      <Link to={"/booklist/" + id} style={{ textDecoration: "none" }}>
        <Button variant={"outline-primary"}>{"Checkout Products"}</Button>
      </Link>
    </>
  );
}

export default ProfilePage;
