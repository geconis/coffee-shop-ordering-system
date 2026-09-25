const validateOrder = (req, res, next) => {
  const { items } = req.body;

  if (!Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      error: "Order must contain at least one item",
    });
  }

  for (const item of items) {
    if (
      !item.menuItemId ||
      !Number.isInteger(Number(item.menuItemId)) ||
      !item.quantity ||
      !Number.isInteger(Number(item.quantity)) ||
      Number(item.quantity) <= 0
    ) {
      return res.status(400).json({
        error: "Each order item must contain a valid menuItemId and quantity",
      });
    }
  }

  next();
};

module.exports = {
  validateOrder,
};