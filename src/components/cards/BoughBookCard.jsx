import { Card } from 'react-bootstrap';

function BoughtBookCard(props) {
  const { bookData } = props;
  const { name, sellerName, sellerAddress, address, price, soldOn } = bookData;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Title>{'Sold by: ' + sellerName}</Card.Title>
        <Card.Text>{'Seller Address: ' + sellerAddress}</Card.Text>
        <Card.Text>{'Receiving Address: ' + address}</Card.Text>
        <Card.Text>{'Price: ' + price}</Card.Text>
        <Card.Text>{'Bought On: ' + soldOn?.slice(0, 10)}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BoughtBookCard;
