import React, { useState, Component } from "react";
import "../styles/Sell.css";
import { useStoreContext } from "../utils/GlobalState";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import GalleryCategory from "../components/GalleryCategory/GalleryCategory";
import { ADD_ART } from "../utils/mutations";
import { useMutation } from "@apollo/client";

const styles = {
  image: {
    maxWidth: "100%",
  },
};

class CloudinaryUploadWidget extends Component {
  componentDidMount() {
    const cloudName = "hzxyensd5";
    const uploadPreset = "aoh4fpwm";
    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        sources: ["local", "url"],
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          document
            .getElementById("uploadedimage")
            .setAttribute("src", result.info.secure_url);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function (event) {
        event.preventDefault();
        myWidget.open();
      },
      false
    );
  }
  render() {
    return (
      <button id="upload_widget" className="cloudinary-button">
        Upload
      </button>
    );
  }
}

function Sell() {
  const [state, dispatch] = useStoreContext();
  const { currentCategory } = state;

  const [show, setShow] = useState(false);
  const [formState, setFormState] = useState({
    name: "",
    image: "",
    description: "",
    price: "",
    category: currentCategory,
    quantity: "",
  });
  const [sellingItems, setSellingItems] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [addArt] = useMutation(ADD_ART);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const addArtResponse = await addArt({
      variables: {
        name: formState.name,
        description: formState.description,
        category: currentCategory,
        price: parseFloat(formState.price),
        image: document.getElementById("uploadedimage").src,
        quantity: parseInt(formState.quantity),
      },
    });
    setSellingItems((prevState) => {
      const newList = [...prevState];
      newList.push({
        name: formState.name,
        price: parseFloat(formState.price),
        img: document.getElementById("uploadedimage").src,
      });
      return newList;
    });
    setShow(false);
    console.log(addArtResponse);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
      category: currentCategory,
    });
  };

  return (
    <div className="d-flex py-5">
      <ul className="selling-list col-6">
        {sellingItems.map((itemSrc, index) => {
          const { name, price, img } = itemSrc;
          return (
            <li key={`sellingItem-${index}`} className="text-center">
              <img style={styles.image} src={img} alt="" />
              <p>{name}</p>
              <strong>{price}</strong>
            </li>
          );
        })}
      </ul>
      <div className="col-6 text-center">
        <div>
          <h3>Click on this button to add your own art</h3>
          <Button variant="primary" onClick={handleShow} className="mt-3">
            Add new item
          </Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Selling Form</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleFormSubmit}>
                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPrice">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="price"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicTitle">
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="text"
                    name="quantity"
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="formBasicCategory"
                  name="category"
                  onChange={handleChange}
                >
                  <GalleryCategory inNavbar={false} />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicArtImage">
                  <CloudinaryUploadWidget />
                  <img id="uploadedimage" src="" alt="" />
                </Form.Group>

                <Button variant="primary" type="submit">
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </div>
  );
}

export default Sell;
