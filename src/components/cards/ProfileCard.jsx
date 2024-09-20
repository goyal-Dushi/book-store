import { Card } from 'react-bootstrap';

function ProfileCard(props) {
  const { userData } = props;
  const { username, phone_no, address } = userData;

  return (
    <Card style={{ width: '300px' }}>
      <Card.Header>{username}</Card.Header>
      <Card.Body>
        {phone_no ? <Card.Text>{phone_no}</Card.Text> : null}
        <Card.Text>{address}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProfileCard;
