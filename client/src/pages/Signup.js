import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/Signup.css";

function Signup(props) {
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
    window.location.href = "/";
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <section>
      <Form onSubmit={handleFormSubmit} className="sign-up-form">
        <Form.Group className="mb-3" controlId="formBasicFirstname">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="firstname"
            placeholder="First Name"
            name="firstName"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicLastname">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="lastname"
            placeholder="Last Name"
            name="lastName"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="email"
            placeholder="Enter email"
            name="email"
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={handleChange}
            type="password"
            placeholder="Password"
            name="password"
          />
        </Form.Group>
        <div className="text-center">
          <Button variant="primary" type="submit" value="Submit">
            Sign Up
          </Button>
        </div>
      </Form>
    </section>
  );
}

export default Signup;
