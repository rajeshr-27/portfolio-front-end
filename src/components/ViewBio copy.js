import React,{useState, useEffect} from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/esm/Image";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAccusoft, faInstagram, faLinkedin, faGithub } from "@fortawesome/free-brands-svg-icons";
import { faContactBook } from "@fortawesome/free-regular-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


function ViewBio(){
    const API_URL = process.env.REACT_APP_API_URL;
    const {userId} = useParams();
    const navigate = useNavigate()
    const [userBioDetails, setUserBioDetails] = useState([]);

    const fetchBioData = async () => {
        try{
            const response = await axios.get(`${API_URL}/user/bio-data/${userId}`);
            setUserBioDetails(response.data.biodata[0]);
        }catch(error){
            console.log(error.response.data.message);
            navigate('/',{replace:true})
        }      
        
    }
    
    useEffect(()=> {
        if(!userId){
            navigate('/',{replace:true})
        }

        fetchBioData();

    },[])

    return (
        <div className="view-bio" >
            <Container >
                <Row>                    
                    <Col  className="mt-5">
                        <div className="section-1"> 
                            <div>
                                <Image className="profile-image" src={`${API_URL}/${userBioDetails.photo}`} roundedCircle />
                            </div>
                            <div className="title">
                                <div>{(Array.isArray(userBioDetails.user_data) && userBioDetails.user_data.length > 0) ?  userBioDetails.user_data[0].name : ''}</div>                               
                            </div>  
                            <div> <p>{(Array.isArray(userBioDetails.user_data) && userBioDetails.user_data.length > 0) ?  userBioDetails.user_data[0].email : ''}</p></div>                           
                        </div>
                        <div className="section-2">
                            <p dangerouslySetInnerHTML={{__html:userBioDetails.summary}} />
                            {/* <ListGroup>
                                <ListGroup.Item>2 Years of experience as a web developer</ListGroup.Item>
                                <ListGroup.Item>Graduated in Information Security </ListGroup.Item>
                                <ListGroup.Item>Technician in Internet Computing</ListGroup.Item>
                                <ListGroup.Item>Looking for new opportunities </ListGroup.Item>
                                <ListGroup.Item>Gym lover</ListGroup.Item>
                            </ListGroup> */}
                        </div> 
                        <div className="section-3"> 
                        <div className="mt-5">
                            <div className="mb-3">
                                <Link  to={userBioDetails.portfolio} className="portfolio btn btn-info" size="lg">
                                    <FontAwesomeIcon icon={faAccusoft} />  Portfolio
                                </Link>
                            </div>
                            <div className="mb-3">
                                <Link to={userBioDetails.github} className="github btn btn-secondary" size="lg">
                                    <FontAwesomeIcon icon={faGithub} />  GitHub
                                </Link>
                            </div>
                            <div className="mb-3">
                                <Link to={userBioDetails.linkedin} className="linkedin btn btn-secondary" size="lg">
                                    <FontAwesomeIcon icon={faLinkedin} />  LinkedIn
                                </Link>     
                                {/* <Button variant="secondary" className="linkedin" size="lg">
                                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                                </Button> */}
                            </div>
                            <div className="mb-3">
                                <Link to={userBioDetails.instagram} className="instagram btn btn-secondary" size="lg">
                                    <FontAwesomeIcon icon={faInstagram} />  Instagram
                                </Link>     
                                {/* <Button variant="secondary" className="instagram" size="lg">
                                <FontAwesomeIcon icon={faInstagram} />   Instagram
                                </Button> */}
                            </div>
                            <div className="mb-3">
                                <Link to={userBioDetails.ebook} className="ebook btn btn-secondary" size="lg">
                                    <FontAwesomeIcon icon={faContactBook} />  E-book
                                </Link>     
                                {/* <Button variant="secondary" className="ebook" size="lg">
                                <FontAwesomeIcon icon={faContactBook} />   E-book
                                </Button> */}
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

