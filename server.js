const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

const mongoose= require("mongoose");
const uri = process.env.db_uri;
mongoose
    .connect(uri, {
        useNewUrlParser: true, 
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true})
    .then(() => {
        console.log(`Connected to DB ${uri}`)
	})
    .catch((err) => {
        console.log(`Error: ${err.message}`)
    });
const usersRoute = require("./routes/users");
const productsRoute = require("./routes/products");
const ordersRoute = require("./routes/orders");

app.use("/api/users/",usersRoute);
app.use("/api/products/",productsRoute);
app.use("/api/",ordersRoute);

const port = process.env.PORT || 9000;
app.listen(port, () => { 
  console.log('Server listening on port 9000'); 
});