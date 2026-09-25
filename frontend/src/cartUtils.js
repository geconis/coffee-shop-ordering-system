export const addToCart = (cart, product) => {
  const existingProduct = cart.find(
    (item) => item.id === product.id
  );

  if (existingProduct) {
    return cart.map((item) =>
      item.id === product.id
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cart, { ...product, quantity: 1 }];
};