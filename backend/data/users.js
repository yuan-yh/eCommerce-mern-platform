import bcrypt from "bcryptjs";

const users = [
    {
        name: 'Admin', email: 'admin@gmail.com', password: bcrypt.hashSync('admin', 10), role: 'ADMIN'
    },
    {
        name: 'Austen', email: 'jane@gmail.com', password: bcrypt.hashSync('austen', 10), role: 'SELLER'
    },
    {
        name: 'Beyle', email: 'henri@gmail.com', password: bcrypt.hashSync('beyle', 10), role: 'SELLER'
    },
    {
        name: 'Camus', email: 'albert@gmail.com', password: bcrypt.hashSync('camus', 10), role: 'BUYER'
    },
    {
        name: 'Wilde', email: 'oscar@gmail.com', password: bcrypt.hashSync('wilde', 10), role: 'BUYER'
    },
];

export default users;