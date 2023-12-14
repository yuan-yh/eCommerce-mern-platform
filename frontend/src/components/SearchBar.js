import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const navigate = useNavigate();
    const { keyword: searchKey } = useParams();

    // FIX: uncontrolled input - searchKey may be undefined
    const [keyword, setKeyword] = useState(searchKey || '');

    const submitHandler = (e) => {
        e.preventDefault();
        if (keyword) {
            navigate(`/search/${keyword.trim()}`);
            // reset search keyword after each search
            setKeyword('');
        } else {
            navigate('/');
        }
    };

    return (
        <Form onSubmit={submitHandler} className='d-flex'>
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyword(e.target.value)}
                value={keyword}
                placeholder='Search Art Piece'
                className='mr-sm-2 ml-sm-5'
            ></Form.Control>
            <Button type='submit' variant='outline-light' className='p-2 mx-2'>
                Search
            </Button>
        </Form>
    );
};

export default SearchBar;