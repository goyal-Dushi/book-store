import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import BoughtBookCard from '../cards/BoughBookCard';
import ProfileCard from '../cards/ProfileCard';

function UserProfile(props) {
  const { userData, inventoryData } = props;
  const { name } = userData;
  const { boughtList } = inventoryData;

  return (
    <>
      <h4 className={'display-4 mb-3'}>{'Welcome ' + name}</h4>
      <ProfileCard userData={userData} />
      <Container>
        {!!boughtList?.length ? (
          <>
            <h3 className={'display-5 mb-2 mt-3'}> {'Books Bought'} </h3>
            <Container fluid={'md'}>
              {boughtList?.map((book) => {
                return <BoughtBookCard key={book.name} bookData={book} />;
              })}
            </Container>
          </>
        ) : (
          <h3 className={'display-5 mb-2 mt-3'}>{'No Books Bought yet!'}</h3>
        )}
      </Container>
      <Link to={'/booklist'} className="text-decoration-none">
        <Button variant={'outline-primary'}>{'Checkout Products'}</Button>
      </Link>
    </>
  );
}

export default UserProfile;
