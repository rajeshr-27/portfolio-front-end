import React,{useEffect, useState} from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { clearError, clearMessage, loginUser } from "../redux/features/loginSlice";
import { toast } from "react-toastify";
import Image from 'react-bootstrap/Image';
import registerimg from '../common/img/register.webp'
import { InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import logo from '../common/img/logo.png'

 
function Login() {
    const navigate = useNavigate();
    const {message,error, isAuth} = useSelector((state)=> state.users);
    const dispatch = useDispatch();
    const [frmData, setFrmData] = useState({
        email:'',
        password:''
    });

    useEffect(()=> {
        if(isAuth){
            navigate('/my-account',{replace:true})
        }
    },[])

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFrmData({
            ...frmData,
            [name] : value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const postData = new FormData();
        postData.append('data',JSON.stringify(frmData));
        dispatch(loginUser(postData));
    }
    if(message){
        //alert(message);
        toast.success(message);
        dispatch(clearMessage());
        navigate('/my-account',{replace:true})

    }
    if(error){
        //alert(error);
        toast.error(error);
        dispatch(clearError());

    }
    return(
        <div className="content register">
            <Container>
                <Row>
                    <Col xs={12}></Col>
                    <Col xs={12}>
                        <Card className="mt-5 mb-5">
                            <Card.Body>
                            {/* <Card.Title className="mb-5">Login</Card.Title> */}
                            <Form onSubmit={handleSubmit}> 
                                <Row>
                                    <Col xs={12} lg={6} className="d-none d-lg-block"> 
                                        <div class="left-section">
                                            <Image  src={registerimg} alt="registration" thumbnail />   
                                        </div>                                                   
                                    </Col>
                                    <Col xs={12} lg={6} className="">
                                        <Row>
                                            <Col className="text-center mb-3">
                                            <Image    src={logo} alt="logo" style={{"height":"120px", "width":"120px"}} thumbnail />  
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col><Card.Title className="mb-6"><h4>Login</h4></Card.Title></Col> 
                                        </Row>
                                        <Row>
                                            <Form.Group className="mb-4">
                                                {/* <Form.Label>Email address *</Form.Label> */}
                                                <InputGroup size="lg" >
                                                <InputGroup.Text>
                                                <FontAwesomeIcon icon={faUser} />
                                                </InputGroup.Text>
                                                <Form.Control name="email" value={frmData.email} onChange={handleChange} type="email" placeholder="Enter Email Address" required />

                                                </InputGroup>
                                            </Form.Group>
                                            <Form.Group className="mb-4">
                                                {/* <Form.Label>Password *</Form.Label> */}
                                                <InputGroup size="lg" >
                                                    <InputGroup.Text>
                                                    <FontAwesomeIcon icon={faKey} />
                                                    </InputGroup.Text>
                                                    <Form.Control name="password"  value={frmData.password} onChange={handleChange} type="password" placeholder="Enter Password" required />
                                                </InputGroup>
                                            </Form.Group>  
                                            <Form.Group className="mb-3">
                                                <div className="d-grid gap-2 mt-3">
                                                    <Button type="submit" variant="primary">
                                                    Login
                                                    </Button>                                    
                                                </div>
                                            </Form.Group> 
                                            <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/" className="link-danger">Register</Link></p> 
                                        </Row>
                                    </Col>
                                </Row>                                        
                            </Form>
                           
                            </Card.Body>
                        </Card>
                    </Col>
                    
                </Row>
                
            </Container>
        </div>
    )
}

export default Login;