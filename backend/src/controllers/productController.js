const productService = require("../services/productService");

const getProducts = async (req, res) => {
  try {
    const products = await productService.getAllProducts();

    res.status(200).json(products);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get products",
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, categoryId } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        error: "Product name is required",
      });
    }

    if (price === undefined || Number(price) < 0) {
      return res.status(400).json({
        error: "Valid product price is required",
      });
    }

    if (!categoryId || Number.isNaN(Number(categoryId))) {
      return res.status(400).json({
        error: "Category is required",
      });
    }

    const product = await productService.createProduct({
      name: name.trim(),
      description: description?.trim() || null,
      price,
      image: image?.trim() || null,
      categoryId,
    });

    res.status(201).json(product);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create product",
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, image, categoryId } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        error: "Product name is required",
      });
    }

    if (price === undefined || Number(price) < 0) {
      return res.status(400).json({
        error: "Valid product price is required",
      });
    }

    if (!categoryId || Number.isNaN(Number(categoryId))) {
      return res.status(400).json({
        error: "Category is required",
      });
    }

    const product = await productService.updateProduct(id, {
      name: name.trim(),
      description: description?.trim() || null,
      price,
      image: image?.trim() || null,
      categoryId,
    });

    res.status(200).json(product);
  } catch (error) {
    console.error(error);

    res.status(404).json({
      error: "Product not found",
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await productService.deleteProduct(id);

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(404).json({
      error: "Product not found",
    });
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};