const express = require('express');

const route = express.Router();

const productTypeController = require('../Controllers/ProductType');
const productsController = require('../Controllers/Products');
const itemsController = require('../Controllers/items');
const userController = require('../Controllers/Users');
const ordersController = require('../Controllers/Orders');
const paymentGatewayController = require('../Controllers/Payments');


route.get('/productTypes', productTypeController.getProduct_Type);
route.post('/filter',productsController.productsFilter);
route.get('/product/:proId',productsController.getProductsDetailByProId);
route.get('/items/:proId',itemsController.getItemsByresId);
route.post('/login',userController.UserLogin);
route.post('/signup',userController.userSignup);
route.post('/order',ordersController.saveordersDetails);
route.get('/orders/:userId',ordersController.getordersByUserId);
route.post('/payment',paymentGatewayController.payment);
route.post('/callback', paymentGatewayController.callback);

module.exports = route;