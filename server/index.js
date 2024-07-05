// this index.js is entry point of our backend:
// A .js file is a JavaScript file. It contains JavaScript code that can be executed by web browsers, servers, 
// or other JavaScript runtime environments. JavaScript is a programming language commonly used for building 
// dynamic and interactive web applications.

// you can study about express js from here: https://www.geeksforgeeks.org/express-js/
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import bodyParser from 'body-parser';

import Connection from './database/db.js';
import Router from './routes/route.js';


const app=express();
dotenv.config();
app.use(cors());
app.use(bodyParser.json({extended: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', Router);
// The "port" in the context of web development refers to a communication endpoint that identifies a 
// specific process or service running on a computer within a network.

// In the case of web servers, the "port" typically refers to a number that specifies the 
// communication channel through which web clients (such as browsers) can connect to the 
// server to request resources or services.

// When you run a web server, you need to specify a port number on which the server will listen for 
// incoming HTTP requests. This allows clients to send requests to the server over the network.

// For example, when you type a URL like "http://example.com" into your browser's address bar, the 
// browser sends an HTTP request to the server hosting the website. This request includes the domain 
// name "example.com" and, optionally, a port number. If no port number is specified, the default port for
// HTTP requests is used, which is port 80. If a port number is specified, it is appended to the domain name with a colon, 
// like "http://example.com:8000".

// In Node.js and web development in general, you often specify a port number when starting your server 
// to listen for incoming connections. This allows you to run multiple servers on the same machine, each 
// listening on a different port.

// For example, if you start your server with app.listen(8000), it will listen for incoming connections on 
// port 8000. Clients can then connect to your server by specifying the server's IP address or domain name 
// followed by ":8000" in their requests.

const PORT=8000;

// app.listen(PORT, () => console.log(server is running on PORT ${PORT}));: This line starts the Express server 
// and makes it listen for incoming connections on the port specified by PORT. When the server starts successfully, it 
// logs a message to the console indicating that the server is running and on which port it's listening.
app.listen(PORT,()=>console.log(`server is running on PORT ${PORT}`));
const USERNAME=process.env.DB_USERNAME;
const PASSWORD=process.env.DB_PASSWORD;

Connection(USERNAME,PASSWORD);



