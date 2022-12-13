import React, { useState, Component } from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import GalleryCategory from "../components/GalleryCategory/GalleryCategory";
import { ADD_ART } from "../utils/mutations";
import { useMutation } from "@apollo/client";

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
                event.preventDefault()
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
    const [show, setShow] = useState(false);
    const [formState, setFormState] = useState({
        name: '',

        
    })
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [addArt] = useMutation(ADD_ART)

    const handleFormSubmit = async(event) => {
        event.preventDefault();
        const addArtResponse = await addArt({
            variables: {
                name: formState.name
            }
        })
    }

    // const handleChange = (event) => {
    //     const {}
    // }

    return (
        <div className="d-flex">
            <ul className="col-6">
                <li>
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
                </li>
            </ul>
            <div className="col-6">
                <img src="" />
                <p>Name</p>
                <Button variant="primary" onClick={handleShow}>
                    Add new item
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Selling Form</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" name="name"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control type="text" name="description"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text" name="price"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCategory">
                                <GalleryCategory inNavbar={false} name="category"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicArtImage">

                                <CloudinaryUploadWidget />
                                <img id="uploadedimage" src=""></img>

                            </Form.Group>

                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Modal.Body>
                </Modal>
            </div>
        </div>

    )

}

export default Sell;
