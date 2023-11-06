'use client';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'; 
import Navbar from 'react-bootstrap/Navbar'; 
import NavDropdown from 'react-bootstrap/NavDropdown'; 

const MyNavbar = () => {
    return (
        <Navbar expand="lg" className="shadow-sm ">
        <Container className='mr-0 w-100 d-flex justify-content-between'>
          <Navbar.Brand href="#home" >
            <Image src = '/NavbarImages/read.png' width={100} height={100} alt='Newspaper reading man'></Image>
              Weekly News
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='' >
            <Nav className="me-auto">
              <Nav.Link href="#home">U.S</Nav.Link>
              <Nav.Link href="#link">World</Nav.Link>
              <Nav.Link href="#link">Science</Nav.Link>
              <Nav.Link href="#link">Culture</Nav.Link>
              <Nav.Link href="#link">Autos</Nav.Link>
              <Nav.Link href="#link">Rankings</Nav.Link>
              <Nav.Link href="#link">Health</Nav.Link>
              <Nav.Link href="#link">Life</Nav.Link>
              <Nav.Link href="#link">Opinion</Nav.Link>
              <Nav.Link href="#link">Experts</Nav.Link>
              <Nav.Link href="#link"></Nav.Link>
              <NavDropdown title={true ? 'More' : <Image src='/NavbarImages/threeDots.png' alt='See more' width={10} height={10}></Image>} id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Beauty & Fashion</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.2">Business</NavDropdown.Item>
                <NavDropdown.Divider />  
                <NavDropdown.Item href="#action/3.3">Education</NavDropdown.Item>
                <NavDropdown.Divider />   
                <NavDropdown.Item href="#action/3.3">Fact Check</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>    
    )
}

export default MyNavbar;