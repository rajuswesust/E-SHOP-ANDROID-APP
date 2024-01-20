const express = require('express');
const { getOrders, postOders, getOrder, updateOrderStatus, deleteOrder, getTotalSales, getOrderCount } = require('../controllers/orders.controller');


const router = express.Router();

router.get("/", getOrders);

router.get('/:id', getOrder);

router.post('/', postOders);

router.put("/:id", updateOrderStatus);

router.delete('/:id', deleteOrder);

router.get('/get/totalsales', getTotalSales);

router.get('/get/count', getOrderCount);

module.exports = router;