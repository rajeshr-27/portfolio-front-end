import React,{useState,useEffect} from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Card from 'react-bootstrap/esm/Card';
import Modal from 'react-bootstrap/esm/Modal';
import Button from 'react-bootstrap/esm/Button';
import Form from 'react-bootstrap/esm/Form';
import Col from 'react-bootstrap/esm/Col';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Image from "react-bootstrap/esm/Image";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { toast } from 'react-toastify';
import { fetchUserDetails } from './api';
import { fetchBioData } from './api';

function MyAccount() {
    const navigate = useNavigate();
    const API_URL = process.env.REACT_APP_API_URL
    //Fetch Authenticate user
    const {user,token} = useSelector((state) => state.users);
    const[userDetails, setUserDetails] = useState([]);
    //Initial form data
    const [frmData,setFrmData] = useState({
        name:'',
        email:'',
        mobile_number:'',
        gender:'',
        dob:'',
        country:'',
        state:'',
        city:'',
        pincode:'',
        profile_type:''
    })

    //Initial Bio form data
    const initialBioState = {
            photo:'',
            summary:'',
            portfolio:'',
            github:'',
            linkedin:'',
            instagram:'',
            ebook:'',
            userId:''
        }
    const [frmBioData, setFrmBioData] = useState(initialBioState)
    const [userBioDetails, setUserBioDetails] = useState(initialBioState);

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');

    const [show, setShow] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    //Bio model action
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //profile model action
    const handleProfileClose = () => setShowProfile(false);
    const handleProfileShow = () => setShowProfile(true);    
    
    useEffect(()=> {
        //Fetch countries
        const fetchCountries = async () => {          
            const response = await axios.get(`${API_URL}/region/countries`);
            setCountries(response.data.countries);
        }
        fetchCountries();
    },[API_URL])
    useEffect(()=>{
        if(user._id){  
             //get User full details
             const fetchData = async () => {
                const details = await fetchUserDetails(user._id);
                if(details.status === 1){
                    setUserDetails(details.user[0]);
                    setFrmData(details.user[0]);
                    setSelectedCountry(details.user[0].country);
                    setSelectedState(details.user[0].state);
                }
                

             }
             fetchData();            
            //setUserDetails(details);
             //get bio data
             const fetchBioDataDetails  = async () => {
                const details = await fetchBioData(user._id)
                if(details.status === 1){
                    setUserBioDetails(details.biodata[0]);
                    setFrmBioData(details.biodata[0]);
                }
               
             }
             fetchBioDataDetails();
             
        }      
    },[user])

    //Fetch states
    useEffect( ()=> {
        if(selectedCountry){
            const fetchStates = async () => {
                const response = await axios.get(`${API_URL}/region/states/${selectedCountry}`);
                setStates(response.data.states);
            }
            fetchStates();    
        }
    },[selectedCountry,API_URL])

    //Fetch cities
    useEffect(()=> {
        if(selectedState){
            const fetchCities = async () => {
                const response = await axios.get(`${API_URL}/region/cities/${selectedState}`);
                setCities(response.data.cities);
            }
            fetchCities();
        }
    },[selectedState,API_URL])    

    //Country on change
    const handleCountryChange = (e) => {
        setSelectedCountry(e.target.value);
        setSelectedState('');
        setFrmData({
            ...frmData,
            country:e.target.value
        })
    }

    const handleViewPortfolio = (e) => {
        toast.error('Please update Bio data')
    }

    //State on change
    const handleStateChange = (e) => {
        setSelectedState(e.target.value);
        setFrmData({
            ...frmData,
            state:e.target.value
        })
    }

    // Mobilenumber or pincode number only allowed
    const handleKeyPress = (event) => {
        const charCode = event.which ? event.which : event.keyCode;
        console.log(charCode);
        if(charCode > 31 && (charCode < 48 || charCode > 57)){
            event.preventDefault();
        }
    }

    //updata state change the frmdata
    const handleChange = (e) => {
        const {name,value} = e.target;
        setFrmData({
            ...frmData,
            [name]:value
        })
    }

     //updata state change the frmBiodata
     const handleBioChange = (e) => {
        const {name,value,files} = e.target;
        setFrmBioData({
            ...frmBioData,
            [name]:(files) ? files[0]:value
        })
    }

    const handleSummaryChange = (value) => {      
        console.log(frmBioData);  
        setFrmBioData({
            ...frmBioData,
           summary:value
        })
    }

    //Submit form handling
    const handleSubmit = async (e) => {
        e.preventDefault();  
        setIsLoading(true);     
        try{
            const postData = new FormData();
            postData.append('data', JSON.stringify(frmData));
            const response = await axios.put(`${API_URL}/user/${user._id}`, postData,{
                headers:{
                    Authorization : `Bearer ${token}`
                }
            }); 
            toast.success(response.data.message);      
            setShowProfile(false);

            const fetchData = async () => {
                const details = await fetchUserDetails(user._id);
                if(details.status === 1){
                    setUserDetails(details.user[0]);
                    setFrmData(details.user[0]);
                    setSelectedCountry(details.user[0]);
                    setSelectedState(details.user[0]);
                }

             }
             fetchData();;
        }catch(error){
            if(error.response){
                toast.error(error.response.data.message)
                if(error.response.status === 401){
                    navigate('/login',{replace:true})
                }
            }           
        }finally{
            setIsLoading(false);
        }
    }

     //Submit Bio form handling
     const handleBioSubmit = async (e) => {
        
        e.preventDefault(); 
        setIsLoading(true);    
        frmBioData.userId = user._id
        const postData = new FormData();
        postData.append('photo', frmBioData.photo);
        postData.append('data', JSON.stringify(frmBioData));
        if(userBioDetails._id){
            //update
            console.log('update');
            try{
                const response = await axios.put(`${API_URL}/user/update-bio-data/${userBioDetails._id}`, postData,{
                    headers:{
                        Authorization : `Bearer ${token}`
                    }
                }); 
                toast.success(response.data.message);      
                setShow(false);
                const fetchBioDataDetails  = async () => {
                    const details = await fetchBioData(user._id)
                    if(details.status === 1){
                        setUserBioDetails(details.biodata[0]);
                        setFrmBioData(details.biodata[0]);
                    }                    
                }
                fetchBioDataDetails();
            }catch(error){
                if(error.response){
                    toast.error(error.response.data.message)
                    if(error.response.status === 401){
                        navigate('/login',{replace:true})
                    }
                }
            }finally {
                setIsLoading(false);
            }
            
        }else {
            try{
                const response = await axios.post(`${API_URL}/user/add-bio-data`, postData,{
                    headers:{
                        Authorization : `Bearer ${token}`
                    }
                }); 
                toast.success(response.data.message);      
                setShow(false);
                const fetchBioDataDetails  = async () => {
                    const details = await fetchBioData(user._id)
                    setUserBioDetails(details.biodata[0]);
                    setFrmBioData(details.biodata[0]);
                    }
                    fetchBioDataDetails();
            }catch(error){
                toast.error(error.response.data.message)
            } finally {
                setIsLoading(false);
            }               
        }            
    }
    return (
    <div className='content my-account'>
        <Container> 
            <Row>
                <Card  className='mt-5'>
                <Row className='mb-3 mt-3'>
                    <Col className=''>
                        {
                            (userBioDetails.photo)
                            ?
                            <Link to={(userBioDetails.photo) ?`/view-bio/${userDetails._id}`:''} target='_blank' className='btn btn-info btn-sm float-end'>View Portfolio</Link>
                            :
                            <Link onClick={handleViewPortfolio} className='btn btn-info btn-sm float-end'>View Portfolio</Link>
                        }
                        
                        <Link className='btn btn-primary btn-sm float-end' onClick={handleShow} style={{"marginRight":"15px"}}>Edit Bio</Link> 
                        <Link className='btn btn-success btn-sm float-end' onClick={handleProfileShow}  style={{"marginRight":"15px"}}>Edit Profile</Link>   
                        
                    </Col>
                </Row>
                    <Row className=''>
                        <Col>
                        <Card.Body>
                            <Card.Title>Profile Details</Card.Title> 
                            <Table>
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>: {userDetails.name} </td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>: {userDetails.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Mobile Number</th>
                                        <td>: {userDetails.mobile_number}</td>
                                    </tr>
                                    <tr>
                                        <th>Gender</th>
                                        <td>: {userDetails.gender}</td>
                                    </tr>
                                    <tr>
                                        <th>Date Of Birth</th>
                                        <td>: {userDetails.dob}</td>
                                    </tr>
                                    <tr>
                                        <th>Country</th>
                                        <td>: { (Array.isArray(userDetails.country_data) && userDetails.country_data.length >0) 
                                         ? userDetails.country_data[0].name : '-'}</td>
                                    </tr>
                                    <tr>
                                        <th>State</th>
                                        
                                        <td>: { (Array.isArray(userDetails.state_data) && userDetails.state_data.length >0) 
                                         ? userDetails.state_data[0].name : '-'}</td>
                                    </tr>
                                    <tr>
                                        <th>City</th> 
                                         <td>: { (Array.isArray(userDetails.city_data) && userDetails.city_data.length >0) 
                                         ? userDetails.city_data[0].name : '-'}</td>
                                    </tr>
                                    <tr>
                                        <th>Pincode</th>
                                        <td>: {userDetails.pincode}</td>
                                    </tr>
                                    <tr>
                                        <th>Profile Type</th>
                                        <td>: {userDetails.profile_type}</td>
                                    </tr>
                                </tbody>
                            </Table> 
                        </Card.Body>
                        </Col>
                        <Col>
                            <Card.Body>
                                <Card.Title>Bio Data</Card.Title> 
                                <Table>
                                    <tbody>
                                        {
                                            (userBioDetails)
                                            ? 
                                            <>
                                            <tr>
                                                <th>Photo</th>
                                                <td>                                               
                                                <Image className="profile-image" src={ userBioDetails.photo && `${API_URL}/${userBioDetails.photo}`} roundedCircle />
                                                </td>
                                            </tr>
                                            <tr>
                                                <th>Summary</th>
                                                <td> <div dangerouslySetInnerHTML={{__html:userBioDetails.summary}} /></td>
                                            </tr>
                                            <tr>
                                                <th>Portfolio</th>
                                                <td>: <Link to={userBioDetails.portfolio} style={{"textDecoration":"none"}}  target="_blank" >{userBioDetails.portfolio}</Link></td>
                                            </tr>
                                            <tr>
                                                <th>GitHub</th>
                                                <td>: <Link to={userBioDetails.github} style={{"textDecoration":"none"}} target="_blank" >{userBioDetails.github}</Link></td>
                                            </tr>
                                            <tr>
                                                <th>Linked In</th>
                                                <td>: <Link to={userBioDetails.linkedin} style={{"textDecoration":"none"}}  target="_blank" >{userBioDetails.linkedin}</Link></td>
                                            </tr>
                                            <tr>
                                                <th>Instagram</th>
                                                <td>: <Link to={userBioDetails.instagram} style={{"textDecoration":"none"}}  target="_blank" >{userBioDetails.instagram}</Link></td>
                                            </tr>
                                            <tr>
                                                <th>E-book</th>
                                                <td>: <Link to={userBioDetails.ebook} style={{"textDecoration":"none"}}  target="_blank" >{userBioDetails.ebook}</Link></td>
                                            </tr>
                                            </>
                                            : 
                                            <>
                                                <tr>
                                                    <td colSpan={2}></td>
                                                </tr>
                                            </>

                                        }
                                        
                                    </tbody>
                                </Table> 
                            </Card.Body>
                        </Col>
                    </Row>
                    
                </Card>
                { /***** Edit bio Modal */}
                <Modal show={show} onHide={handleClose} animation={false} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Update Bio Data
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form onSubmit={handleBioSubmit} encType='multipart/form-data'>
                            <Form.Group className="mb-3">
                                <Form.Label>Photo *</Form.Label>
                                <Form.Control name="photo" onChange={handleBioChange} type="file"  />
                            </Form.Group>     
                            {/* <Form.Group className="mb-3">
                                <Form.Label>Summary *</Form.Label>
                                <Form.Control as="textarea" name="summary" value={frmBioData.summary} onChange={handleBioChange}  rows={3} required />
                            </Form.Group> */}
                            <Form.Group className='mb-3'>
                                <Form.Label>Summary</Form.Label>
                                <ReactQuill
                                    className="react-quill-custom"
                                    value={frmBioData.summary} 
                                    onChange={handleSummaryChange}
                                    modules={MyAccount.modules}
                                    formats={MyAccount.formats}
                                    placeholder="Enter Summary"
                                    required
                                />
                            </Form.Group>
                            <Form.Group className="mb-3 mt-5">
                                <Form.Label>Portfolio </Form.Label>
                                <Form.Control name="portfolio" value={frmBioData.portfolio} onChange={handleBioChange} type="text" placeholder="Enter Portfolio Link" />
                            </Form.Group> 
                            <Form.Group className="mb-3">
                                <Form.Label>GitHub </Form.Label>
                                <Form.Control name="github" type="text" value={frmBioData.github} onChange={handleBioChange} placeholder="Enter GitHub Link"  />
                            </Form.Group>  
                            <Form.Group className="mb-3">
                                <Form.Label>LinkedIn </Form.Label>
                                <Form.Control name="linkedin" type="text" value={frmBioData.linkedin} onChange={handleBioChange} placeholder="Enter LinkedIn Link"  />
                            </Form.Group> 
                            <Form.Group className="mb-3">
                                <Form.Label>Instagram </Form.Label>
                                <Form.Control name="instagram" type="text" value={frmBioData.instagram} onChange={handleBioChange} placeholder="Enter Instagram Link"  />
                            </Form.Group>  
                            <Form.Group className="mb-3">
                                <Form.Label>E-book </Form.Label>
                                <Form.Control name="ebook" type="text" value={frmBioData.ebook} onChange={handleBioChange} placeholder="Enter E-book Link"  />
                            </Form.Group>  
                        
                            <Form.Group className="mb-3">
                                <div className="float-end mt-5" disabled={isLoading}>
                                    <Button type="submit" variant="primary">
                                       {(isLoading) ? 'Loading...' : 'Update'} 
                                    </Button>                                    
                                </div>
                            </Form.Group>  
                        </Form> 
                    </Modal.Body> 
                </Modal>
                { /**** Edit Profile */}
                <Modal show ={showProfile} onHide={handleProfileClose} size="lg">
                    <Modal.Header className='text-center' closeButton>
                       Update Profile
                    </Modal.Header>
                    <Modal.Body>
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
                                        <Form.Select name="country" value={frmData.country} onChange={handleCountryChange} required>                                                
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
                                        <Form.Label>City *</Form.Label>
                                        <Form.Select name="city"  value={frmData.city} onChange={handleChange} required>                                                
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
                            </Col>
                        </Row> 
                        <Row>
                            <Form.Group className="mb-3">
                            <div className="float-end mt-5" disabled={isLoading}>
                                    <Button type="submit" variant="primary">
                                       {(isLoading) ? 'Loading...' : 'Update'} 
                                    </Button>                                    
                                </div>
                            </Form.Group>  
                            
                        </Row>
                    </Form> 
                    </Modal.Body>
                </Modal> 
            </Row>
        </Container>
    </div>
    );    
  }
// Specify the modules to include in the toolbar
MyAccount.modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
  };
  
  // Specify the formats
  MyAccount.formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];  

  export default MyAccount;