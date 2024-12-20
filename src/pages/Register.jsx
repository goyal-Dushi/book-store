import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Container,
  FormControl,
  FormLabel,
  Form,
  FormGroup,
  Button,
} from 'react-bootstrap';
import { AlertContext, UserDetailsContext } from '../contexts';
import { UserAPI } from '../api';
import { UserUtil } from '../utils';

const initialState = {
  username: '',
  address: '',
  password: '',
  phone_no: '',
  role: '',
};

function RegisterPage() {
  const [userDetail, setUserDetail] = useState(initialState);
  const history = useHistory();
  const { alertSuccess, alertError } = useContext(AlertContext);
  const { updateUserDetails } = useContext(UserDetailsContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await UserAPI.register(userDetail);
      const user = new UserUtil();

      user.saveDataToLs(response.data);
      updateUserDetails({ type: 'update', data: response.data });
      alertSuccess(response.message);
      history.push('/booklist');
    } catch (err) {
      console.error('Registration form error: ', err);
      alertError(
        err.message || 'Try again later, error during registering user!'
      );
    }
  };

  return (
    <>
      <h3 className={'display-4 mb-3'}> Register </h3>
      <Container fluid={'sm'} className={'p-2'}>
        <Form onSubmit={handleSubmit}>
          <FormGroup className={'mb-3'}>
            <FormLabel>{'Username'}</FormLabel>
            <FormControl
              value={userDetail?.username}
              onChange={(e) =>
                setUserDetail({ ...userDetail, username: e.target.value })
              }
              required
              placeholder={'Enter Username'}
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
            <FormLabel>{'Phone No'}</FormLabel>
            <FormControl
              type="number"
              value={userDetail?.phone_no}
              onChange={(e) =>
                setUserDetail({ ...userDetail, phone_no: e.target.value })
              }
              required
              placeholder={'Enter Your Mobile Number'}
            />
          </FormGroup>
          <FormGroup className={'mb-3'}>
            <select
              className={'form-select'}
              onChange={(e) =>
                setUserDetail({ ...userDetail, role: e.target.value })
              }
            >
              <option selected value={'user'}>
                {'Buyer'}
              </option>
              <option value={'vendor'}> {'Seller'} </option>
            </select>
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
