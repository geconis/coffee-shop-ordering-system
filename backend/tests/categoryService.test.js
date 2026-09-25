import { describe, it, expect, vi } from "vitest";

vi.mock("../src/services/prisma", () => ({
  default: {
    category: {
      findMany: vi.fn(),
      create: vi.fn(),
    },
  },
}));

const prisma = (await import("../src/services/prisma")).default;
const categoryService = await import("../src/services/categoryService");

describe("Category Service", () => {
  it("повинен повернути список категорій", async () => {
    const categories = [
      { id: 2, name: "Холодні напої" },
      { id: 4, name: "Гарячі напої" },
    ];

    prisma.category.findMany.mockResolvedValue(categories);

    const result = await categoryService.getAllCategories();

    expect(result).toEqual(categories);
  });

  it("повинен створити нову категорію", async () => {
    const newCategory = {
      id: 5,
      name: "Десерти",
    };

    prisma.category.create.mockResolvedValue(newCategory);

    const result = await categoryService.createCategory("Десерти");

    expect(result).toEqual(newCategory);
  });
});