import { useEffect, useState } from "react";
import "./index.css";

const API_URL = "http://localhost:3000/api";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showAdmin, setShowAdmin] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    categoryId: "",
  });
  const filteredProducts =
    selectedCategory === null
      ? products
      : products.filter(
          (product) => product.categoryId === selectedCategory
        );
  const addToCart = (product) => {
    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [
        ...currentCart,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const increaseQuantity = (productId) => {
  setCart((currentCart) =>
    currentCart.map((item) =>
      item.id === productId
        ? { ...item, quantity: item.quantity + 1 }
        : item
    )
  );
};

const decreaseQuantity = (productId) => {
  setCart((currentCart) =>
    currentCart
      .map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
      .filter((item) => item.quantity > 0)
  );
};

const removeFromCart = (productId) => {
  setCart((currentCart) =>
    currentCart.filter((item) => item.id !== productId)
  );
};

const deleteProduct = async (productId) => {
  try {
    const response = await fetch(
      `${API_URL}/products/${productId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Не вдалося видалити товар");
    }

    setProducts((currentProducts) =>
      currentProducts.filter((product) => product.id !== productId)
    );
  } catch (error) {
    alert("Не вдалося видалити товар");
  }
};

const updateProduct = async () => {
  try {
    const response = await fetch(
      `${API_URL}/products/${editingProduct.id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: editingProduct.name,
          description: editingProduct.description,
          price: editingProduct.price,
          image: editingProduct.image,
          categoryId: editingProduct.categoryId,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Не вдалося оновити товар");
    }

    const updatedProduct = await response.json();

    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === updatedProduct.id
          ? updatedProduct
          : product
      )
    );

    setEditingProduct(null);
  } catch (error) {
    alert("Не вдалося оновити товар");
  }
};

const createProduct = async () => {
  try {
    const response = await fetch(
      `${API_URL}/products`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      }
    );

    if (!response.ok) {
      throw new Error("Не вдалося додати товар");
    }

    const createdProduct = await response.json();

    setProducts((currentProducts) => [
      ...currentProducts,
      createdProduct,
    ]);

    setNewProduct({
      name: "",
      description: "",
      price: "",
      image: "",
      categoryId: "",
    });
  } catch (error) {
    alert("Не вдалося додати товар");
  }
};

  useEffect(() => {
    fetch(`${API_URL}/products`,)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Помилка завантаження товарів");
        }

        return response.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Не вдалося завантажити товари");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
  fetch(`${API_URL}/categories`)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Помилка завантаження категорій");
      }

      return response.json();
    })
    .then((data) => {
      setCategories(data);
    })
    .catch(() => {
      setError("Не вдалося завантажити категорії");
    });
}, []);

  return (
    <div className="container">
      <header className="header">
        <div className="header-top">
          <div>
            <h1>Кав'ярня</h1>
            <p>Онлайн-замовлення улюблених напоїв</p>
          </div>

          <div className="header-buttons">
            <button
              className="cart-button"
              onClick={() => setShowCart(!showCart)}
            >
              🛒 Кошик: {cart.length}
            </button>

            <button
              className="admin-button"
              onClick={() => {
                setShowAdmin(!showAdmin);
                setLoginError("");
              }}
            >
              Адмін-панель
            </button>
          </div>
        </div>
      </header>
      {showCart && (
      <section className="cart-section">
        <h2>Кошик</h2>

        {cart.length === 0 ? (
          <div className="message">
            <p>Кошик порожній.</p>
          </div>
        ) : (
          <div className="cart">
            {cart.map((item) => (
              <div className="cart-item" key={item.id}>
                <div>
                  <h3>{item.name}</h3>

                  <p>{item.price} грн за одиницю</p>

                  <div className="quantity-controls">
                    <button onClick={() => decreaseQuantity(item.id)}>
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button onClick={() => increaseQuantity(item.id)}>
                      +
                    </button>

                    <button
                      className="remove-button"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Видалити
                    </button>
                  </div>
                </div>

                <strong>
                  {(Number(item.price) * item.quantity).toFixed(2)} грн
                </strong>
              </div>
            ))}

            <div className="cart-total">
              Разом:{" "}
              {cart
                .reduce(
                  (total, item) =>
                    total + Number(item.price) * item.quantity,
                  0
                )
                .toFixed(2)}{" "}
              грн
            </div>
          </div>
        )}
      </section>
      )}
      {showAdmin && (
        <section className="admin-section">
          {!isAdmin ? (
            <div className="admin-login">
              <h2>Вхід до адмін-панелі</h2>

              <input
                type="password"
                placeholder="Введіть пароль"
                value={adminPassword}
                onChange={(event) => setAdminPassword(event.target.value)}
              />

              <button
                onClick={() => {
                  if (adminPassword === "1234") {
                    setIsAdmin(true);
                    setAdminPassword("");
                    setLoginError("");
                  } else {
                    setLoginError("Неправильний пароль");
                  }
                }}
              >
                Увійти
              </button>

              {loginError && (
                <p className="login-error">{loginError}</p>
              )}
            </div>
          ) : (
            <>
              <h2>Адмін-панель</h2>
              <button
                className="logout-button"
                onClick={() => {
                  setIsAdmin(false);
                  setShowAdmin(false);
                }}
              >
                Вийти
              </button>
              <div className="add-product-form">
                <button onClick={createProduct}>
                  Додати товар
                </button>

                <input
                  type="text"
                  placeholder="Назва товару"
                  value={newProduct.name}
                  onChange={(event) =>
                    setNewProduct({
                      ...newProduct,
                      name: event.target.value,
                    })
                  }
                />

                <input
                  type="text"
                  placeholder="Опис"
                  value={newProduct.description}
                  onChange={(event) =>
                    setNewProduct({
                      ...newProduct,
                      description: event.target.value,
                    })
                  }
                />

                <input
                  type="number"
                  placeholder="Ціна"
                  value={newProduct.price}
                  onChange={(event) =>
                    setNewProduct({
                      ...newProduct,
                      price: event.target.value,
                    })
                  }
                />

                <select
                  value={newProduct.categoryId}
                  onChange={(event) =>
                    setNewProduct({
                      ...newProduct,
                      categoryId: event.target.value,
                    })
                  }
                >
                  <option value="">Оберіть категорію</option>

                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>

                <input
                  type="text"
                  placeholder="Шлях до зображення"
                  value={newProduct.image}
                  onChange={(event) =>
                    setNewProduct({
                      ...newProduct,
                      image: event.target.value,
                    })
                  }
                />
              </div>

              <div className="admin-products">
                {products.map((product) => (
                  <div className="admin-product" key={product.id}>
                    <div>
                      <h3>{product.name}</h3>

                      <p>Ціна: {product.price} грн</p>

                      <p>Категорія: {product.category.name}</p>
                    </div>

                    <div className="admin-product-buttons">
                      <button onClick={() => setEditingProduct(product)}>
                        Редагувати
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => deleteProduct(product.id)}
                      >
                        Видалити
                      </button>
                    </div>

                    {editingProduct?.id === product.id && (
                      <div className="edit-form">
                        <input
                          type="text"
                          value={editingProduct.name}
                          onChange={(event) =>
                            setEditingProduct({
                              ...editingProduct,
                              name: event.target.value,
                            })
                          }
                        />

                        <input
                          type="number"
                          value={editingProduct.price}
                          onChange={(event) =>
                            setEditingProduct({
                              ...editingProduct,
                              price: event.target.value,
                            })
                          }
                        />

                        <button onClick={updateProduct}>
                          Зберегти
                        </button>

                        <button onClick={() => setEditingProduct(null)}>
                          Скасувати
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      )}
      <main>
        <h2 className="menu-title">Меню</h2>

        <div className="categories">
          <button
            className={selectedCategory === null ? "category-active" : ""}
            onClick={() => setSelectedCategory(null)}
          >
            Усі
          </button>

          {categories.map((category) => (
            <button
              key={category.id}
              className={
                selectedCategory === category.id ? "category-active" : ""
              }
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
        {loading && (
          <div className="message">
            <p>Завантаження товарів...</p>
          </div>
        )}

        {error && (
          <div className="message">
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div className="message">
            <p>Товарів поки немає.</p>
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <div className="products">
            {filteredProducts.map((product) => (
              <div className="product-card" key={product.id}>
                {product.image && (
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-image"
                  />
                )}

                <h3>{product.name}</h3>

                <p className="product-description">
                  {product.description}
                </p>

                <p className="product-category">
                  Категорія: {product.category.name}
                </p>

                <p className="product-price">
                  {product.price} грн
                </p>

                <button onClick={() => addToCart(product)}>
                  Додати до кошика
                </button>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;