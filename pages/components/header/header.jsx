import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import Style from './header.module.scss'

const Header = () => {

    const handleLoginCLick = () => {
        window.location.replace("/auth/login");
    }

    const handleRegisterCLick = () => {
        window.location.replace("/auth/register");
    }
    return (
        <Navbar expand="lg" fixed="top" className={Style.navbarCustom}>
            <Container>
                <Navbar.Brand href="#home" className={Style.navbarBrand}>Find My Buddy</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className={Style.nav + " " + "justify-content-end"}>
                        {/* className="mr-auto" */}
                        {/* <Nav.Link href="#home" className={Style.navLink}>Home</Nav.Link>
                        <Nav.Link href="#features" className={Style.navLink}>About us</Nav.Link>
                        <Nav.Link href="#Contact-us" className={Style.navLink}>Contact us</Nav.Link> */}
                        <Nav.Link className={Style.navLinkRight} onClick={handleLoginCLick}>Login</Nav.Link>
                        <Nav.Link className={Style.navLinkRight} onClick={handleRegisterCLick}>Register</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar >
    )
}

export default Header;