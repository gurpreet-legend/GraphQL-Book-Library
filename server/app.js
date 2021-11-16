const express = require('express');
const {graphqlHTTP} = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
require('dotenv').config();
const cors = require('cors');

const app = express();

//allow cross-origin request
app.use(cors());

//Connect to MongoDB :
const DB_URL = process.env.DB_URL;
mongoose.connect(DB_URL)
if(mongoose.connection.readyState) //Checking connection
    console.log('Connected to database')

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(4000, ()=>{
    console.log('Listening for request on port 4000');
})