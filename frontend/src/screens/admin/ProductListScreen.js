import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
// import Paginate from '../../components/Paginate';
import {
    useGetProductsQuery,
    useCreateProductMutation,
    // useDeleteProductMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
    const { data: products, isLoading, error, refetch } = useGetProductsQuery();
    // console.log(products);
    // const { pageNumber } = useParams();
    // const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber, });

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

    const createProductHandler = async () => {
        if (window.confirm('Confirm: create a new product?')) {
            try {
                await createProduct();
                refetch();
            } catch (e) {
                toast.error(e?.data?.message || e.error);
            }
        }
    };

    // const [deleteProduct, { isLoading: loadingDelete }] =
    //     useDeleteProductMutation();

    const deleteHandler = async (id) => {
        console.log("delete a product: ", id);
        //     if (window.confirm('Are you sure')) {
        //         try {
        //             await deleteProduct(id);
        //             refetch();
        //         } catch (err) {
        //             toast.error(err?.data?.message || err.error);
        //         }
        //     }
    };

    return (
        <>
            {/* <div>View All Products</div> */}
            <Row className='align-items-center'>
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className='text-end'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <FaPlus /> Create Product
                    </Button>
                </Col>
            </Row>

            {loadingCreate && <Loader />}
            {/* {loadingDelete && <Loader />} */}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error.data.message}</Message>
            ) : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>PRICE</th>
                                <th>CATEGORY</th>
                                <th>BRAND</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                // {data.products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>{product.name}</td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    <td>
                                        <LinkContainer to={`/seller/product/${product._id}/edit`}>
                                            <Button variant='light' className='btn-sm mx-2'>
                                                <FaEdit />
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(product._id)}
                                        >
                                            <FaTrash style={{ color: 'white' }} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {/* <Paginate pages={data.pages} page={data.page} isAdmin={true} /> */}
                </>
            )}
        </>
    );
};

export default ProductListScreen;