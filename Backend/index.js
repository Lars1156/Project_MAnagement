const express = require ('express');
const bodyParser = require('body-parser');
const {connection} = require('./connection')

const app = express();

// Database Connection 
connection('').then(()=>{
    console.log("Database Connection Successfully");
}).catch((error)=>{
    console.log("Database connection Failed", error);
    
})
app.listen(8808, ()=>{
    console.log('Server is Running On the 8808');
    
})