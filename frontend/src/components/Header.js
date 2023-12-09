// Note:
// Use Router later to replace href for brand, cart, and login

import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import logo from '../assets/logo.png';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';


const Header = () => {
    const { cartItems } = useSelector((state) => state.cart);
    // console.log(cartItems);
    const { userInfo } = useSelector((state) => state.auth);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();

    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            // NOTE: here we need to reset cart state for when a user logs out so the next
            // user doesn't inherit the previous users cart and shipping
            // dispatch(resetCart());
            navigate('/login');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <header>
            <Navbar bg='dark' variant='dark' expand='md' collapseOnSelect>
                <Container>
                    <LinkContainer to='/'>
                        <Navbar.Brand>
                            <img src={logo} alt='eCommerce' />
                            eCommerce
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <LinkContainer to='/cart'>
                                <Nav.Link ><FaShoppingCart /> Cart
                                    {cartItems.length > 0 && (
                                        <Badge pill bg='success' style={{ marginLeft: '5px' }}>
                                            {cartItems.reduce((a, c) => a + c.qty, 0)}
                                        </Badge>
                                    )}
                                </Nav.Link>
                            </LinkContainer>
                            {/* Demonstrate different contents based on the user login state */}
                            {userInfo ? (
                                <>
                                    <NavDropdown title={userInfo.name} id='username'>
                                        <LinkContainer to='/profile'>
                                            <NavDropdown.Item>Profile</NavDropdown.Item>
                                        </LinkContainer>
                                        <NavDropdown.Item onClick={logoutHandler}>
                                            Logout
                                        </NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            ) : (
                                <LinkContainer to='/login'>
                                    <Nav.Link>
                                        <FaUser /> Sign In
                                    </Nav.Link>
                                </LinkContainer>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
export default Header;