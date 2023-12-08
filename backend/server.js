import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import connectDB from "./config/db.js";
// import products from './data/products.js';
import productRoutes from './routes/productRoutes.js';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Connect to MongoDB
connectDB();

const port = process.env.PORT;
const app = express()

app.get('/hello', (req, res) => { res.send('Hello eCommerce API!') });
app.use('/api/products', productRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => { console.log(`I am executed once the server successfully starts listening on the port ${port}.`) });
