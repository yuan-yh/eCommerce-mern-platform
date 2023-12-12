import { React, useEffect, useState } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Form, Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
// import axios from 'axios'
// import products from '../products'
import { toast } from 'react-toastify';
import Rating from '../components/Rating'
import Loader from '../components/Loader';
import Message from '../components/Message';
import {
    useGetProductDetailsQuery,
    useCreateReviewMutation,
} from '../slices/productsApiSlice';
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
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [anonymous, setAnonymous] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: currentProduct, isLoading, refetch, error } = useGetProductDetailsQuery(productId);
    const { userInfo } = useSelector((state) => state.auth);

    const addToCartHandler = () => {
        dispatch(addToCart({ ...currentProduct, qty }));
        navigate('/cart');
    };

    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation();

    const submitHandler = async (e) => {
        e.preventDefault();
        // console.log(anonymous);
        try {
            await createReview({
                anonymous,
                productId,
                rating,
                comment,
            }).unwrap();
            refetch();
            toast.success('Review created successfully');
        } catch (e) {
            toast.error(e?.data?.message || e.error);
        }
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
                                    <Rating rating_value={currentProduct.rating} rating_text={`${currentProduct.numberReviews} Reviews`} />
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
                    <Row className='review'>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {/* {console.log(currentProduct)} */}
                            {currentProduct.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {currentProduct.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        {/* {console.log(review.anonymous)} */}
                                        <strong>{(review.anonymous) ? 'anonymous' : review.name}</strong>
                                        <Rating rating_value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>

                                    {loadingProductReview && <Loader />}

                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group className='my-2' controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    required
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group className='my-2' controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='3'
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Form.Group className='my-2' controlId='anonymous'>
                                                <Form.Check
                                                    type="switch"
                                                    id="anonymous-switch"
                                                    label="anonymous"
                                                    value={anonymous}
                                                    onChange={(e) => setAnonymous(e.target.checked)}
                                                />
                                            </Form.Group>
                                            <Button
                                                disabled={loadingProductReview}
                                                type='submit'
                                                variant='primary'
                                            >
                                                Submit
                                            </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please <Link to='/login'>sign in</Link> to write a review
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}

        </>
    )
}

export default ProductScreen