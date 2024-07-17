import { useState, useContext } from 'react';
import { FormGroup, FormLabel, FormControl, Modal } from 'react-bootstrap';
import { BooksAPI } from '../../api';
import { AlertContext } from '../../contexts';

function AddBookForm(props) {
  const { onAddBook, sellerData } = props;
  const [bookDetail, setBookDetail] = useState({});
  const { dispatchAlert } = useContext(AlertContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { _id: sellerID } = sellerData;

      const response = await BooksAPI.addBook(bookDetail, sellerID);
      dispatchAlert({ show: true, type: response.type, msg: response.message });
      onAddBook();
    } catch (err) {
      dispatchAlert({
        type: err?.type,
        msg: err.message,
        show: true,
      });
    }
  };

  const handleCancel = () => {
    onAddBook();
  };

  return (
    <Modal className="p-3" show>
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
            <FormLabel>{'Stock'}</FormLabel>
            <FormControl
              value={bookDetail?.stock}
              type={'number'}
              required
              onChange={(e) =>
                setBookDetail({
                  ...bookDetail,
                  stock: e.target.value,
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>{'Price'}</FormLabel>
            <FormControl
              value={bookDetail?.price}
              type={'number'}
              required
              onChange={(e) =>
                setBookDetail({
                  ...bookDetail,
                  price: e.target.value,
                })
              }
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
