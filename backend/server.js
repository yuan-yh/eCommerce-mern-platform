import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import products from './data/products.js'

const port = process.env.PORT;
const app = express()

app.get('/hello', (req, res) => { res.send('Hello eCommerce API!') });
app.get('/api/products', (req, res) => { res.json(products) });
app.get('/api/products/:id', (req, res) => {
    const currentProduct = products.find((p) => p._id === req.params.id);
    res.json(currentProduct);
});

app.listen(port, () => { console.log(`I am executed once the server successfully starts listening on the port ${port}.`) });
