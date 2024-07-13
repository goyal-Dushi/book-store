import { Card, Button } from "react-bootstrap";

function ProfileCard(props){
    const { name, email, address } = props;

    return(
        <Card style={{ width: "300px" }}>
        <Card.Header>{props.name}</Card.Header>
        <Card.Body>
          <Card.Text>{props.email}</Card.Text>
          <Card.Text>{props.address}</Card.Text>
          </Card.Body>
      </Card>
    )
}

export default ProfileCard;
