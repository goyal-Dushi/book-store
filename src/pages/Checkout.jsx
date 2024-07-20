import { useEffect, useState, useContext } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import Cards from '../components/cards';
import { AlertContext } from '../components/contexts/alertContext';
import { UserUtil } from '../utils';
import { CheckoutAPI } from '../api/checkout.api';

const footerStyle = {
  width: '100%',
  marginTop: '50px',
};

function Checkout() {
  const location = useLocation();
  const [booksDetails, setBooksDetails] = useState({ total: 0, list: [] });
  const { dispatchAlert } = useContext(AlertContext);
  const history = useHistory();

  // removing books from list
  const handleRemove = (index) => {
    const items = [...booksDetails.list];
    items.splice(index, 1);
    const total = items.reduce((acc, book) => {
      return (acc += book?.price);
    }, 0);

    setBooksDetails({ total: total, list: items });
  };

  useEffect(() => {
    const bookList = location?.state?.bookList;

    if(bookList){
      const total = bookList.reduce((acc, book) => {
        return (acc += book?.price);
      }, 0);

      setBooksDetails({
        total: total,
        list: [...books],
      });
    }
  }, [location?.state?.bookList]);

  const handleCheckout = async () => {
    try{   
        const user = new UserUtil();
        const response = await CheckoutAPI.buy(booksDetails, user.getUserId());

        setBooksDetails({ total: 0, list: '' });
        dispatchAlert({ type: 'success', show: true, msg: response?.msg });
        history.replace('/booklist');
    }catch(err){
      dispatchAlert({ type: 'danger', show: true, msg: err?.message });
    }
  };

  return (
    <>
      <h5 className={'display-5 mb-3'}> {'Buy & Checkout'} </h5>
      <Container fluid={'md'} className="d-flex flex-wrap justify-content-evenly align-items-center">
        {Boolean(booksDetails?.list?.length) ? (
          booksDetails.list.map((book, i) => (
            <Card key={book.name}>
              <Card.Body>
                <Cards type={'book'} bookData={book} />
              </Card.Body>
              <div className='d-flex align-items-center justify-content-evenly'>
                <Button
                  onClick={() => handleRemove(i)}
                  variant={'outline-danger'}
                >
                  Remove
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <h3 className={'display-4 mt-2 mb-2'}>No books bought Yet!</h3>
        )}
        <footer style={{ ...footerStyle }}>
          {booksDetails?.list?.length ? (
            <Container className="d-flex align-items-center justify-content-evenly" fluid={'md'}>
              <div> {`Total: ${booksDetails.total}`} </div>
              <Button
                onClick={handleCheckout}
                variant={'outline-success'}
              >
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
