import { memo } from "react";
import { Card, Button } from "react-bootstrap";

function Cards(props) {
  if (props.type === "book") {
    return (
      <Card style={{ width: "18rem", margin: "5px" }}>
        <Card.Header>{props?.bookData?.name}</Card.Header>
        <Card.Body>
          <Card.Title>{props?.bookData?.sellerName}</Card.Title>
          <Card.Subtitle>{props?.bookData?.stock}</Card.Subtitle>
          <Card.Text>
            {"Seller Address: " + props?.bookData?.sellerAddress}
          </Card.Text>
          <Card.Text>{"Price: " + props?.bookData?.price}</Card.Text>
          {props?.addToCart ? (
            <Button
              onClick={() =>
                props.setCartItem([...props.cartItem, props.bookData])
              }
              variant={"outline-primary"}>
              {"Add to Card"}
            </Button>
          ) : null}
        </Card.Body>
      </Card>
    );
  } else if (props.type === "profile") {
    return (
      <Card style={{ width: "300px" }}>
        <Card.Header>{props.name}</Card.Header>
        <Card.Body>
          <Card.Text>{props.email}</Card.Text>
          <Card.Text>{props.address}</Card.Text>
          {/* Edit button to be added! */}
          {/* <Button variant={"outline-primary"}>{"Add to Card"}</Button> */}
        </Card.Body>
      </Card>
    );
  } else if (props.type === "bookBought") {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Header>{props.name}</Card.Header>
        <Card.Body>
          <Card.Title>{props.sellerName}</Card.Title>
          <Card.Text>{"Seller Address: " + props.sellerAddress}</Card.Text>
          <Card.Text>{"Receiving Address: " + props?.address}</Card.Text>
          <Card.Text>{"Price: " + props?.price}</Card.Text>
          <Card.Text>{"Bought On: " + props?.soldOn?.slice(0, 10)}</Card.Text>
        </Card.Body>
      </Card>
    );
  } else if (props.type === "bookSold") {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Header>{props.name}</Card.Header>
        <Card.Body>
          <Card.Title>{props.sellerName}</Card.Title>
          <Card.Text>{"Seller Address: " + props.sellerAddress}</Card.Text>
          {/* <Card.Text>{"Receiving Address: " + props?.address}</Card.Text> */}
          <Card.Text>{"Price: " + props?.price}</Card.Text>
          <Card.Text>{"Sold On: " + props?.soldOn?.slice(0, 10)}</Card.Text>
        </Card.Body>
      </Card>
    );
  } else if (props.type === "bookListed") {
    return (
      <Card style={{ width: "18rem" }}>
        <Card.Header>{props.name}</Card.Header>
        <Card.Body>
          <Card.Title>{props.sellerName}</Card.Title>
          <Card.Text>{"Seller Address: " + props.sellerAddress}</Card.Text>
          <Card.Text>{"Price: " + props?.price}</Card.Text>
          <Card.Text> {"Stock: " + props?.stock} </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default memo(Cards);
