import { useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  useEffect(() => {
    document.title = 'Welcome!';
  }, []);

  return (
    <>
      <h3 className={'display-4 mb-3'}>{'Welcome user to online BookStore'}</h3>
      <div>
        <Link className="btn btn-md btn-primary-outline" to="/login">
          Login
        </Link>
        <Link className="btn btn-md btn-outline-secondary" to="/register">
          Register
        </Link>
      </div>
    </>
  );
}

export default Home;
