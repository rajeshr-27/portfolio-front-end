import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

function Login() {
    return(
        <div className="content register">
            <Container>
                <Row>
                    <Col></Col>
                    <Col>
                        <Card className="mt-5 mb-5">
                            <Card.Body>
                            <Card.Title className="mb-5">Login</Card.Title>
                            <Form> 
                                <Form.Group className="mb-3">
                                    <Form.Label>Email address *</Form.Label>
                                    <Form.Control type="email" placeholder="Enter Email Address" required />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Password *</Form.Label>
                                    <Form.Control name="password" type="text" placeholder="Enter Password" required />
                                </Form.Group>  
                                <Form.Group className="mb-3">
                                <div className="d-grid gap-2 mt-5">
                                    <Button type="submit" variant="primary">
                                       Login
                                    </Button>                                    
                                </div>
                                </Form.Group>  
                            </Form>
                            <p class="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/" className="link-danger">Register</Link></p>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Login;