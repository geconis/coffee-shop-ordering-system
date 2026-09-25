const prisma = require("./prisma");

const getAllProducts = async () => {
  return prisma.product.findMany({
    orderBy: {
      id: "asc",
    },
    include: {
      category: true,
    },
  });
};

const createProduct = async (data) => {
  return prisma.product.create({
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

const updateProduct = async (id, data) => {
  return prisma.product.update({
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

const deleteProduct = async (id) => {
  return prisma.product.delete({
    where: {
      id: Number(id),
    },
  });
};

module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};