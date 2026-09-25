const express = require("express");
const orderController = require("../controllers/orderController");
const { validateOrder } = require("../middleware/validationMiddleware");

const router = express.Router();

router.post(
  "/",
  validateOrder,
  orderController.createOrder
);

module.exports = router;