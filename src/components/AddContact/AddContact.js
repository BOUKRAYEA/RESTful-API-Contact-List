import React, { Component } from "react";
import axios from "axios";
import { Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const inputsCheck = ({ name, phone, email }) => {
  let isValid = false;
  const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    email
  );
  if (name.length === 0) alert("Name can't be blank");
  else if (phone.length !== 8) alert("Please check your phone number");
  else if (!isEmail) alert("Please check your e-mail");
  else isValid = true;
  return isValid;
};

export default class AddContact extends Component {
  state = {
    name: "",
    phone: "",
    email: "",
  };

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  addContact = (e) => {
    if (inputsCheck(this.state)) {
      axios
        .post("http://localhost:4000/add_contact", this.state)
        .then((res) => this.props.getContactList())
        .catch((err) => console.log(err));
    } else e.preventDefault();
  };

  render() {
    return (
      <div>
        <Card className="text-center">
          <Card.Header as="h2">Add Contact</Card.Header>
          <Card.Body>
            <Form>
              <Form.Group controlId="formBasicName">
                <Form.Label as="h5">Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  maxLength="30"
                  placeholder="i.e. Ali"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPhone">
                <Form.Label as="h5">Phone number</Form.Label>
                <Form.Control
                  type="number"
                  name="phone"
                  placeholder="i.e. 98 314 209"
                  onChange={this.handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label as="h5">Email address</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  maxLength="30"
                  placeholder="i.e. ali@e-mail.com"
                  onChange={this.handleChange}
                />
              </Form.Group>
            </Form>
            <Link to="/">
              <Button onClick={this.addContact} variant="primary">
                Add Contact
              </Button>
            </Link>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
