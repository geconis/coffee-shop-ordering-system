const orderService = require("../services/orderService");

const createOrder = async (req, res, next) => {
  try {
    const { items } = req.body;

    const order = await orderService.createOrder(items);

    res.status(201).json(order);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createOrder,
};