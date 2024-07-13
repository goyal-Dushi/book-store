import { useState, useEffect, useContext } from 'react';
import { FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import axios from 'axios';
import { AlertContext } from '../../contexts/AlertContextWrapper';

const initialState = {
  _id: '',
  name: '',
  isAvailable: true,
  stock: '',
  price: '',
};

function EditBookForm(props) {
  const { type, bookData, booksBySeller, sellerData, setBooks, setPopup } = props;

  if (!bookData || !Object.keys(bookData).length) {
    return null;
  }

  const [editBookDetail, setEditBookDetail] = useState(bookData);
  const { dispatchAlert } = useContext(AlertContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios
        .patch(
          'http://localhost:5000/books/edit',
          editBookDetail
        )
        .then((res) => res.data);

      const index = booksBySeller.findIndex(
        (book) => book?._id === editBookDetail?._id
      );
      const editedBookObj = {
        ...editBookDetail,
        sellerName,
        sellerAddress,
        sellerID,
      };
      booksBySeller.splice(index, 1, editedBookObj);
      setBooks([...props.booksBySeller]);
      setPopup({ status: false, type: '' });

      dispatchAlert({
        show: true,
        type: 'success',
        msg: 'Edited book successfully!',
      });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <FormGroup>
          <FormLabel>Name of Book</FormLabel>
          <FormControl
            value={editBookDetail?.name}
            onChange={(e) =>
              setEditBookDetail({ ...editBookDetail, name: e.target.value })
            }
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Seller Name</FormLabel>
          <FormControl value={editBookDetail?.sellerName} disabled={true} />
        </FormGroup>
        <FormGroup>
          <FormLabel>Seller Address</FormLabel>
          <FormControl
            value={editBookDetail?.sellerAddress}
            onChange={(e) =>
              setEditBookDetail({
                ...editBookDetail,
                sellerAddress: e.target.value,
              })
            }
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Stock</FormLabel>
          <FormControl
            value={editBookDetail?.stock}
            type={'number'}
            required
            onChange={(e) =>
              setEditBookDetail({
                ...editBookDetail,
                stock: e.target.value,
              })
            }
          />
        </FormGroup>
        <FormGroup>
          <FormLabel>Price</FormLabel>
          <FormControl
            value={editBookDetail?.price}
            type={'number'}
            required
            onChange={(e) =>
              setEditBookDetail({
                ...editBookDetail,
                price: e.target.value,
              })
            }
          />
        </FormGroup>
        <Button type={'submit'} className={'mt-2'} variant={'primary'}>
          Edit
        </Button>
        <Button
          variant={'outline-dark'}
          className={'ml-3'}
          onClick={() => props.setPopup({ status: false, type: '' })}
        >
          Close
        </Button>
      </form>
    </>
  );
}

export default EditBookForm;
