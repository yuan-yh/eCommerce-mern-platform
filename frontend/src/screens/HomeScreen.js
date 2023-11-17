import React from 'react'
import { Row, Col } from 'react-bootstrap'
import products from '../products'
import ProductCardFormat from '../components/ProductCard'

const HomeScreen = () => {
    return (
        <>
            <h1>Latest Products</h1>
            <Row>
                {products.map((currentProduct) =>
                    <Col key={currentProduct._id} sm={12} md={6} lg={4} xl={3}>
                        <ProductCardFormat product={currentProduct} />
                        {/* {ProductCardFormat(currentProduct)} */}
                    </Col>
                )}
            </Row>
        </>
    )
}

export default HomeScreen