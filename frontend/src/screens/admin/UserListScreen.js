import React from 'react';
import { Link } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {
    useDeleteUserMutation,
    useGetUsersQuery,
} from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserListScreen = () => {
    const { data: users, refetch, isLoading, error } = useGetUsersQuery();

    const [deleteUser, { isLoading: loeadingDelete }] = useDeleteUserMutation();
    const deleteHandler = async (id, name) => {
        // console.log("delete an user");
        if (window.confirm(`Confirm: delete the user ${name}?`)) {
            try {
                await deleteUser(id);
                toast.success(`${name} deleted`);
                refetch();
            } catch (e) {
                toast.error(e?.data?.message || e.error);
            }
        }
    };

    return (
        <>
            <h1>User List</h1>
            {loeadingDelete && <Loader />}
            {isLoading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.error}
                </Message>
            ) : (
                <Table striped bordered hover responsive className='table-sm'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ROLE</th>
                            <th>UPDATE</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td><Link to={`/user/public/${user._id}`}>{user.name}</Link></td>
                                <td>
                                    <a href={`mailto:${user.email}`}>{user.email}</a>
                                </td>
                                <td>
                                    {user.role === "ADMIN" ? (
                                        <strong style={{ color: 'gold' }}> Admin </strong>
                                    ) : user.role === "SELLER" ? (<span style={{ color: 'black' }}> Seller </span>
                                    ) : (<span> Buyer </span>)
                                    }
                                </td>
                                <td>
                                    {user.role !== "ADMIN" && (
                                        <>
                                            <LinkContainer
                                                to={`/admin/user/${user._id}/edit`}
                                                style={{ marginRight: '10px' }}
                                            >
                                                <Button variant='light' className='btn-sm'>
                                                    <FaEdit />
                                                </Button>
                                            </LinkContainer>
                                            <Button
                                                variant='danger'
                                                className='btn-sm'
                                                onClick={() => deleteHandler(user._id, user.name)}
                                            >
                                                <FaTrash style={{ color: 'white' }} />
                                            </Button>
                                        </>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>
    );
};

export default UserListScreen;