const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const cors = require("cors");
const morgan = require('morgan'); //logging requests

const jwtAuthentication = require('./middlewares/jwt.middleware');
const errorHandling = require("./middlewares/errorHandling.middleware");

app.use(cors());
app.options(('*'), cors());

const dotenv = require('dotenv');
dotenv.config();

//middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(jwtAuthentication);
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));
app.use(errorHandling);


//Routes
const categoriesRoutes = require("./routes/categories.routes");
const productsRoutes = require("./routes/products.routes");
const usersRoutes = require("./routes/users.routes");
const ordersRoutes = require("./routes/orders.routes");

const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);

app.use((req, res, next) => {
    res.status(404).json({
        "message": "Error! Invalid APIs route",
    });
});

module.exports = app;