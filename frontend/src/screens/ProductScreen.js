import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem } from 'react-bootstrap'
import products from '../products'
import Rating from '../components/Rating'

const ProductScreen = () => {
    const { id: productId } = useParams();
    const currentProduct = products.find((p) => p._id === productId);

    return (
        <>
            <Link to={`/`} className='btn btn-light my-3'>Go Back</Link>
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
                            <ListGroupItem>
                                <Button className='btn-block' type='button' disabled={currentProduct.countInStock === 0}>Add to Cart</Button>
                            </ListGroupItem>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen