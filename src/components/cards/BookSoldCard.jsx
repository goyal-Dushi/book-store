import { Card} from "react-bootstrap";

function BookSoldCard(props){
    const { name, price, soldOn, buyer } = props;
    const { username: buyerName, address, phone_no: mobile } = buyer;

    return(
        <Card style={{ width: "18rem" }}>
        <Card.Header>{name}</Card.Header>
        <Card.Body>
          <Card.Title>{"Bought By: " + buyerName}</Card.Title>
          <Card.Text>{"Buyer Address: " + address}</Card.Text>
          {mobile ? (
            <Card.Text>{"Buyer Address: " + mobile}</Card.Text>
          ) : null}
          <Card.Text>{"Price: " + price}</Card.Text>
          <Card.Text>{"Sold On: " + soldOn?.slice(0, 10)}</Card.Text>
        </Card.Body>
      </Card>
    )
}

export default BookSoldCard;
