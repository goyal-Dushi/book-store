import { useContext, useState } from 'react';
import { BooksAPI } from '../../api';
import BookListedCard from '../cards/BookListedCard';
import BookSoldCard from '../cards/BookSoldCard';
import BoughtBookCard from '../cards/BoughBookCard';
import ProfileCard from '../cards/ProfileCard';
import { AlertContext } from '../../contexts';
import EditBookForm from '../bookForms/EditBookForm';

function SellerProfile(props) {
  const { sellerData, inventoryData } = props;
  const { name, _id } = sellerData;
  const { bookList, soldList } = inventoryData;
  const { dispatchAlert } = useContext(AlertContext);
  const [editBookData, setEditBookData] = useState(null);

  if (!sellerData || !_id) {
    return null;
  }

  const handleBookDelete = async (book) => {
    try {
      const response = await BooksAPI.addBook(book, _id);
      if (response.message) {
        dispatchAlert({
          show: true,
          type: response.type,
          msg: response.message,
        });
      }
    } catch (err) {
      dispatchAlert({
        show: true,
        type: err.type,
        msg: err.message,
      });
    }
  };

  const onBookEditSubmit = async (book) => {
    try {
      const response = await BooksAPI.editBook(book, _id);
      if (response.message) {
        dispatchAlert({
          show: true,
          type: response.type,
          msg: response.message,
        });
      }
    } catch (err) {
      dispatchAlert({
        show: true,
        type: err.type,
        msg: err.message,
      });
    }
  };

  const handleBookEdit = (book) => {
    setEditBookData((prev) => {
      if (prev) {
        return null;
      }
      return { ...book, ...sellerData };
    });
  };

  return (
    <>
      <h4 className={'display-4 mb-3'}>{'Welcome ' + name}</h4>
      <ProfileCard userData={sellerData} />
      <Button
        onClick={() => setModalOpen({ type: 'add', status: true })}
        variant={'outline-success'}
      >
        Add Books
      </Button>

      <Container fluid={'md'} className={'mt-3'}>
        {!!soldList?.length ? (
          <>
            <h3 className={'display-5 mb-2'}> {'Books Sold'} </h3>
            <Container fluid={'md'} style={{ ...containerStyle }}>
              {soldList?.map((book, i) => {
                return (
                  <BookSoldCard
                    key={book.name}
                    bookData={book}
                    sellerData={sellerData}
                  />
                );
              })}
            </Container>
          </>
        ) : (
          <h3 className={'display-5 mb-2'}> {'No Books Sold yet!'} </h3>
        )}
      </Container>
      {!!bookList?.length ? (
        <Container className={'mt-2'} fluid={'md'}>
          <h3 className={'display-5 mb-2 mt-3'}> Books Listed By You </h3>
          <Container fluid={'md'} style={{ ...containerStyle }}>
            {bookList?.map((book, i) => {
              return (
                <BookListedCard
                  key={book.name}
                  bookData={book}
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
        <EditBookForm data={editBookData} onEditBook={onBookEditSubmit} />
      ) : null}
    </>
  );
}

export default SellerProfile;
