import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { Card, Button, Container } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import Cards from '../components/cards';
import { AlertContext } from '../components/contexts/alertContext';
import { UserDetailsContext } from '../components/contexts/userContext';

const flexEvenlyCenter = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
};

const footerStyle = {
  width: '100%',
  marginTop: '50px',
};

function Checkout() {
  const location = useLocation();
  const [booksDetails, setBooksDetails] = useState({ total: 0, list: [] });
  const { dispatchAlert } = useContext(AlertContext);
  const { userData, setUserData } = useContext(UserDetailsContext);
  const history = useHistory();

  // removing books from list
  const handleRemove = (index) => {
    const items = [...booksDetails.list];
    items.splice(index, 1);
    const total = items.reduce((acc, book) => {
      return (acc += book?.price);
    }, 0);

    setBooksDetails({ total: total, list: [...items] });
  };

  useEffect(() => {
    const user = window.localstorage.getItem('user');
    if(!user){
      history.push('/login');
      return;
    }

    setUserData(user);
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
    try{
     
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
        
        if(!newList?.length){
          return;
        }
        
        const response = await axios
          .put('http://localhost:5000/checkout/' + userData?._id, newList, {
            withCredentials: true,
          })
          .then((res) => res.data)
          .catch((err) => {
            console.log('Error Book Checkout: ', err);
          });

        setBooksDetails({ total: 0, list: '' });
        dispatchAlert({ type: 'success', show: true, msg: response?.msg });
        history.replace('/profile');
    }catch(err){

    }
  };

  if (!userData?._id) {
    return null;
  }

  return (
    <>
      <h5 className={'display-5 mb-3'}> {'Buy & Checkout'} </h5>
      <Container fluid={'md'} className="d-flex flex-wrap justify-content-evenly align-items-center">
        {booksDetails?.list?.length ? (
          booksDetails?.list?.map((book, i) => (
            <Card key={i}>
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
                onClick={() => handleCheckout()}
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
