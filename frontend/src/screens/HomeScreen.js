// import { React, useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import axios from 'axios'
// import products from '../products'
import ProductCardFormat from '../components/ProductCard';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const HomeScreen = () => {
    // const [products, setProducts] = useState([]);
    // useEffect(() => {
    //     const fetchProducts = async () => {
    //         const { data } = await axios.get('/api/products');
    //         setProducts(data);
    //     };
    //     fetchProducts();
    // }, []);

    // const { pageNumber, keyword } = useParams();

    // const { data: products, isLoading, error } = useGetProductsQuery(
    // {
    // keyword,
    // pageNumber,
    // }
    // );
    const { userInfo } = useSelector((state) => state.auth);
    const { pageNumber, keyword } = useParams();
    const { data, isLoading, error } = useGetProductsQuery({ keyword, pageNumber, });

    return (
        <>
            {keyword && <Link to={`/`} className='btn btn-light my-3'>Go Back</Link>}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : (
                <>
                    {userInfo ? (<h1>Welcome {userInfo.role} {userInfo.name} ;)</h1>) : (<h1>Welcome Anonymous Guest!</h1>)}
                    {keyword ? (<h2>Search Results</h2>) : (<h2>Latest Dreams</h2>)}
                    <Row>
                        {data.products.map((currentProduct) => (
                            <Col key={currentProduct._id} sm={12} md={6} lg={4} xl={3}>
                                <ProductCardFormat product={currentProduct} />
                                {/* {ProductCardFormat(currentProduct)} */}
                            </Col>
                        ))}
                    </Row>
                    <Paginate
                        pages={data.pages}
                        currentPage={data.page}
                        keyword={keyword ? keyword : ''}
                    />
                </>
            )}
        </>
    )
}

export default HomeScreen