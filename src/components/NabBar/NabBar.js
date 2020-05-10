import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
class NabBar extends Component {
    render() {
        return (
            <Navbar className="bg-dark justify-content-between" variant="dark">
                <Navbar.Brand href="/">RESTful API</Navbar.Brand>
                <Nav>
                    <Link to="/">
                        <Navbar.Text style={{ marginRight: '10px' }}>Contact List</Navbar.Text>
                    </Link>
                    <Link to="/add_contact">
                        <Navbar.Text>Add Contact</Navbar.Text>
                    </Link>
                </Nav>
            </Navbar>
        )
    }
}

export default NabBar
