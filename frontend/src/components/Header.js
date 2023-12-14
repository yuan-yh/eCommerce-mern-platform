// Note:
// Use Router later to replace href for brand, cart, and login

import React from 'react';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown, Badge } from 'react-bootstrap';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
// import logo from '../assets/logo5.png';
import logo from '../assets/logo3.gif';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import SearchBar from './SearchBar';


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
                            <img src={logo} alt='dayDream' style={{ height: '50px', width: '50px' }} />
                            dayDream
                        </Navbar.Brand>
                    </LinkContainer>

                    <Navbar.Toggle aria-controls='basic-navbar-nav' />
                    <Navbar.Collapse id='basic-navbar-nav'>
                        <Nav className='ms-auto'>
                            <SearchBar />
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
                                        {userInfo && userInfo.role === "SELLER" && (
                                            <LinkContainer to='/seller/productlist'>
                                                <NavDropdown.Item>View All Arts</NavDropdown.Item>
                                            </LinkContainer>
                                        )}
                                        {userInfo && userInfo.role === "SELLER" && (
                                            <LinkContainer to='/seller/orderlist'>
                                                <NavDropdown.Item>View All Orders</NavDropdown.Item>
                                            </LinkContainer>
                                        )}
                                        {userInfo && userInfo.role === "ADMIN" && (
                                            <LinkContainer to='/admin/productlist'>
                                                <NavDropdown.Item>View All Arts</NavDropdown.Item>
                                            </LinkContainer>
                                        )}
                                        {userInfo && userInfo.role === "ADMIN" && (
                                            <LinkContainer to='/admin/orderlist'>
                                                <NavDropdown.Item>View All Orders</NavDropdown.Item>
                                            </LinkContainer>
                                        )}
                                        {userInfo && userInfo.role === "ADMIN" && (
                                            <LinkContainer to='/admin/userlist'>
                                                <NavDropdown.Item>View All Users</NavDropdown.Item>
                                            </LinkContainer>
                                        )}
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

                            {/* Seller Links */}
                            {/* <Route path='/seller/product/:id/edit' element={<ProductEditScreen />} /> */}
                            {/* {userInfo && userInfo.role === "SELLER" && (
                                <NavDropdown title='Seller' id='sellermenu'>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )} */}

                            {/* Admin Links */}
                            {/* {userInfo && userInfo.role === "ADMIN" && (
                                <NavDropdown title='Admin' id='adminmenu'>
                                    <LinkContainer to='/admin/productlist'>
                                        <NavDropdown.Item>Products</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/orderlist'>
                                        <NavDropdown.Item>Orders</NavDropdown.Item>
                                    </LinkContainer>
                                    <LinkContainer to='/admin/userlist'>
                                        <NavDropdown.Item>Users</NavDropdown.Item>
                                    </LinkContainer>
                                </NavDropdown>
                            )} */}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </header>
    );
}
export default Header;