const menuItemService = require("../services/menuItemService");

const getMenuItems = async (req, res, next) => {
  try {
    const menuItems = await menuItemService.getAllMenuItems();

    res.status(200).json(menuItems);
  } catch (error) {
    next(error);
  }
};

const getMenuItemById = async (req, res, next) => {
  try {
    const menuItem = await menuItemService.getMenuItemById(req.params.id);

    if (!menuItem) {
      return res.status(404).json({
        error: "Menu item not found",
      });
    }

    res.status(200).json(menuItem);
  } catch (error) {
    next(error);
  }
};

const createMenuItem = async (req, res, next) => {
  try {
    const menuItem = await menuItemService.createMenuItem(req.body);

    res.status(201).json(menuItem);
  } catch (error) {
    next(error);
  }
};

const updateMenuItem = async (req, res, next) => {
  try {
    const menuItem = await menuItemService.updateMenuItem(
      req.params.id,
      req.body
    );

    res.status(200).json(menuItem);
  } catch (error) {
    next(error);
  }
};

const deleteMenuItem = async (req, res, next) => {
  try {
    await menuItemService.deleteMenuItem(req.params.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};