import React from 'react';
import { Card, Button } from 'react-bootstrap';

function CheckoutCard(props) {
  const { bookData, onProductRemove } = props;
  const { name, seller, instock, price, description } = bookData;
  // const { username: sellerName, address: sellerAddress } = seller;

  const handleRemove = () => {
    onProductRemove();
  };

  return (
    <Card className="m-4" style={{ width: 'fit-content' }}>
      <Card.Header className="d-flex align-items-center justify-content-between">
        <span>{name}</span>
        <span>{instock ? 'In Stock' : 'Out of Stock'}</span>
      </Card.Header>
      <Card.Body>
        <Card.Subtitle>{'Price: ' + price}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Button onClick={handleRemove} variant={'outline-danger'}>
          Remove
        </Button>
      </Card.Body>
    </Card>
  );
}

export default CheckoutCard;
