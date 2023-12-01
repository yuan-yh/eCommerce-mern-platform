import bcrypt from "bcryptjs";

const users = [
    {
        name: 'admin', email: 'admin@gmail.com', password: bcrypt.hashSync('123456', 10), isAdmin: true
    },
    {
        name: 'austen', email: 'jane@gmail.com', password: bcrypt.hashSync('123456', 10), isAdmin: false
    },
    {
        name: 'beyle', email: 'henri@gmail.com', password: bcrypt.hashSync('123456', 10), isAdmin: false
    },
    {
        name: 'camus', email: 'albert@gmail.com', password: bcrypt.hashSync('123456', 10), isAdmin: false
    },
];

export default users;