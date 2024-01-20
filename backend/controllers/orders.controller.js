const OrderItem = require('../models/order-item.model');
const Order = require('../models/order.model');

const getOrders = (req, res) => {
    Order.find().populate('userId', 'name email').sort({ 'dateOrdered': -1 })
        .then((orderList) => {
            res.status(200).json(orderList);
        })
        .catch((err) => {
            res.status(500).json({
                Error: err,
                Success: false
            })
        })
}

const getOrder = (req, res) => {
    var id = req.params.id;
    Order.findById(id)
        .populate('userId', 'name email')
        .populate({
            path: 'orderItemsIDs', populate: {
                path: 'productId', populate: 'categoryId'
            }
        })
        .then((orderDetails) => {
            if (orderDetails) {
                res.status(200).json({
                    Success: true,
                    orderDetails
                });
            }
            else {
                res.status(404).json({
                    Success: true,
                    message: 'Order is not found'
                });
            }
        })
        .catch((err) => {
            res.status(500).json({
                Error: err,
                Success: false
            })
        })
}

const postOders = async (req, res) => {

    let { orderItemsIDs, shippingAddress1, shippingAddress2, city, zip, country, phone, status, totalPrice, userId } = req.body;

    orderItemsIDs = Promise.all(orderItemsIDs.map(async (orderItem) => {

        let newOrderItem = new OrderItem({
            quantity: orderItem.quantity,
            productId: orderItem.productId
        })

        newOrderItem = await newOrderItem.save();

        return newOrderItem._id;
    }))

    orderItemsIDs = await orderItemsIDs;

    totalPrice = await Promise.all(orderItemsIDs.map(async (orderItemId) => {
        const orderItem = await OrderItem.findById(orderItemId).populate('productId', 'price');
        const price = orderItem.productId.price * orderItem.quantity;

        return price;
    }))

    totalPrice = totalPrice.reduce((a, b) => a + b, 0);

    var order = new Order({
        orderItemsIDs, shippingAddress1, shippingAddress2, city, zip, country, phone, status, totalPrice, userId
    })

    order.save()
        .then((createdOrder) => {
            res.status(201).json({
                Success: true,
                message: `Order with order id ${createdOrder.id} is created`,
                createdOrder
            });
        })
        .catch((err) => {
            res.status(500).json({
                Success: false,
                message: "Order create failed",
                Error: err,
            });
        })
}

const updateOrderStatus = (req, res) => {
    var id = req.params.id;
    var { status } = req.body;

    var order = {
        status
    }
    Order.findByIdAndUpdate(id, order, { new: true }).select('id status')
        .then((updatedStatus) => {
            if (updatedStatus) {
                res.status(200).json({
                    Success: true,
                    message: "The order status is updated",
                    updatedStatus
                })
            }
            else {
                res.status(404).json({
                    Success: false,
                    message: "The order with the given ID was not found"
                })
            }

        })
        .catch((err) => {
            res.status(400).json({
                Error: err,
                Success: false
            });
        })

}

const deleteOrder = (req, res) => {
    var id = req.params.id;

    Order.findByIdAndRemove(id)
        .then(async (deletedOrder) => {
            if (deletedOrder) {

                await deletedOrder.orderItemsIDs.map(async (orderItem) => {
                    await OrderItem.findByIdAndRemove(orderItem);
                })

                res.status(200).json({
                    Success: true,
                    message: `The order ${deletedOrder.id} is deleted`,
                })
            }
            else {
                res.status(404).json({
                    Success: false,
                    message: `The order is not found`
                })
            }
        })
        .catch((err) => {
            res.status(400).json({
                Success: false,
                Error: err
            })
        })
}

const getTotalSales = async (req, res) => {
    const totalSales = await Order.aggregate([
        { $group: { _id: null, totalsales: { $sum: '$totalPrice' } } }
    ])

    if (!totalSales) {
        return res.status(400).send('The order sales cannot be generated')
    }

    res.send({ totalsales: totalSales.pop().totalsales })
}

const getOrderCount = async (req, res) => {
    const orderCount = await Order.countDocuments()

    if (!orderCount) {
        res.status(500).json({ success: false })
    }
    res.send({
        orderCount: orderCount
    });
}

module.exports = { getOrders, getOrder, postOders, updateOrderStatus, deleteOrder, getTotalSales, getOrderCount };