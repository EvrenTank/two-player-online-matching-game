'use client';
import Image from 'next/image';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav'; 
import Navbar from 'react-bootstrap/Navbar'; 
import NavDropdown from 'react-bootstrap/NavDropdown'; 

const MyNavbar = () => {
    return (
      <Container className=''>
        <Navbar expand="lg" className="shadow-sm ">
        <Container className='w-100 d-flex justify-content-between'>
          <Navbar.Brand href="#home" >
            <Image className='mx-2' src = '/NavbarImages/game-console.png' width={64} height={64} alt='Game Logo'></Image>
              I Play
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='' >
            <Nav className="me-auto">
              <NavDropdown title={true ? 'Choose a Game' : <Image src='/NavbarImages/threeDots.png' alt='See more' width={10} height={10}></Image>} id="basic-nav-dropdown">
                <NavDropdown.Item href="/tictactoe">Tic Tac Toe</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="minesweeper">MineSweeper</NavDropdown.Item>
                <NavDropdown.Divider />  
                <NavDropdown.Item href="matching-game">Matching Game</NavDropdown.Item>

              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>    
      </Container>
    )
}

export default MyNavbar;