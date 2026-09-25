const prisma = require("./prisma");

const createOrder = async (items) => {
  const menuItemIds = items.map((item) => Number(item.menuItemId));

  const menuItems = await prisma.menuItem.findMany({
    where: {
      id: {
        in: menuItemIds,
      },
    },
  });

  if (menuItems.length !== menuItemIds.length) {
    throw new Error("One or more menu items not found");
  }

  const orderItems = items.map((item) => {
    const menuItem = menuItems.find(
      (product) => product.id === Number(item.menuItemId)
    );

    return {
      menuItemId: menuItem.id,
      quantity: Number(item.quantity),
      price: menuItem.price,
    };
  });

  const totalPrice = orderItems.reduce(
    (total, item) =>
      total + Number(item.price) * item.quantity,
    0
  );

  return prisma.order.create({
    data: {
      totalPrice,
      items: {
        create: orderItems,
      },
    },
    include: {
      items: {
        include: {
          menuItem: true,
        },
      },
    },
  });
};

module.exports = {
  createOrder,
};