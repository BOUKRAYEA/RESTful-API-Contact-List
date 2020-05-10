import React, { Component } from 'react'
import axios from 'axios'
import { Card, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const inputsCheck = ({ name, phone, email }) => {
    let isValid = false
    console.log({ name, phone, email })
    const isEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
    if (name.length === 0) alert("Name can't be blank")
    else if (phone.toString().length !== 8) alert("Please check your phone number");
    else if (!isEmail) alert("Please check your e-mail");
    else isValid = true
    return isValid
};


export default class EditContact extends Component {
    state = {
        contact: {
            id: "",
            name: "",
            phone: "",
            email: ""
        }
    }

    componentDidMount() {
        axios.get(`http://localhost:4000/contacts/${this.props.match.params.id}`)
            .then(res => {
                this.setState({
                    contact: res.data
                })
            })
    }

    editContact = (e) => {
        const { name, phone, email } = this.state.contact
        inputsCheck(this.state.contact) ? axios.put(`http://localhost:4000/edit_contact/${this.props.match.params.id}`, { name, email, phone }) : e.preventDefault();
    }

    render() {
        const { name, phone, email } = this.state.contact
        return (
            <div>
                <Card className="text-center">
                    <Card.Header as="h2">Edit Contact</Card.Header>
                    <Card.Body>

                        <Form>
                            <Form.Group controlId="formBasicName">
                                <Form.Label as="h5">Name</Form.Label>
                                <Form.Control type="text" name="name" value={name} maxLength="30" placeholder="i.e. Ali" onChange={(event) => this.setState({
                                    contact: { ...this.state.contact, name: event.target.value }
                                })} />
                            </Form.Group>
                            <Form.Group controlId="formBasicPhone">
                                <Form.Label as="h5">Phone number</Form.Label>
                                <Form.Control type="number" name="phone" value={phone} placeholder="i.e. 98 314 209" onChange={(event) => this.setState({
                                    contact: { ...this.state.contact, phone: event.target.value }
                                })} />
                            </Form.Group>

                            <Form.Group controlId="formBasicEmail">
                                <Form.Label as="h5">Email address</Form.Label>
                                <Form.Control type="email" name="email" value={email} maxLength="30" placeholder="i.e. ali@e-mail.com" onChange={(event) => this.setState({
                                    contact: { ...this.state.contact, email: event.target.value }
                                })} />
                            </Form.Group>

                        </Form>
                        <Link to="/">
                            <Button onClick={this.editContact} variant="success">
                                Edit Contact
                            </Button>
                        </Link>

                    </Card.Body>
                </Card>
            </div>
        )
    }
}
