import React, { useState } from 'react'
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap'
import Logout from './auth/Logout';
import RegisterModal from './auth/RegisterModal';

const AppNavbar = () => {
    const [isOpen, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!isOpen);
    }

    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                    <NavbarBrand href='/'>ShoppingList</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse navbar isOpen={isOpen}>
                        <Nav className='ms-auto' navbar>
                            <NavItem>
                                <RegisterModal></RegisterModal>
                            </NavItem>
                            <NavItem>
                                <Logout />
                            </NavItem>
                        </Nav>
                    </Collapse>
            </Navbar>
        </div>
    )
}

export default AppNavbar
