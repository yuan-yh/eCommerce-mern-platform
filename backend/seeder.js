// NEED CHANGE BASED ON USER ROLES !!!
// All products are assigned to the same seller - admin.
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import colors from "colors";
import users from "./data/users.js";
import products from "./data/products.js";
import User from "./models/userModel.js";
import Product from "./models/productModel.js";
import Order from "./models/orderModel.js";
import connectDB from "./config/db.js";

connectDB();    // connect to the database

const importData = async () => {
    try {
        // Delete any record in these collections in the database
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Pass in the data and return an array
        const createUsers = await User.insertMany(users);
        // // Create the first user: admin with id 0
        // const adminUser = createUsers[0]._id;
        ////////////////////////////////////////////////////////////////////
        // Create a map of usernames to user IDs
        const userMap = {};
        createUsers.forEach(user => {
            userMap[user.name] = user._id;
        });

        // Map each product to the user ID based on the username
        const sampleProducts = products.map((product) => {
            if (!userMap[product.username]) {
                throw new Error(`User (Seller) ${product.username} not found`);
            }
            return { ...product, user: userMap[product.username] };
        });
        ////////////////////////////////////////////////////////////////////
        // const sampleProducts = products.map((product) => {
        //     return { ...product, user: adminUser };
        // })
        // const createProducts = async () => { await Product.insertMany(sampleProducts); }
        // createProducts();
        await Product.insertMany(sampleProducts);

        console.log("Data Imported!".green.inverse);
        process.exit();
    }
    catch (error) {
        console.log(`Error Message: ${error}`.red.inverse);
        process.exit(1);
    }
};

const destroyData = async () => {
    try {
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log("Data Destroyed".red.inverse);
        process.exit(0);
    }
    catch (error) {
        console.log(`Error Message: ${error}`.red.inverse);
        process.exit(1);
    }
};

// Command to import data: npm run data:import 
// Command to destroy data: npm run data:destroy
(process.argv[2] === '-d') ? destroyData() : importData();