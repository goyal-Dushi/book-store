import { FormGroup, FormLabel, FormControl, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";

const initialState = {
  name: "",
  isAvailable: true,
  stock: "",
  price: "",
};

function BookForm(props) {
  const [editBookDetail, setEditBookDetail] = useState(initialState);

  useEffect(() => {
    if (props?.type === "edit") {
      setEditBookDetail(props?.bookData);
    }
  }, [props?.type]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (props?.type === "edit") {
      const response = await axios
        .patch(
          "http://localhost:5000/books/edit/" + editBookDetail?._id,
          editBookDetail
        )
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error book edit: ", err);
        });
      console.log(response);
    } else {
      console.log("While adding editBookDetail: ", editBookDetail);
      const newBookObj = {
        ...editBookDetail,
        sellerName: props?.sellerName,
        sellerAddress: props?.sellerAddress,
        sellerID: props?.sellerID,
      };
      const response = await axios
        .post("http://localhost:5000/books/add", newBookObj)
        .then((res) => res.data)
        .catch((err) => {
          console.log("Error adding book: ", err);
        });
      console.log(response);
    }
    props.setPopup({ status: false, type: "" });
  };

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <FormGroup>
        <FormLabel>{"Name of Book"}</FormLabel>
        <FormControl
          value={editBookDetail?.name}
          onChange={(e) =>
            setEditBookDetail({ ...editBookDetail, name: e.target.value })
          }
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>{"Seller Name"}</FormLabel>
        <FormControl
          value={
            props?.type === "add"
              ? props?.sellerName
              : editBookDetail?.sellerName
          }
          disabled={props?.type === "add" ? true : false}
          onChange={(e) =>
            setEditBookDetail({ ...editBookDetail, sellerName: e.target.value })
          }
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>{"Seller Address"}</FormLabel>
        <FormControl
          value={
            props?.type === "add"
              ? props?.sellerAddress
              : editBookDetail?.sellerAddress
          }
          disabled={props?.type === "add" ? true : false}
          onChange={(e) =>
            setEditBookDetail({
              ...editBookDetail,
              sellerAddress: e.target.value,
            })
          }
        />
      </FormGroup>
      <FormGroup>
        <FormLabel>{"Stock"}</FormLabel>
        <FormControl
          value={editBookDetail?.stock}
          type={"number"}
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
        <FormLabel>{"Price"}</FormLabel>
        <FormControl
          value={editBookDetail?.price}
          type={"number"}
          required
          onChange={(e) =>
            setEditBookDetail({
              ...editBookDetail,
              price: e.target.value,
            })
          }
        />
      </FormGroup>
      <Button type={"submit"} className={"mt-2"} variant={"primary"}>
        {props?.type === "edit" ? "Edit" : "Add"}
      </Button>
      <Button
        variant={"outline-dark"}
        className={"ml-3"}
        onClick={() => props.setPopup({ status: false, type: "" })}>
        {"Close"}
      </Button>
    </form>
  );
}

export default BookForm;
