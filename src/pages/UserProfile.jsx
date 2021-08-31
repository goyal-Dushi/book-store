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
  }, [id]);

  console.log("userProfile: ", userProfile);

  useEffect(() => {
    if (modalOpen.type === "add" && !modalOpen.status) {
      const getBooks = async () => {
        const response = await axios
          .get("http://localhost:5000/books/" + id)
          .then((res) => res.data)
          .catch((err) => {
            console.log("Error getting books: ", err);
          });
        setBooksBySeller(response.data);
      };
      getBooks();
    }
  }, [modalOpen]);

  const getListedBooks = async () => {
    const response = await axios
      .get("http://localhost:5000/books/" + userProfile?._id)
      .then((res) => res.data)
      .catch((err) => {
        console.log("Error getting seller books: ", err);
      });
    return response;
  };

  const editBook = (book) => {
    setBookToEdit(book);
    setModalOpen({ status: true, type: "edit" });
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

  console.log(modalOpen);

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
        <Button
          onClick={() => setModalOpen({ type: "add", status: true })}
          variant={"outline-success"}>
          {"Add Books"}
        </Button>
      ) : null}
      {modalOpen.status ? (
        <Modal className={"p-3"} show={modalOpen.status}>
          <Modal.Header>
            {modalOpen.type === "edit" ? "Edit Book" : "Add Book"}{" "}
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
        {booksBySeller?.length ? (
          <>
            <h3 className={"display-5 mt-2 mb-3"}> {"Books Listed By You"} </h3>
            <Container
              fluid={"md"}
              style={{ display: "flex", justifyContent: "space-evenly" }}>
              {booksBySeller?.forEach((book, i) => (
                <Cards
                  key={i}
                  type={"bookSold"}
                  name={book?.name}
                  sellerName={book?.sellerName}
                  sellerAddress={book?.sellerAddress}
                  address={"Not yet Sold"}
                  price={book?.price}
                  soldOn={"Not Yet sold"}
                />
              ))}
            </Container>
          </>
        ) : null}
        {userProfile?.soldList?.length ? (
          <>
            <h3 className={"display-5 mb-2"}> {"Books Sold"} </h3>
            <Container
              fluid={"md"}
              style={{ display: "flex", justifyContent: "space-evenly" }}>
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
        {userProfile?.boughtList?.length ? (
          <>
            <h3 className={"display-5 mb-2 mt-3"}> {"Books Bought"} </h3>
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
          </>
        ) : (
          <h3 className={"display-5 mb-2 mt-3"}> {"No Books Bought yet!"} </h3>
        )}
      </Container>
      <Container className={"mt-2"} fluid={"md"}>
        {getListedBooks().length
          ? getListedBooks()?.forEach((book, i) => (
              <Card key={i} style={{ width: "fit-content" }}>
                <Card.Body>
                  <Cards
                    type={"book"}
                    name={book?.name}
                    sellerName={book?.sellerName}
                    sellerAddress={book?.sellerAddress}
                    price={book?.price}
                    addToCart={false}
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
            ))
          : null}
      </Container>
      <Link to={"/booklist/" + id} style={{ textDecoration: "none" }}>
        <Button variant={"outline-primary"}>{"Checkout Products"}</Button>
      </Link>
    </>
  );
}

export default ProfilePage;
