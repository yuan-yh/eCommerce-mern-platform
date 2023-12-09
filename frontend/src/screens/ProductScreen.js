import { React, useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { Form, Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
// import axios from 'axios'
// import products from '../products'
import Rating from '../components/Rating'
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice'
import { addToCart } from '../slices/cartSlice';

const ProductScreen = () => {
    // const [products, setProducts] = useState([]);
    // const { id: productId } = useParams();
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const { data } = await axios.get(`/api/products/${productId}`);
    //         setProducts(data);
    //     };
    //     fetchProducts();
    // }, [productId]);

    // const currentProduct = products;

    const { id: productId } = useParams();
    const [qty, setQty] = useState(1);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: currentProduct, isLoading, error } = useGetProductDetailsQuery(productId);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...currentProduct, qty }));
        navigate('/cart');
    };

    return (
        <>
            <Link to={`/`} className='btn btn-light my-3'>Go Back</Link>

            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : (
                <>
                    <Row>
                        <Col md={5}>
                            <Image src={currentProduct.image} alt={currentProduct.name} fluid />
                        </Col>
                        <Col md={4}>
                            <ListGroup variant='flush'>
                                <ListGroupItem>
                                    <h3>{currentProduct.name}</h3>
                                </ListGroupItem>
                                <ListGroupItem>
                                    <Rating rating_value={currentProduct.rating} rating_text={`${currentProduct.numReviews} Reviews`} />
                                </ListGroupItem>
                                <ListGroupItem>Price: ${currentProduct.price}</ListGroupItem>
                                <ListGroupItem>Description: {currentProduct.description}</ListGroupItem>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>
                                                <strong>${currentProduct.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <Row>
                                            <Col>
                                                <strong>{currentProduct.countInStock > 0 ? 'In Stock' : 'Out Of Stock'}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroupItem>

                                    {currentProduct.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col>
                                                    <Form.Control
                                                        as='select'
                                                        value={qty}
                                                        onChange={(e) => setQty(Number(e.target.value))}
                                                    >
                                                        {[...Array(currentProduct.countInStock).keys()].map(
                                                            (x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            )
                                                        )}
                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroupItem>
                                        <Button className='btn-block' type='button' disabled={currentProduct.countInStock === 0} onClick={addToCartHandler}>Add to Cart</Button>
                                    </ListGroupItem>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}

        </>
    )
}

export default ProductScreen