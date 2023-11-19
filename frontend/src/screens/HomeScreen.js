import { React, useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import axios from 'axios'
// import products from '../products'
import ProductCardFormat from '../components/ProductCard'

const HomeScreen = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchProducts = async () => {
            const { data } = await axios.get('/api/products');
            setProducts(data);
        };
        fetchProducts();
    }, []);

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