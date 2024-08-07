import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/features/loginSlice';
import logo from '../common/img/logo-.png';

function Header() {
    const dispatch = useDispatch();
    const {isAuth, user} = useSelector((state)=> state.users);

    const handleLogout = () => {
        dispatch(logout());
    }
  return (
    <>
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Link className="navbar-brand" to="/"><img class="profile-img" src={logo} style={{"height":"32px"}} alt="..." /></Link> 
                    {isAuth &&
                        <>
                         <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">                     
                                <NavDropdown title={user.name} id="basic-nav-dropdown">
                                    <Link to="/my-account" className='dropdown-item'>My Account</Link>
                                    <Link onClick={handleLogout}  className='dropdown-item'>Logout</Link>                                                              
                                </NavDropdown>
                            </Navbar.Collapse>
                        </>
                    }                
                   
            </Container>
        </Navbar>
        <Outlet />
    </>
  );
}

export default Header;