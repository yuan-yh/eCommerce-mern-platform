import bcrypt from "bcryptjs";

const users = [
    {
        name: 'admin', email: 'admin@gmail.com', password: bcrypt.hashSync('admin', 10), role: 'ADMIN'
    },
    {
        name: 'austen', email: 'jane@gmail.com', password: bcrypt.hashSync('austen', 10), role: 'SELLER'
    },
    {
        name: 'beyle', email: 'henri@gmail.com', password: bcrypt.hashSync('beyle', 10), role: 'SELLER'
    },
    {
        name: 'camus', email: 'albert@gmail.com', password: bcrypt.hashSync('camus', 10), role: 'BUYER'
    },
    {
        name: 'wilde', email: 'oscar@gmail.com', password: bcrypt.hashSync('wilde', 10), role: 'BUYER'
    },
];

export default users;