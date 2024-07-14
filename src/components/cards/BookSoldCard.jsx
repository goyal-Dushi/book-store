import { Card} from "react-bootstrap";

function BookSoldCard(props){
    const { name, buyerName, sellerName, sellerAddress, address, price, soldOn } = props;

    return(
        <Card style={{ width: "18rem" }}>
        <Card.Header>{name}</Card.Header>
        <Card.Body>
          <Card.Title>{"Bought By: " + buyerName}</Card.Title>
          <Card.Text>{"Buyer Address: " + address}</Card.Text>
          <Card.Text>{"Seller Name: " + sellerName}</Card.Text>
          <Card.Text>{"Seller Address: " + sellerAddress}</Card.Text>
          <Card.Text>{"Price: " + price}</Card.Text>
          <Card.Text>{"Sold On: " + soldOn?.slice(0, 10)}</Card.Text>
        </Card.Body>
      </Card>
    )
}

export default BookSoldCard;
