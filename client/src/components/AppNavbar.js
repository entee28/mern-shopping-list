import React, { useState } from 'react'
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap'

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
                                <NavLink href='https://github.com/entee28'>Github</NavLink>
                            </NavItem>
                        </Nav>
                    </Collapse>
            </Navbar>
        </div>
    )
}

export default AppNavbar
