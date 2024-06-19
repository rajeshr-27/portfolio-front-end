import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Outlet, Link } from 'react-router-dom';

function Header() {
  return (
    <>
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <Link className="navbar-brand" to="/">Portfolio</Link>                 
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">                     
                        <NavDropdown title="Mark Otto" id="basic-nav-dropdown">
                            <Link to="/my-account" className='dropdown-item'>My Account</Link>
                            <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>                            
                        </NavDropdown>
                    </Navbar.Collapse>
            </Container>
        </Navbar>
        <Outlet />
    </>
  );
}

export default Header;