import { Card } from 'react-bootstrap';

function ProfileCard(props) {
  const { userData } = props;
  const { name, email, address } = userData;

  return (
    <Card style={{ width: '300px' }}>
      <Card.Header>{name}</Card.Header>
      <Card.Body>
        <Card.Text>{email}</Card.Text>
        <Card.Text>{address}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProfileCard;
