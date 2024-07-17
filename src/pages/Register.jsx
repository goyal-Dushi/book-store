import { useHistory } from 'react-router-dom';
import { useContext } from 'react';
import { AlertContext } from '../contexts';
import { UserAPI } from '../api';

const initialState = {
  name: '',
  email: '',
  address: '',
  password: '',
  isSeller: false,
};

function RegisterPage() {
  const [userDetail, setUserDetail] = useState(initialState);
  const history = useHistory();
  const { dispatchAlert } = useContext(AlertContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserAPI.register(userDetail);

      window.localStorage.setItem('user', response.data);
      dispatchAlert({ type: 'success', msg: response.message, show: true });
      history.push('/profile');
    } catch (err) {
      console.error('Registration form error: ', err);
      dispatchAlert({
        type: err.type || 'danger',
        msg: err.message || 'Try again later, error during registering user!',
        show: true,
      });
    }
  };

  return (
    <>
      <h3 className={'display-4 mb-3'}> Register </h3>
      <Container fluid={'sm'} className={'p-2'}>
        <Form onSubmit={handleSubmit}>
          <FormGroup className={'mb-3'}>
            <FormLabel>{'Email'}</FormLabel>
            <FormControl
              type={'email'}
              value={userDetail?.email}
              onChange={(e) =>
                setUserDetail({ ...userDetail, email: e.target.value })
              }
              required
              placeholder={'Enter Your Email'}
            />
          </FormGroup>
          <FormGroup className={'mb-3'}>
            <FormLabel>{'Address'}</FormLabel>
            <FormControl
              value={userDetail?.address}
              onChange={(e) =>
                setUserDetail({ ...userDetail, address: e.target.value })
              }
              required
              placeholder={'Enter Your Address'}
            />
          </FormGroup>
          <FormGroup className={'mb-3'}>
            <select
              className={'form-select'}
              onChange={(e) =>
                e.target.value === 'seller'
                  ? setUserDetail({ ...userDetail, isSeller: true })
                  : setUserDetail({ ...userDetail, isSeller: false })
              }
            >
              <option selected value={'buyer'}>
                {'User'}
              </option>
              <option value={'seller'}> {'Seller'} </option>
            </select>
          </FormGroup>
          <FormGroup className={'mb-3'}>
            <FormLabel>{'Username'}</FormLabel>
            <FormControl
              value={userDetail?.name}
              onChange={(e) =>
                setUserDetail({ ...userDetail, name: e.target.value })
              }
              required
              placeholder={'Enter Name'}
            />
          </FormGroup>
          <FormGroup className={'mb-3'}>
            <FormLabel>{'Password'}</FormLabel>
            <FormControl
              required
              value={userDetail?.password}
              onChange={(e) =>
                setUserDetail({ ...userDetail, password: e.target.value })
              }
              type={'password'}
              placeholder={'Enter Password'}
            />
          </FormGroup>
          <Button type={'submit'} variant={'outline-primary'}>
            Register
          </Button>
        </Form>
      </Container>
    </>
  );
}

export default RegisterPage;
