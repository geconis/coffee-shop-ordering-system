const cors = require("cors");
const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const menuItemRoutes = require("./routes/menuItemRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/menu-items", menuItemRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Coffee Shop API is running",
  });
});

app.use(errorHandler);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});