import { useState, useContext } from 'react';
import { FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';
import { AlertContext } from '../../contexts/AlertContextWrapper';
import { BooksAPI } from '../../api';

function EditBookForm(props) {
  const { bookData, booksBySeller, setBooks, setPopup } = props;
  const [editBookDetail, setEditBookDetail] = useState(bookData);
  const { dispatchAlert } = useContext(AlertContext);

  if (!bookData || !Object.keys(bookData).length) {
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await BooksAPI.editBook(editBookDetail, editBookDetail._id);

      const index = booksBySeller.findIndex(
        (book) => book?._id === editBookDetail?._id
      );
      const editedBookObj = {
        ...editBookDetail,
        sellerName,
        sellerAddress,
        sellerID,
      };
      
      const updatedBooksBySeller = [...booksBySeller];
      updatedBooksBySeller.splice(index, 1, editedBookObj);
      setBooks([...updatedBooksBySeller]);
      setPopup({ status: false, type: '' });

      dispatchAlert({
        show: true,
        type: 'success',
        msg: response.msg,
      });
    } catch (err) {
      console.error(err);
      dispatchAlert({
        show: true,
        type: 'success',
        msg: err.msg || 'Failure occured while editing book details!',
      });
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
