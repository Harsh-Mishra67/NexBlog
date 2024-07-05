import mongoose from "mongoose";


// hum directly express ka use karke mongodb se connection nahi bana sakte 
// iske liye humne external limbarary ka use karna padega 
// two famous library jiske through hum mongodb se connection bana sakete hai
// 1.) mongodb 2.) mongoose

// When building an application with Node.js and MongoDB, you cannot establish a 
// connection to the MongoDB database directly using only Express.js (which is a 
// web application framework for Node.js). Instead, you need to utilize external 
// libraries to interact with the MongoDB database.
// Two popular libraries for this purpose are mongodb and mongoose.

// and we will use mongoose to connect mongoDb and express(index.js):

// This connection function establishes a connection to a MongoDB database using the Mongoose library in a 
// Node.js application
const Connection = async(USERNAME,PASSWORD) => {
    // for exception handling we are using try and catch:
    const URL=`mongodb://${USERNAME}:${PASSWORD}@ac-n2dcwv3-shard-00-00.kem3hg1.mongodb.net:27017,ac-n2dcwv3-shard-00-01.kem3hg1.mongodb.net:27017,ac-n2dcwv3-shard-00-02.kem3hg1.mongodb.net:27017/?ssl=true&replicaSet=atlas-a0vgfr-shard-0&authSource=admin&retryWrites=true&w=majority&appName=blog-app`;
    try{
        await mongoose.connect(URL);
        console.log('Database connected successfuly');
    }
    catch(error){
        console.log('Error while connecting with the database',error);

    }
}
export default Connection;