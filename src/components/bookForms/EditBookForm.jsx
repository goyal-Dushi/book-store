import { useState } from 'react';
import { FormGroup, FormLabel, FormControl, Button } from 'react-bootstrap';

function EditBookForm(props) {
  const { data, onEditBook, onCancel } = props;
  const { sellerData, ...restProps } = data;
  const [editBookDetail, setEditBookDetail] = useState(restProps);

  if (!editBookDetail || !Object.keys(editBookDetail).length) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    onEditBook(editBookDetail);
  };

  const handleCancel = () => {
    onCancel();
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
          <FormControl value={editBookDetail?.sellerName} disabled />
        </FormGroup>
        <FormGroup>
          <FormLabel>Seller Address</FormLabel>
          <FormControl value={editBookDetail?.sellerAddress} disabled />
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
          onClick={handleCancel}
        >
          Close
        </Button>
      </form>
    </>
  );
}

export default EditBookForm;
