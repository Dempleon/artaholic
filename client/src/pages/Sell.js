import React from "react";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

function Sell() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

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
                    <img src=""/>
                    <p>Title</p>
                    <strong>Price:</strong>
                </li>
            </ul>
            <div className="col-6">
                <img src=""/>
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
                                <Form.Control type="text"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCategory">
                                <Form.Label>Category</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="text"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicArtImage">
                                <Form.Label>Upload Image</Form.Label>
                                <Form.Control type="text" />
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
