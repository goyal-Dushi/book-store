import { useContext, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BooksAPI } from '../../api';
import BookListedCard from '../cards/BookListedCard';
import BookSoldCard from '../cards/BookSoldCard';
import ProfileCard from '../cards/ProfileCard';
import { AlertContext } from '../../contexts';
import EditBookForm from '../bookForms/EditBookForm';
import AddBookForm from '../bookForms/AddBookForm';

function SellerProfile(props) {
  const { sellerData, inventoryData } = props;
  const { username, _id } = sellerData;
  const { bookList, soldList } = inventoryData;
  const [booksBySeller, setBooksBySeller] = useState(bookList);
  const { alertSuccess, alertError } = useContext(AlertContext);
  const [editBookData, setEditBookData] = useState(null);
  const [showAddBookDialog, setShowAddBookDialog] = useState(false);

  if (!sellerData || !_id) {
    return null;
  }

  const handleAddBook = () => {
    setShowAddBookDialog((prev) => {
      return !prev;
    });
  };

  const onBookAddSubmit = async (book) => {
    try {
      const response = await BooksAPI.addBook(book, _id);
      if (response.message) {
        alertSuccess(response.message);
      }

      setBooksBySeller((prev) => {
        return [...prev, response.data];
      });
    } catch (err) {
      alertError(err.message);
    }
  };

  const handleBookEdit = (book) => {
    setEditBookData((prev) => {
      if (prev || !book) {
        return null;
      }
      return { ...book, sellerData };
    });
  };

  const onBookEditSubmit = async (book) => {
    try {
      const response = await BooksAPI.editBook(book, book._id);
      if (response.message) {
        alertSuccess(response.message);
      }

      const updatedBookList = [...booksBySeller];
      const editBookIdx = booksBySeller.findIndex(
        (item) => item._id === book._id
      );
      updatedBookList.splice(editBookIdx, 1, book);

      setBooksBySeller(updatedBookList);
      handleBookEdit();
    } catch (err) {
      alertError(err.message);
    }
  };

  const handleBookDelete = async (book) => {
    try {
      const response = await BooksAPI.delete(book._id, _id);
      if (response.message) {
        alertSuccess(response.message);
      }

      const updatedBookList = booksBySeller.filter(
        (item) => item._id !== book._id
      );

      setBooksBySeller(updatedBookList);
    } catch (err) {
      alertError(err.message);
    }
  };

  return (
    <>
      <h4 className={'display-4 mb-3'}>{'Welcome ' + username}</h4>
      <ProfileCard userData={sellerData} />
      <Button onClick={handleAddBook} variant={'outline-success'}>
        Add Books
      </Button>

      <Container fluid={'md'} className={'mt-3'}>
        {!!soldList?.length ? (
          <>
            <h3 className={'display-5 mb-2'}> {'Books Sold'} </h3>
            <Container fluid={'md'}>
              {soldList?.map((book, i) => {
                return <BookSoldCard key={book.name} bookData={book} />;
              })}
            </Container>
          </>
        ) : (
          <h3 className={'display-5 mb-2'}> {'No Books Sold yet!'} </h3>
        )}
      </Container>
      {!!booksBySeller?.length ? (
        <Container className={'mt-2'} fluid={'md'}>
          <h3 className={'display-5 mb-2 mt-3'}> Books Listed By You </h3>
          <Container fluid={'md'}>
            {booksBySeller?.map((book, i) => {
              return (
                <BookListedCard
                  key={book.name}
                  bookData={book}
                  sellerData={sellerData}
                  onEdit={handleBookEdit}
                  onDelete={handleBookDelete}
                />
              );
            })}
          </Container>
        </Container>
      ) : null}
      <Link to={'/booklist'} style={{ textDecoration: 'none' }}>
        <Button variant={'outline-primary'}> Checkout Products </Button>
      </Link>
      {editBookData ? (
        <EditBookForm
          data={editBookData}
          onCancel={handleBookEdit}
          onEditBook={onBookEditSubmit}
        />
      ) : null}
      {showAddBookDialog ? (
        <AddBookForm
          onAddBook={onBookAddSubmit}
          onCancel={handleAddBook}
          sellerData={sellerData}
        />
      ) : null}
    </>
  );
}

export default SellerProfile;
