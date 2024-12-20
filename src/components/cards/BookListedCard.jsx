import { Button, Card } from 'react-bootstrap';

function BookListedCard(props) {
  const { bookData, sellerData, onEdit, onDelete } = props;

  if (!bookData) {
    return null;
  }

  const { name, price, description } = bookData;
  const { username, address } = sellerData;

  const handleEditBook = () => {
    onEdit(bookData);
  };

  const handleDeleteBook = () => {
    onDelete(bookData);
  };

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        {description ? (
          <Card.Subtitle className="mb-2">{description}</Card.Subtitle>
        ) : null}
        <Card.Text>{'Seller Address: ' + address}</Card.Text>
        <Card.Text>{'Price: ' + price}</Card.Text>
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
