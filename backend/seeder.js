/* 
This is not part of our server.
not part of the application. 
this is a seperate script that 
we are writing to bring the local 
data in to the mongo database. 
 */

/* packages */
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
/* data files */
import users from './data/users.js';
import products from './data/products.js';
/* schema/model files */
import User from './models/userModel.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';
/* database connection files */
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const importData = async () => {
    try {
        /* make sure the database is clear */
        await Order.deleteMany(); //with no arguments, this mongoose function deletes everything 
        await Product.deleteMany(); //with no arguments, this mongoose function deletes everything 
        await User.deleteMany(); //with no arguments, this mongoose function deletes everything 
        /* import the data */
        const createdUsers = await User.insertMany(users); //we're assigning the import data to a variable so we have access to the users. We need admin user id for product import
        const adminUser = createdUsers[createdUsers.findIndex( userObject => userObject.isAdmin === true)]._id;
        
        const sampleProducts = products.map( product => {
            //the spread operator (...) brings in all the properties of the original product object, then we add the id of the user we want for the user feild
            return { ...product, user: adminUser}
        });
        await Product.insertMany(sampleProducts);

        console.log("The data has been imported".green.inverse);
        process.exit();
    } catch (error) {
        console.error(`Import Error: ${error}`.red.inverse);
        process.exit(1);
    }
}

const destroytData = async () => {
    try {
        /* make sure the database is destroyed */
        await Order.deleteMany(); //with no arguments, this mongoose function deletes everything 
        await Product.deleteMany(); //with no arguments, this mongoose function deletes everything 
        await User.deleteMany(); //with no arguments, this mongoose function deletes everything 

        console.log("The data has been destoyed".yellow);
        process.exit();
    } catch (error) {
        console.error(`Destroy Error: ${error}`.red.inverse);
        process.exit(1);
    }
}
 /* argv[2] is the 3rd command line argument... 
    bashShell$ node backend/seeder -d
    -d is the 3rd argument */
//instead of running the command directly, we're going to edit the 
//package.json file with an import script command
if(process.argv[2] === "-d") {
    destroytData();
} else {
    importData();
}
