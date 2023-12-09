import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import cookieParser from 'cookie-parser';
import connectDB from "./config/db.js";
// import products from './data/products.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

// Connect to MongoDB
connectDB();

const port = process.env.PORT;
const app = express()

// Body parser middleware: parse the body data in the http request
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware
app.use(cookieParser());

app.get('/hello', (req, res) => { res.send('Hello eCommerce API!') });
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => { console.log(`I am executed once the server successfully starts listening on the port ${port}.`) });
