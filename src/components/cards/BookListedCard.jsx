import { Card } from 'react-bootstrap';

function BookListedCard(props) {
  const { name, sellerName, sellerAddress, price, stock } = props;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Title>{sellerName}</Card.Title>
        <Card.Text>{'Seller Address: ' + sellerAddress}</Card.Text>
        <Card.Text>{'Price: ' + price}</Card.Text>
        <Card.Text> {'Stock: ' + stock} </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BookListedCard;
