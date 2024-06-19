import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

function Register() {
    return(
        <div className="content register">
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <Card className="mt-5 mb-5">
                            <Card.Body>
                            <Card.Title className="mb-5">Registration</Card.Title>
                            <Form>
                                <Form.Group className="mb-3">
                                    <Form.Label>First Name *</Form.Label>
                                    <Form.Control name="first_name" type="text" placeholder="Enter First Name" required />
                                </Form.Group>   
                                <Form.Group className="mb-3">
                                    <Form.Label>Email address *</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email Address" required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password *</Form.Label>
                                    <Form.Control name="password" type="text" placeholder="Enter Password" required />
                                </Form.Group> 
                                <Form.Group className="mb-3">
                                    <Form.Label>Mobile Number *</Form.Label>
                                    <Form.Control type="text" placeholder="Enter Mobile Number" required  />
                                </Form.Group>   
                                <Form.Group className="mb-3">
                                <div className="d-grid gap-2 mt-5">
                                    <Button type="submit" variant="primary">
                                       Register
                                    </Button>                                    
                                </div>
                                </Form.Group>  
                            </Form>
                            <p class="small fw-bold mt-2 pt-1 mb-0">Do you have an account? <Link to="/login" className="link-danger">Login</Link></p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register;