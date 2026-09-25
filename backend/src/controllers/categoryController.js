const categoryService = require("../services/categoryService");

const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getAllCategories();

    res.status(200).json(categories);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to get categories",
    });
  }
};

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        error: "Category name is required",
      });
    }

    const category = await categoryService.createCategory(name.trim());

    res.status(201).json(category);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      error: "Failed to create category",
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    await categoryService.deleteCategory(id);

    res.status(204).send();
  } catch (error) {
    console.error(error);

    res.status(404).json({
      error: "Category not found",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        error: "Category name is required",
      });
    }

    const category = await categoryService.updateCategory(
      id,
      name.trim()
    );

    res.status(200).json(category);
  } catch (error) {
    console.error(error);

    res.status(404).json({
      error: "Category not found",
    });
  }
};

const patchCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name || typeof name !== "string" || name.trim() === "") {
      return res.status(400).json({
        error: "Category name is required",
      });
    }

    const category = await categoryService.patchCategory(id, {
      name: name.trim(),
    });

    res.status(200).json(category);
  } catch (error) {
    console.error(error);

    res.status(404).json({
      error: "Category not found",
    });
  }
};

module.exports = {
  getCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  patchCategory,
};