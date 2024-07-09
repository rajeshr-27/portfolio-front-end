import React,{useState, useEffect} from "react";
import Col from "react-bootstrap/esm/Col";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Image from "react-bootstrap/esm/Image";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import {
    Book,
    Github,
    Instagram,
    Linkedin,
    Moon,
    SunMedium,
    User,
  } from "lucide-react";


function ViewBio(){
    const API_URL = process.env.REACT_APP_API_URL;
    const {userId} = useParams();
    const navigate = useNavigate()
    const [userBioDetails, setUserBioDetails] = useState([]);
    const [isLightMode, setIsLightMode] = useState(true);

    const toggleTheme = () => {
        setIsLightMode((prevMode) => !prevMode);
      };
    

    
    
    useEffect(()=> {

        const fetchBioData = async () => {
            try{
                const response = await axios.get(`${API_URL}/user/bio-data/${userId}`);
                setUserBioDetails(response.data.biodata[0]);
            }catch(error){
                 
                navigate('/my-account',{replace:true})
            }      
            
        }
        if(!userId){
            navigate('/',{replace:true})
        }

        fetchBioData();

    },[navigate,userId, API_URL])

    return (
        <div className={`view-bio  ${
        isLightMode
          ?  "light-bg": "dark-bg"
      }`} >
            <Container >
                <Row>                    
                    <Col  className="mt-5">
                        <div className="section-1"> 
                            <div>
                                <Image className={`profile-image ${isLightMode ? "border-black/70" : "border-white/70"}`} src={ userBioDetails.photo && `${API_URL}/${userBioDetails.photo}`} roundedCircle />
                            </div>
                            <div className={`title  ${isLightMode ? "text-black" : "text-white"}` }>
                                <div>{(Array.isArray(userBioDetails.user_data) && userBioDetails.user_data.length > 0) ?  userBioDetails.user_data[0].name : ''}</div>                               
                            </div>  
                            <div className={`${isLightMode ? "text-black/50" : "text-white/50"}`}> <p>{(Array.isArray(userBioDetails.user_data) && userBioDetails.user_data.length > 0) ?  userBioDetails.user_data[0].email : ''}</p></div>                           
                        </div>
                        <div className="section-2">
                            <p className={`${isLightMode ? "text-black/70" : "text-white/70"}`} dangerouslySetInnerHTML={{__html:userBioDetails.summary}} />
                            {/* <ListGroup>
                                <ListGroup.Item>2 Years of experience as a web developer</ListGroup.Item>
                                <ListGroup.Item>Graduated in Information Security </ListGroup.Item>
                                <ListGroup.Item>Technician in Internet Computing</ListGroup.Item>
                                <ListGroup.Item>Looking for new opportunities </ListGroup.Item>
                                <ListGroup.Item>Gym lover</ListGroup.Item>
                            </ListGroup> */}
                        </div> 
                        <div className="relative  m-1">
                                <button
                                onClick={toggleTheme}
                                className={`w-16 h-6 rounded-full group  border-2 transition-all duration-300  backdrop-filter-none backdrop-blur-3xl flex items-center ${
                                    isLightMode
                                    ? "border-gray-500 bg-black/15 hover:border-blue-900 "
                                    : "border-white bg-white/15 hover:border-blue-400"
                                }`}
                                >
                                <button
                                    className={`w-8 h-8 absolute transition-all duration-300  transform top-3 -translate-y-1/2 z-10  border-0 rounded-full flex justify-center items-center ${
                                    isLightMode
                                        ? "right-enter bg-black text-white group-hover:bg-blue-900 group-hover:text-yellow-400"
                                        : "left-enter bg-white text-black group-hover:bg-blue-400 group-hover:text-yellow-300"
                                    }`}
                                >
                                    {isLightMode ? <Moon size={20} /> : <SunMedium size={20} />}
                                </button>
                                </button>
                            </div>
                        <div className="section-3"> 
                        <div className="mt-5">
                            <div className="mb-3">
                                <Link  to={userBioDetails.portfolio} className={`portfolio  group px-10 flex flex-row gap-2 justify-center rounded-lg border-2  ${
            isLightMode
              ? "bg-black/10 text-black border-black/40 hover:border-black"
              : "bg-white/10 text-white border-white/40 hover:border-white"
          } btn btn-secondary`}>
                                    <User  />  Portfolio
                                </Link>
                            </div>
                            <div className="mb-3">
                                <Link to={userBioDetails.github} className={`github  group px-10 flex flex-row gap-2 justify-center rounded-lg border-2  ${
            isLightMode
              ? "bg-black/10 text-black border-black/40 hover:border-black"
              : "bg-white/10 text-white border-white/40 hover:border-white"
          } btn btn-secondary`}>
                                    <Github  />  GitHub
                                </Link>
                            </div>
                            <div className="mb-3">
                                <Link to={userBioDetails.linkedin} className={`linkedin  group px-10 flex flex-row gap-2 justify-center rounded-lg border-2  ${
            isLightMode
              ? "bg-black/10 text-black border-black/40 hover:border-black"
              : "bg-white/10 text-white border-white/40 hover:border-white"
          } btn btn-secondary`} >
                                    <Linkedin   />  LinkedIn
                                </Link>     
                                {/* <Button variant="secondary" className="linkedin" size="lg">
                                <FontAwesomeIcon icon={faLinkedin} /> LinkedIn
                                </Button> */}
                            </div>
                            <div className="mb-3">
                                <Link to={userBioDetails.instagram} className={`instagram  group px-10 flex flex-row gap-2 justify-center rounded-lg border-2  ${
            isLightMode
              ? "bg-black/10 text-black border-black/40 hover:border-black"
              : "bg-white/10 text-white border-white/40 hover:border-white"
          } btn btn-secondary`} >
                                    <Instagram />  Instagram
                                </Link>     
                                {/* <Button variant="secondary" className="instagram" size="lg">
                                <FontAwesomeIcon icon={faInstagram} />   Instagram
                                </Button> */}
                            </div>
                            <div className="mb-3">
                                <Link to={userBioDetails.ebook} className={`ebook  group px-10 flex flex-row gap-2 justify-center rounded-lg border-2  ${
            isLightMode
              ? "bg-black/10 text-black border-black/40 hover:border-black"
              : "bg-white/10 text-white border-white/40 hover:border-white"
          } btn btn-secondary`}>
                                    <Book />  E-book
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

