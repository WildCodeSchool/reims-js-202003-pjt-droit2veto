const express = require('express')

const users = require('./users');
const activities = require('./activities');
const purchasesOrders = require('./purchasesOrders');
const products = require('./products');
const activitiesProducts = require('./activities_products')
const login = require('./auth');
const generatePdf = require('./generatePdf')

const router = express.Router();

router.use('/users', users);
router.use('/activities', activities);
router.use('/purchasesorders', purchasesOrders);
router.use('/products', products);
router.use('/activitiesproducts', activitiesProducts);
router.use('/login', login);
router.use('/generatePdf', generatePdf);

module.exports = router;

