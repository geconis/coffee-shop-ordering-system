const prisma = require("./prisma");

const getAllCategories = async () => {
  return prisma.category.findMany({
    orderBy: {
      id: "asc",
    },
  });
};

const createCategory = async (name) => {
  return prisma.category.create({
    data: {
      name,
    },
  });
};

const deleteCategory = async (id) => {
  return prisma.category.delete({
    where: {
      id: Number(id),
    },
  });
};

const updateCategory = async (id, name) => {
  return prisma.category.update({
    where: {
      id: Number(id),
    },
    data: {
      name,
    },
  });
};

const patchCategory = async (id, data) => {
  return prisma.category.update({
    where: {
      id: Number(id),
    },
    data,
  });
};

module.exports = {
  getAllCategories,
  createCategory,
  deleteCategory,
  updateCategory,
  patchCategory,
};