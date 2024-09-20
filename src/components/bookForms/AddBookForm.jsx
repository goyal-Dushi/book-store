import { useState, useContext } from 'react';
import {
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  Modal,
  Button,
} from 'react-bootstrap';
import { BooksAPI } from '../../api';
import { AlertContext } from '../../contexts';

const DEF_STATE = {
  name: '',
  description: '',
  instock: true,
  price: null,
};

function AddBookForm(props) {
  const { onAddBook, sellerData, onCancel } = props;
  const [bookDetail, setBookDetail] = useState(DEF_STATE);
  const { alertSuccess, alertError } = useContext(AlertContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { _id: sellerID } = sellerData;

      const response = await BooksAPI.addBook(bookDetail, sellerID);
      alertSuccess(response.message);
      onAddBook();
    } catch (err) {
      alertError(err.message);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal className="p-3" centered backdrop="static" show>
      <Modal.Header>Add Book</Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>{'Name of Book'}</FormLabel>
            <FormControl
              value={bookDetail?.name}
              required
              onChange={(e) =>
                setBookDetail({ ...bookDetail, name: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Description</FormLabel>
            <FormControl
              value={bookDetail?.description}
              required
              as="textarea"
              onChange={(e) =>
                setBookDetail({ ...bookDetail, description: e.target.value })
              }
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>{'Price'}</FormLabel>
            <FormControl
              value={bookDetail?.price}
              type="number"
              required
              onChange={(e) =>
                setBookDetail({
                  ...bookDetail,
                  price: +e.target.value,
                })
              }
            />
          </FormGroup>
          <FormGroup className="mt-2">
            <FormCheck
              defaultChecked
              type="checkbox"
              onChange={(e) =>
                setBookDetail({
                  ...bookDetail,
                  instock: e.target.checked,
                })
              }
              name="instock"
              label={'In Stock'}
            />
          </FormGroup>
          <Button type={'submit'} className={'mt-2'} variant={'primary'}>
            Add Book
          </Button>
          <Button
            variant={'outline-dark'}
            className={'ml-3'}
            onClick={handleCancel}
          >
            Cancel
          </Button>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default AddBookForm;
