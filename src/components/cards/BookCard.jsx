import React from 'react';
import { Card, Button } from 'react-bootstrap';

function BookCard(props) {
  const { bookData, onAddToCart } = props;
  const { name, seller, instock, price, description } = bookData;
  // const { username: sellerName, address: sellerAddress } = seller;

  const handleAddToCart = () => {
    onAddToCart(bookData);
  };

  return (
    <Card className="m-4" style={{ width: 'fit-content' }}>
      <Card.Header className="d-flex align-items-center justify-content-between">
        <span>{name}</span>
        <span>{instock ? 'In Stock' : 'Out of Stock'}</span>
      </Card.Header>
      <Card.Body>
        {/* <Card.Title>{sellerName}</Card.Title> */}
        {/* <Card.Text>{'Seller Address: ' + sellerAddress}</Card.Text> */}
        <Card.Text>{'Price: ' + price}</Card.Text>
        <Card.Text>{description}</Card.Text>
        <Button onClick={handleAddToCart} variant={'outline-primary'}>
          Add to Cart
        </Button>
      </Card.Body>
    </Card>
  );
}

export default BookCard;
