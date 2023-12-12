import { useSelector, useDispatch } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { FaEdit, FaPlus, FaTrash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import Paginate from '../../components/Paginate';
import {
    useGetProductsQuery,
    useCreateProductMutation,
    useDeleteProductMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
    const { userInfo } = useSelector((state) => state.auth);
    // console.log(products);
    const { pageNumber } = useParams();
    const { data, isLoading, error, refetch } = useGetProductsQuery({ pageNumber, });

    const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();

    const createProductHandler = async () => {
        if (window.confirm('Confirm: instantiate a new dream?')) {
            try {
                await createProduct();
                refetch();
            } catch (e) {
                toast.error(e?.data?.message || e.error);
            }
        }
    };

    const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
    const deleteHandler = async (id, name) => {
        // console.log("delete a product: ", id);
        if (window.confirm(`Confirm: delete the dream: ${name}?`)) {
            try {
                await deleteProduct(id);
                toast.success(`${name} deleted`);
                refetch();
            } catch (e) {
                toast.error(e?.data?.message || e.error);
            }
        }
    };

    return (
        <>
            {/* <div>View All Products</div> */}
            <Row className='align-items-center'>
                <Col>
                    <h1>Dream List</h1>
                </Col>
                {userInfo.role === "SELLER" && (<Col className='text-end'>
                    <Button className='my-3' onClick={createProductHandler}>
                        <FaPlus /> Create Dream
                    </Button>
                </Col>)}
            </Row>

            {loadingCreate && <Loader />}
            {loadingDelete && <Loader />}
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
                                {userInfo && userInfo.role === "SELLER" && (<th>UPDATE</th>)}
                            </tr>
                        </thead>
                        <tbody>
                            {data.products.map((product) => (
                                // {data.products.map((product) => (
                                <tr key={product._id}>
                                    <td>{product._id}</td>
                                    <td>
                                        <LinkContainer to={`/product/${product._id}`}>
                                            <span>{product.name}</span>
                                        </LinkContainer>
                                    </td>
                                    <td>${product.price}</td>
                                    <td>{product.category}</td>
                                    <td>{product.brand}</td>
                                    {userInfo && userInfo.role === "SELLER" && (
                                        <td>
                                            <LinkContainer to={`/seller/product/${product._id}/edit`}>
                                                <Button variant='light' className='btn-sm mx-2'>
                                                    <FaEdit />
                                                </Button>
                                            </LinkContainer>
                                            <Button
                                                variant='danger'
                                                className='btn-sm'
                                                onClick={() => deleteHandler(product._id, product.name)}
                                            >
                                                <FaTrash style={{ color: 'white' }} />
                                            </Button>
                                        </td>
                                    )}
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    <Paginate pages={data.pages} currentPage={data.page} role={userInfo.role} />
                </>
            )}
        </>
    );
};

export default ProductListScreen;