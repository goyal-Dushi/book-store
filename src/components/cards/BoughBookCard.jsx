import { Card } from 'react-bootstrap';

function BoughtBookCard(props) {
  const { bookData } = props;
  const { name, price, soldOn, seller } = bookData;
  const {
    username: sellerName,
    address: sellerAddress,
    phone_no: mobile,
  } = seller;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Title>{'Sold by: ' + sellerName}</Card.Title>
        <Card.Text>{'Seller Address: ' + sellerAddress}</Card.Text>
        {mobile ? <Card.Text>{'Seller Phone: ' + mobile}</Card.Text> : null}
        <Card.Text>{'Price: ' + price}</Card.Text>
        <Card.Text>{'Bought On: ' + soldOn?.slice(0, 10)}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default BoughtBookCard;
