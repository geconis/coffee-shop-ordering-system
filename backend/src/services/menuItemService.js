const prisma = require("./prisma");

const getAllMenuItems = async () => {
  return prisma.menuItem.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      category: true,
    },
  });
};

const getMenuItemById = async (id) => {
  return prisma.menuItem.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      category: true,
    },
  });
};

const createMenuItem = async (data) => {
  return prisma.menuItem.create({
    data: {
      name: data.name,
      description: data.description || null,
      price: data.price,
      image: data.image || null,
      categoryId: Number(data.categoryId),
    },
    include: {
      category: true,
    },
  });
};

const updateMenuItem = async (id, data) => {
  return prisma.menuItem.update({
    where: {
      id: Number(id),
    },
    data: {
      name: data.name,
      description: data.description || null,
      price: data.price,
      image: data.image || null,
      categoryId: Number(data.categoryId),
    },
    include: {
      category: true,
    },
  });
};

const deleteMenuItem = async (id) => {
  return prisma.menuItem.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  getAllMenuItems,
  getMenuItemById,
  createMenuItem,
  updateMenuItem,
  deleteMenuItem,
};