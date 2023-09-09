// npm init
// npm install express nodemon mongoose

const express = require('express')
const app = express()
const port = 4000;
const mongoDB = require('./db');
const cors = require('cors');
mongoDB();


app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true // Allow credentials (cookies, headers)
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', require("./Routes/CreateUser"));
app.use('/api',require("./Routes/DisplayData"));
app.use('/api',require("./Routes/OrderData"));



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});