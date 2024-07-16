import React from 'react';
import { Card, Button } from 'react-bootstrap';

function BookCard(props) {
  const { bookData, onAddToCart } = props;
  const { name, seller, stock, price } = bookData;
  const { username: sellerName, address: sellerAddress } = seller;

  const handleAddToCart = () => {
    onAddToCart(bookData);
  };

  return (
    <Card className="m-4" style={{ width: '18rem' }}>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Title>{sellerName}</Card.Title>
        <Card.Subtitle>{stock}</Card.Subtitle>
        <Card.Text>{'Seller Address: ' + sellerAddress}</Card.Text>
        <Card.Text>{'Price: ' + price}</Card.Text>
        <Button onClick={handleAddToCart} variant={'outline-primary'}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
