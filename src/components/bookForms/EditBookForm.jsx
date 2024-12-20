import { useRef, useState } from 'react';
import {
  FormGroup,
  FormLabel,
  FormControl,
  FormCheck,
  Button,
  Modal,
} from 'react-bootstrap';

function EditBookForm(props) {
  const { data, onEditBook, onCancel } = props;
  const { sellerData, ...restProps } = data;
  const submitRef = useRef(null);
  const [editBookDetail, setEditBookDetail] = useState(restProps);

  if (!editBookDetail || !Object.keys(editBookDetail).length) {
    return null;
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();

    onEditBook(editBookDetail);
  };

  const handleSubmit = (e) => {
    if (submitRef?.current) {
      submitRef.current.click();
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <Modal backdrop="static" centered show onHide={handleCancel}>
      <Modal.Header> Edit Book </Modal.Header>
      <Modal.Body>
        <form onSubmit={(e) => handleFormSubmit(e)}>
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
            <FormLabel>Description</FormLabel>
            <FormControl
              value={editBookDetail?.description}
              required
              as="textarea"
              onChange={(e) =>
                setEditBookDetail({
                  ...editBookDetail,
                  description: e.target.value,
                })
              }
            />
          </FormGroup>
          <FormGroup className="d-flex align-items-center my-2 gap-2">
            <FormLabel className="m-0">In Stock</FormLabel>
            <FormCheck
              checked={editBookDetail?.instock}
              type="switch"
              onChange={(e) => {
                setEditBookDetail({
                  ...editBookDetail,
                  instock: e.currentTarget.checked,
                });
              }}
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
                  price: +e.target.value,
                })
              }
            />
          </FormGroup>
          <FormGroup>
            <FormLabel>Seller Name</FormLabel>
            <FormControl value={sellerData.username} disabled />
          </FormGroup>
          <FormGroup>
            <FormLabel>Seller Address</FormLabel>
            <FormControl value={sellerData.address} disabled />
          </FormGroup>
          <input type="submit" hidden ref={submitRef} />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} className={'mt-2'} variant={'primary'}>
          Edit
        </Button>
        <Button
          variant={'outline-dark'}
          className={'ml-3'}
          onClick={handleCancel}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditBookForm;
