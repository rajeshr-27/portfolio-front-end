import React,{useState} from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/esm/Card';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import { Link } from 'react-router-dom';

function MyAccount() {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
    <Container>
        <Row>
            <Card  className='mt-5'>
                <Card.Body>
                    <Table striped bordered hover variant="light" responsive>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Mobile Number</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td>1</td>
                                <td>Test</td>
                                <td>test@gmail.com</td>
                                <td>8237237327327</td>
                                <td>
                                    <Link className='btn btn-primary' onClick={handleShow} style={{"margin-right":"15px"}}>Add</Link> 
                                    <Link to="/view-bio" className='btn btn-info'>View</Link>
                                </td>            
                        </tr> 
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
            { /***** Add bio Modal */}
            <Modal
                show={show} onHide={handleClose} animation={false}
                size="lg">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                     Add Bio Data
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>Photo *</Form.Label>
                            <Form.Control type="file" required />
                        </Form.Group>     
                        <Form.Group className="mb-3">
                            <Form.Label>Summary *</Form.Label>
                            <Form.Control as="textarea" rows={3} required />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Portfolio </Form.Label>
                            <Form.Control name="portfolio" type="text" placeholder="Enter Portfolio Link" />
                        </Form.Group> 
                        <Form.Group className="mb-3">
                            <Form.Label>GitHub </Form.Label>
                            <Form.Control name="github" type="text" placeholder="Enter GitHub Link"  />
                        </Form.Group>  
                        <Form.Group className="mb-3">
                            <Form.Label>LinkedIn </Form.Label>
                            <Form.Control name="linkedin" type="text" placeholder="Enter LinkedIn Link"  />
                        </Form.Group> 
                        <Form.Group className="mb-3">
                            <Form.Label>Instagram </Form.Label>
                            <Form.Control name="instagram" type="text" placeholder="Enter Instagram Link"  />
                        </Form.Group>  
                        <Form.Group className="mb-3">
                            <Form.Label>E-book </Form.Label>
                            <Form.Control name="ebook" type="text" placeholder="Enter E-book Link"  />
                        </Form.Group>  
                    
                        <Form.Group className="mb-3">
                            <div className="float-end mt-5">
                                <Button type="submit" variant="primary">
                                    Create
                                </Button>                                    
                            </div>
                        </Form.Group>  
                    </Form> 
                </Modal.Body> 
                </Modal>
        </Row>
    </Container>
    );
  }
  
  export default MyAccount;