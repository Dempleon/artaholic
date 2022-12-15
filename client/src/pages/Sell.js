import React, { useState, Component, useEffect } from "react";
import { useStoreContext } from "../utils/GlobalState";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import GalleryCategory from "../components/GalleryCategory/GalleryCategory";
import { ADD_ART } from "../utils/mutations";
import { useMutation } from "@apollo/client";
import { UPDATE_CURRENT_IMAGE } from '../utils/actions';
import "../styles/Sell.css";

class CloudinaryUploadWidget extends Component {
    componentDidMount() {
        const cloudName = "hzxyensd5"; // replace with your own cloud name
        const uploadPreset = "aoh4fpwm"; // replace with your own upload preset
        var myWidget = window.cloudinary.createUploadWidget(
            {
                cloudName: cloudName,
                uploadPreset: uploadPreset,
                sources: ["local", "url"]

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
        name: '',
        image: '',
        description: '',
        price: '',
        category: currentCategory,
        quantity: ''
    });
    const [sellingItems, setSellingItems] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [addArt] = useMutation(ADD_ART);

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // const variables = {
        //     name: formState.name,
        //     description: formState.description,
        //     category: currentCategory,
        //     price: parseFloat(formState.price),
        //     image: document.getElementById('uploadedimage').src,
        //     quantity: parseInt(formState.quantity)
        // }
        // console.log(variables);

        // will upload image to Gallery section at the same time
        const addArtResponse = await addArt({
            variables: {
                name: formState.name,
                description: formState.description,
                category: currentCategory,
                price: parseFloat(formState.price),
                image: document.getElementById('uploadedimage').src,
                quantity: parseInt(formState.quantity)
            }
        });
        setSellingItems(prevState => {
            const newList = [...prevState];
            newList.push({
                name: formState.name,
                price: parseFloat(formState.price),
                img: document.getElementById('uploadedimage').src
            });
            return newList;
        });
        setShow(false);
        console.log(addArtResponse);
        // window.location.reload();
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
            category: currentCategory
        });
    };

    return (
        <div className="d-flex py-5">
            <ul className="selling-list col-6">
                {
                    sellingItems.map((itemSrc, index) => {
                        const { name, price, img } = itemSrc;
                        return (
                            <li key={`sellingItem-${index}`} className="text-center">
                                <img src={img} alt="" />
                                <p>{name}</p>
                                <strong>{price}</strong>
                            </li>
                        );
                    })
                }
                {/* <li>
                    <img src=""></img>
                    <p>Title</p>
                    <strong>Price:</strong>
                </li>
                <li>
                    <img src=""></img>
                    <p>Title</p>
                    <strong>Price:</strong>
                </li>
                <li>
                    <img src="" />
                    <p>Title</p>
                    <strong>Price:</strong>
                </li> */}
            </ul>
            <div className="col-6 text-center">
                {/* <div className="d-flex"> */}
                {/* <div className="col-6">
                <h1>Welcome to the user page!</h1>
            </div> */}
                <div>
                    {/* <img src="" />
                <p></p> */}
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
                                    <Form.Control type="text" name="name" onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control type="text" name="description" onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPrice">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control type="text" name="price" onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicTitle">
                                    <Form.Label>Quantity</Form.Label>
                                    <Form.Control type="text" name="quantity" onChange={handleChange} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicCategory" name="category" onChange={handleChange}>
                                    <GalleryCategory inNavbar={false} />
                                    {/* <Form.Control placeholder="Category" disabled /> */}
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicArtImage">

                                    <CloudinaryUploadWidget />
                                    <img id="uploadedimage" src="" />

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