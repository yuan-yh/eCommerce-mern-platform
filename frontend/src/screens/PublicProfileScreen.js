import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'
import { Table, Form, Button, Row, Col } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { FaTimes } from 'react-icons/fa';

import { toast } from 'react-toastify';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { useGetUserDetailsPublicQuery } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';

const PublicProfileScreen = () => {
    const { id: userId } = useParams();

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { data: currentUser, isLoading, refetch, error } = useGetUserDetailsPublicQuery(userId);

    return (
        <>
            {console.log(currentUser)}
            {/* <Link to={`/`} className='btn btn-light my-3'>Go Back</Link> */}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error?.data?.message || error.error}</Message>
            ) : (
                <>
                    <h1>Public Profile Screen </h1>
                    <Table striped bordered hover style={{ width: '50%', margin: '0 auto' }}>
                        <tbody>
                            <tr>
                                <td><strong>Name</strong></td>
                            </tr>
                            <tr>
                                <td>{currentUser.name}</td>
                            </tr>
                            <tr>
                                <td><strong>Role</strong></td>
                            </tr>
                            <tr>
                                <td>{currentUser.role}</td>
                            </tr>
                            <tr>
                                <td><strong>Created At</strong></td>
                            </tr>
                            <tr>
                                <td>{currentUser.createdAt}</td>
                            </tr>
                        </tbody>
                    </Table>
                </>
            )}

        </>
    )
}


export default PublicProfileScreen;