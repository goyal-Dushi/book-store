import { useEffect, useState, useContext } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import { AlertContext } from '../contexts';
import { UserUtil } from '../utils';
import { CheckoutAPI } from '../api/checkout.api';
import CheckoutCard from '../components/cards/CheckoutCard';

const footerStyle = {
  width: '100%',
  marginTop: '50px',
};

function Checkout() {
  const location = useLocation();
  const [booksDetails, setBooksDetails] = useState({ total: 0, list: [] });
  const { alertSuccess, alertError } = useContext(AlertContext);
  const history = useHistory();

  useEffect(() => {
    const bookList = location?.state?.bookList;

    if (bookList?.length) {
      const parsedList = JSON.parse(bookList);
      const total = parsedList.reduce((acc, book) => {
        return (acc += book?.price);
      }, 0);

      setBooksDetails({
        total: total,
        list: parsedList,
      });
    }
  }, [location?.state?.bookList]);

  // removing books from list
  const handleRemove = (index) => {
    const items = [...booksDetails.list];
    items.splice(index, 1);
    const total = items.reduce((acc, book) => {
      return (acc += book?.price);
    }, 0);

    setBooksDetails({ total: total, list: items });
  };

  const handleCheckout = async () => {
    try {
      const user = new UserUtil();
      const response = await CheckoutAPI.buy(booksDetails, user.getUserId());

      setBooksDetails({ total: 0, list: '' });
      alertSuccess(response.message);
      history.replace('/booklist');
    } catch (err) {
      alertError(err.message);
    }
  };

  return (
    <>
      <h5 className={'display-5 mb-3'}> {'Buy & Checkout'} </h5>
      <Container
        fluid={'md'}
        className="d-flex flex-wrap justify-content-evenly align-items-center"
      >
        {!!booksDetails?.list?.length ? (
          booksDetails.list.map((book, i) => {
            return (
              <CheckoutCard
                key={book.name}
                bookData={book}
                onProductRemove={() => handleRemove(i)}
              />
            );
          })
        ) : (
          <h3 className={'display-4 mt-2 mb-2'}>No books bought Yet!</h3>
        )}
        <footer style={{ ...footerStyle }}>
          {booksDetails?.list?.length ? (
            <Container
              className="d-flex align-items-center justify-content-evenly"
              fluid={'md'}
            >
              <div> {`Total: ${booksDetails.total}`} </div>
              <Button onClick={handleCheckout} variant={'outline-success'}>
                Buy & Pay
              </Button>
            </Container>
          ) : null}
        </footer>
      </Container>
    </>
  );
}

export default Checkout;
