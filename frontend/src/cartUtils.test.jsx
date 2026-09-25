import { describe, it, expect } from "vitest";
import { addToCart } from "./cartUtils";

describe("Cart", () => {
  it("повинен додати новий товар до кошика", () => {
    const cart = [];

    const product = {
      id: 1,
      name: "Кава",
      price: "55",
    };

    const result = addToCart(cart, product);

    expect(result).toEqual([
      {
        id: 1,
        name: "Кава",
        price: "55",
        quantity: 1,
      },
    ]);
  });

  it("повинен збільшити кількість вже доданого товару", () => {
    const cart = [
      {
        id: 1,
        name: "Кава",
        price: "55",
        quantity: 1,
      },
    ];

    const product = {
      id: 1,
      name: "Кава",
      price: "55",
    };

    const result = addToCart(cart, product);

    expect(result[0].quantity).toBe(2);
  });
});