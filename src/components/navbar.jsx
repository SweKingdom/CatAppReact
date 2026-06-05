import { Container, Nav, Navbar, Badge } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import { CartFill } from "react-bootstrap-icons";
import useCart from '../context/UseCart';

function NavbarComp() {
    const { totalItems } = useCart();
    return (
        <Navbar bg="dark" variant="dark" expand="md" sticky="top">
            <Container>
                <Navbar.Brand as={NavLink} to="/" style={{ color: '#ff6600', fontWeight: 700 }}>
                    Catstore
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="main-nav" />
                <Navbar.Collapse id="main-nav">
                    <Nav className="ms-auto">
                        <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
                        <Nav.Link as={NavLink} to="/cats" end>Cats</Nav.Link>
                        <Nav.Link as={NavLink} to="/cart" end>
                            <CartFill className="me-1" />
                            Cart{' '}
                            {totalItems > 0 && (
                                <Badge bg="warning" text="dark" pill>{totalItems}</Badge>
                            )}
                        </Nav.Link>
                        <Nav.Link as={NavLink} to="/about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    ) 
}

export default NavbarComp;