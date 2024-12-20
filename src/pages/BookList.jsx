import { useState, useEffect, useContext } from 'react';
import { Container, FormControl, InputGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BookCard } from '../components/cards';
import { useDebounce } from '../hooks/useDebounce';
import { BooksAPI } from '../api';
import { AlertContext } from '../contexts';

function BookList() {
  const [books, setBooks] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [search, setSearch] = useState(null);
  const { alertWarning } = useContext(AlertContext);
  const debounce = useDebounce();

  useEffect(() => {
    (async () => {
      try {
        const response = await BooksAPI.getAll();

        setBooks(response.data);
      } catch (err) {
        alertWarning(err.message);
      }
    })();
    document.title = 'All Books!';
  }, []);

  const handleAddToCart = (data) => {
    setCartItems((prev) => {
      return [...prev, data];
    });
  };

  const handleSearch = (e) => {
    const value = e.target.value;

    debounce(() => {
      setSearch(value);
    }, 500);
  };

  return (
    <>
      <Container
        className={'d-flex justify-content-between flex-wrap'}
        fluid={'md'}
      >
        <h4 className={'display-5'}> {'Search for Your Fav books'} </h4>
        <Link
          className="btn btn-md btn-primary text-decoration-none"
          to={{
            pathname: `/cartCheckout`,
            state: {
              bookList: JSON.stringify(cartItems),
            },
          }}
        >
          {`Proceed to checkout : ${cartItems?.length}`}
        </Link>
      </Container>
      <Container fluid={'md'} className={'mt-3'}>
        <InputGroup className={'mt-2 mb-3'}>
          <FormControl
            placeholder={'Search books here!'}
            value={search}
            onChange={handleSearch}
          />
        </InputGroup>

        <Container className="d-flex align-items-center justify-content-evenly flex-wrap">
          {!!books?.length ? (
            books?.map((book) => {
              // if (
              //   search &&
              //   !book.name.toLowerCase().includes(search.toLowerCase())
              // ) {
              //   return null;
              // }

              return (
                <BookCard
                  key={book.name}
                  bookData={book}
                  onAddToCart={handleAddToCart}
                />
              );
            })
          ) : (
            <> No Books to Display! </>
          )}
        </Container>
      </Container>
    </>
  );
}

export default BookList;
