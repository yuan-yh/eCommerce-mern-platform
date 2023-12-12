import { Pagination } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Paginate = ({ pages, currentPage, role, keyword = '' }) => {
    return (
        (pages > 1) && (
            <Pagination>
                {[...Array(pages).keys()].map((x) => (
                    <LinkContainer
                        key={x + 1}
                        to={
                            (role === 'ADMIN') ? (`/admin/productlist/${x + 1}`) : (role === 'SELLER') ? (`/seller/productlist/${x + 1}`) : (
                                keyword
                                    ? `/search/${keyword}/page/${x + 1}`
                                    : `/page/${x + 1}`
                            )
                        }
                    >
                        <Pagination.Item active={x + 1 === currentPage}>{x + 1}</Pagination.Item>
                    </LinkContainer>
                ))}
            </Pagination>
        )
    );
};

export default Paginate;