import React from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/esm/Image";
import ListGroup from "react-bootstrap/esm/ListGroup";
import Button from "react-bootstrap/esm/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAccusoft, faInstagram, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faContactBook } from "@fortawesome/free-regular-svg-icons";


function ViewBio(){
    return (
        <div className="view-bio" >
            <Container >
                <Row>
                    
                    <Col  className="mt-5">
                        <div className="section-1"> 
                            <div>
                                <Image className="profile-image" src="https://allmylinks.s3.amazonaws.com/avatar.webp" roundedCircle />
                            </div>
                            <div className="title">
                                <div>Test Portfolio</div>                               
                            </div>  
                            <div> <p>@tesemail</p></div>                           
                        </div>
                        <div className="section-2">
                            <ListGroup>
                                <ListGroup.Item>2 Years of experience as a web developer</ListGroup.Item>
                                <ListGroup.Item>Graduated in Information Security </ListGroup.Item>
                                <ListGroup.Item>Technician in Internet Computing</ListGroup.Item>
                                <ListGroup.Item>Looking for new opportunities </ListGroup.Item>
                                <ListGroup.Item>Gym lover</ListGroup.Item>
                            </ListGroup>
                        </div> 
                        <div className="section-3"> 

                        <div className="mt-5">
                            <div className="mb-3">
                            <Button variant="info" className="portfolio" size="lg">
                            <FontAwesomeIcon icon={faAccusoft} />  Portfolio
                            </Button>
                            </div>
                            <div className="mb-3">
                                <Button variant="secondary"  className="github" size="lg">
                                <FontAwesomeIcon icon={faGithub} />  GitHub
                                </Button>
                            </div>
                            <div className="mb-3">
                                <Button variant="secondary" className="linkedin" size="lg">
                                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                                </Button>
                            </div>
                            <div className="mb-3">
                                <Button variant="secondary" className="instagram" size="lg">
                                <FontAwesomeIcon icon={faInstagram} />   Instagram
                                </Button>
                            </div>
                            <div className="mb-3">
                                <Button variant="secondary" className="ebook" size="lg">
                                <FontAwesomeIcon icon={faContactBook} />   E-book
                                </Button>
                            </div>
                            </div>
                        </div>
                    </Col>  
                    
                </Row>
            </Container>
        </div>
    )
}

export default ViewBio;

