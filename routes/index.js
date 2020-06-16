const express = require('express');
const users = require('./users');
const activities = require('./activities');
const purchasesOrders = require('./purchasesOrders');

const router = express.Router();

router.use('/users', users);
router.use('/activities', activities);
router.use('/purchasesorders', purchasesOrders);

module.exports = router;
