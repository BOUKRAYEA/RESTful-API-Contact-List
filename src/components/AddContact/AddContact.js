import React, { Component } from 'react'
import axios from 'axios'
import { Card, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

export default class AddContact extends Component {

    state = {
        name: "",
        phone: "",
        email: ""
    }

    handleChange = (event) => {
        const { name, value } = event.target
        this.setState({
            [name]: value
        })
    }

    addContact = () => {
        axios.post("http://localhost:4000/add_contact", this.state)
    }

    render() {
        return (
            <div>
                <Card className="text-center">
                    <Card.Header as="h2">Add Contact</Card.Header>
                    <Card.Body>

                        <Form>
                            <Form.Group controlId="formBasicName">
                                <Form.Label as="h5">Name</Form.Label>
                                <Form.Control type="text" name="name" placeholder="i.e. Ali" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicPhone">
                                <Form.Label as="h5">Phone number</Form.Label>
                                <Form.Control type="number" name="phone" placeholder="i.e. 98 314 209" onChange={this.handleChange} />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label as="h5">Email address</Form.Label>
                                <Form.Control type="email" name="email" placeholder="i.e. ali@e-mail.com" onChange={this.handleChange} />
                            </Form.Group>

                        </Form>
                        <Link to="/">
                            <Button onClick={this.addContact} variant="primary">Add Contact</Button>
                        </Link>

                    </Card.Body>
                </Card>
            </div>
        )
    }
}