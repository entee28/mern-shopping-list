import React, { useState } from 'react'
import { Collapse, Nav, Navbar, NavbarBrand, NavbarToggler, NavItem } from 'reactstrap'
import LoginModal from './auth/LoginModal';
import Logout from './auth/Logout';
import RegisterModal from './auth/RegisterModal';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

const AppNavbar = (props) => {
    const [isOpen, setOpen] = useState(false);

    const toggle = () => {
        setOpen(!isOpen);
    }

    const { isAuthenticated, user } = props.auth;

    const authLinks = (
        <>
            <NavItem>
                <span className='navbar-text mr-3'>
                    <strong>{ user ? `Welcome ${user.name}` : null }</strong>
                </span>
            </NavItem>
            <NavItem>
                <Logout/>
            </NavItem>
        </>
    )

    const guestLinks = (
        <>
            <NavItem>
                <RegisterModal/>
            </NavItem>
            <NavItem>
                <LoginModal/>
            </NavItem>
        </>
    )

    return (
        <div>
            <Navbar color="dark" dark expand="sm" className="mb-5">
                    <NavbarBrand href='/'>ShoppingList</NavbarBrand>
                    <NavbarToggler onClick={toggle} />
                    <Collapse navbar isOpen={isOpen}>
                        <Nav className='ms-auto' navbar>
                            {isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Collapse>
            </Navbar>
        </div>
    )
}

AppNavbar.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
})

export default connect(mapStateToProps, null)(AppNavbar);
