import { Button, Card } from 'react-bootstrap';

function BookListedCard(props) {
  const { bookData, onEdit, onDelete } = props;
  const { name, price, stock, sellerName, sellerAddress } = bookData;

  const handleEditBook = () => {
    onEdit(bookData);
  };

  const handleDeleteBook = () => {
    onDelete(bookData);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Title>{sellerName}</Card.Title>
        <Card.Text>{'Seller Address: ' + sellerAddress}</Card.Text>
        <Card.Text>{'Price: ' + price}</Card.Text>
        <Card.Text> {'Stock: ' + stock} </Card.Text>
      </Card.Body>
      <Card.Footer>
        <Button onClick={handleEditBook} variant={'warning'}>
          Edit
        </Button>
        <Button
          onClick={handleDeleteBook}
          className={'ml-2'}
          variant={'outline-danger'}
        >
          Delete
        </Button>
      </Card.Footer>
    </Card>
  );
}

export default BookListedCard;
