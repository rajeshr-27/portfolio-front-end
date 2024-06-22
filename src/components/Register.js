import React,{useState,useEffect} from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Card from "react-bootstrap/esm/Card";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Register() {
    const {isAuth} = useSelector((state)=>state.users);
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL;
    const [frmData,setFrmData] = useState({
        name:'',
        email:'',
        password:'',
        mobile_number:'',
        gender:'',
        dob:'',
        country:'',
        state:'',
        city:'',
        pincode:'',
        profile_type:''
    })
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');



    useEffect(()=>{
        if(isAuth){
            navigate('/my-account',{replace:true})
        }
        const fetchCountries = async () => {
            //Fetch countries
            const response = await axios.get(`${API_URL}/region/countries`);
            setCountries(response.data.countries);
        }
        fetchCountries();
    },[])

    useEffect( ()=> {
        if(selectedCountry){
            const fetchStates = async () => {
                const response = await axios.get(`${API_URL}/region/states/${selectedCountry}`);
                setStates(response.data.states);

            }
            fetchStates();    
        }
    },[selectedCountry])

    useEffect(()=> {
        if(selectedState){
            const fetchCities = async () => {
                const response = await axios.get(`${API_URL}/region/cities/${selectedState}`);
                setCities(response.data.cities);
            }
            fetchCities();
        }
    },[selectedState])
    

    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
        setSelectedState('');
        setFrmData({
            ...frmData,
            country:e.target.value
        })
    }

    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setFrmData({
            ...frmData,
            state:e.target.value
        })
    }

    const handleKeyPress = (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        console.log(charCode);
        if(charCode > 31 && (charCode < 48 || charCode > 57)){
            event.preventDefault();
        }
    }

    const handleChange = (e) => {
        const {name,value} = e.target;
        setFrmData({
            ...frmData,
            [name]:value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();       
        try{
            const postData = new FormData();
            postData.append('data', JSON.stringify(frmData));
            const response = await axios.post(`${API_URL}/user`, postData);
            //setSuccessMsg(response.data.message);
            //alert(response.data.message);
            toast.success(response.data.message);
            navigate('/login',{replace:true})

        }catch(error){
            //setErrorMsg(error.response.data.message)
            toast.error(error.response.data.message);
        }
    }
    return(
        <div className="content register">
            <Container>
                <Row>
                    <Col xs={12}></Col>
                    <Col  xs={12}>
                        <Card className="mt-5 mb-5">
                            <Card.Body>
                                <Card.Title className="mb-5">Registration</Card.Title>                                
                                    <Form onSubmit={handleSubmit}>
                                        <Row>
                                            <Col xs={12} sm={6}> 
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Name *</Form.Label>
                                                        <Form.Control name="name"  value={frmData.name} onChange={handleChange} type="text" placeholder="Enter First Name" required />
                                                    </Form.Group>   
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Email address *</Form.Label>
                                                        <Form.Control type="email" name="email" value={frmData.email} onChange={handleChange}  placeholder="Enter Email Address" required />
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Password *</Form.Label>
                                                        <Form.Control name="password" value={frmData.password} onChange={handleChange}  type="password" placeholder="Enter Password" required />
                                                    </Form.Group> 
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Mobile Number *</Form.Label>
                                                        <Form.Control type="text" name="mobile_number" value={frmData.mobile_number} onKeyPress={handleKeyPress} onChange={handleChange}  placeholder="Enter Mobile Number" required  />
                                                    </Form.Group>   
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Gender *</Form.Label>
                                                        <Form.Select name="gender"  value={frmData.gender} onChange={handleChange} required>                                                
                                                            <option value="">---Select Gender---</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Other">Other</option>
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Date Of Birth *</Form.Label>
                                                        <Form.Control name="dob" type="date"  value={frmData.dob} onChange={handleChange}  placeholder="Enter Date Of Birth" required />
                                                    </Form.Group>  
                                            </Col>
                                            <Col xs={12} sm={6}>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Country *</Form.Label>
                                                        <Form.Select name="country" value={selectedCountry} onChange={handleCountryChange} required>                                                
                                                            <option value="">---Select country---</option>
                                                            {countries && 
                                                                countries.map((country,index) => (
                                                                    <option key={index} value={country.id}>{country.name}</option>
                                                                ))
                                                            }
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>State *</Form.Label>
                                                        <Form.Select name="state" value={frmData.state} onChange={handleStateChange} required>                                                 
                                                            <option value="">---Select state---</option>
                                                            {states && 
                                                                states.map((state, index) => (
                                                                    <option key={index} value={state.id}>{state.name}</option>
                                                                ))
                                                            }
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>City * </Form.Label>
                                                        <Form.Select name="city"  value={frmData.city} onChange={handleChange} required >                                                
                                                            <option value="">---Select city---</option>
                                                            { cities &&
                                                                cities.map((city, index) => (
                                                                    <option key={index} value={city.id}>{city.name}</option> 
                                                                ))} 
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Pincode *</Form.Label>
                                                        <Form.Control onKeyPress={handleKeyPress}  value={frmData.pincode} onChange={handleChange}  name="pincode" type="text" placeholder="Enter Pincode" required />
                                                    </Form.Group>  

                                                    <Form.Group className="mb-3">
                                                        <Form.Label>Profile Type *</Form.Label>
                                                        <Form.Select name="profile_type"  value={frmData.profile_type} onChange={handleChange} required>                                                
                                                            <option value="">---Select Profile Type---</option>
                                                            <option value="Student">Student</option> 
                                                            <option value="Salaried">Salaried</option> 
                                                            <option value="Self Employed">Self Employed</option> 
                                                            <option value="Still Exploring">Still Exploring</option> 
                                                        </Form.Select>
                                                    </Form.Group>
                                                    <Form.Group className="mb-3">
                                                        <div className="d-grid gap-2 mt-5">
                                                            <Button type="submit" variant="primary">
                                                            Register
                                                            </Button>                                    
                                                        </div>
                                                    </Form.Group>  
                                                    <p className="small fw-bold mt-2 pt-1 mb-0">Do you have an account? <Link to="/login" className="link-danger">Login</Link></p>
                                            </Col>
                                        </Row> 
                                    </Form>
                                
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col  xs={12}></Col>
                </Row>
            </Container>
        </div>
    )
}

export default Register;