const express = require('express');
const users = require('./users');
const activities = require('./activities');
const purchasesOrders = require('./purchasesOrders');
const products = require('./products');



const router = express.Router();

router.use('/users', users);
router.use('/activities', activities);
router.use('/purchasesorders', purchasesOrders);
router.use('/products', products);

module.exports = router;

