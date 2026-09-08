import React, {
  useState,
  useEffect,
  useContext,
} from "react";

import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const normalizeCart = (rawCart) => {
  if (!Array.isArray(rawCart)) return [];

  return rawCart
    .map((item) => {
      if (
        item.product &&
        typeof item.product === "object"
      ) {
        return {
          ...item.product,
          quantity:
            Number(
              item.qty ??
                item.quantity
            ) || 1,
        };
      }

      return {
        ...item,
        quantity:
          Number(
            item.quantity ??
              item.qty
          ) || 1,
      };
    })
    .filter((item) => item.id);
};

const Cart = () => {
  const [cartItems, setCartItems] =
    useState([]);

  const [loading, setLoading] =
    useState(false);

  const { user } =
    useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const saved =
        localStorage.getItem(
          "cartItems"
        );

      setCartItems(
        normalizeCart(
          saved
            ? JSON.parse(saved)
            : []
        )
      );
    } catch (error) {
      setCartItems([]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "cartItems",
      JSON.stringify(cartItems)
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  }, [cartItems]);

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString(
      "en-IN"
    )}`;

  const totalPrice =
    cartItems.reduce(
      (total, item) =>
        total +
        Number(item.price || 0) *
          Number(
            item.quantity || 0
          ),
      0
    );

  const increaseQuantity = (id) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                Number(
                  item.quantity
                ) + 1,
            }
          : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((items) =>
      items
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  Number(
                    item.quantity
                  ) - 1,
              }
            : item
        )
        .filter(
          (item) =>
            item.quantity > 0
        )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) =>
      items.filter(
        (item) => item.id !== id
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem(
      "cartItems"
    );

    window.dispatchEvent(
      new Event("cartUpdated")
    );
  };

  const checkoutHandler = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    if (!user?.token) {
      alert(
        "Please login before checkout."
      );

      navigate("/login");
      return;
    }

    setLoading(true);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      /*
       * Send both quantity and qty.
       * This keeps compatibility with
       * different backend implementations.
       */

      const orderItems =
        cartItems.map((item) => ({
          product: item.id,
          name: item.name,
          price: item.price,
          image: item.image,
          category: item.category,
          qty: item.quantity,
          quantity: item.quantity,
        }));

      await axios.post(
        "http://localhost:5000/api/orders",
        {
          orderItems,
          totalPrice,
        },
        config
      );

      clearCart();

      alert(
        "Order Processed Successfully!"
      );

      navigate("/orders");
    } catch (err) {
      console.error(err);

      alert(
        err.response?.data?.message ||
          "Checkout Processing Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.header}>
          <div>
            <span style={styles.label}>
              SHOPPING BAG
            </span>

            <h1 style={styles.title}>
              Your Cart
            </h1>
          </div>

          <button
            style={styles.backButton}
            onClick={() =>
              navigate("/")
            }
          >
            ← Continue Shopping
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div style={styles.empty}>
            <div style={styles.emptyIcon}>
              🛒
            </div>

            <h2>
              Your cart is empty
            </h2>

            <p>
              You haven't added any
              products yet.
            </p>

            <button
              style={
                styles.shopButton
              }
              onClick={() =>
                navigate("/")
              }
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div style={styles.layout}>
            <div style={styles.items}>
              {cartItems.map(
                (item) => (
                  <div
                    key={item.id}
                    style={
                      styles.item
                    }
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={
                        styles.image
                      }
                    />

                    <div
                      style={
                        styles.itemDetails
                      }
                    >
                      <h3>
                        {item.name}
                      </h3>

                      <p
                        style={
                          styles.category
                        }
                      >
                        {item.category}
                      </p>

                      <strong
                        style={
                          styles.price
                        }
                      >
                        {formatPrice(
                          item.price
                        )}
                      </strong>

                      <div
                        style={
                          styles.controls
                        }
                      >
                        <button
                          onClick={() =>
                            decreaseQuantity(
                              item.id
                            )
                          }
                        >
                          −
                        </button>

                        <span>
                          {
                            item.quantity
                          }
                        </span>

                        <button
                          onClick={() =>
                            increaseQuantity(
                              item.id
                            )
                          }
                        >
                          +
                        </button>

                        <button
                          style={
                            styles.remove
                          }
                          onClick={() =>
                            removeItem(
                              item.id
                            )
                          }
                        >
                          Remove
                        </button>
                      </div>
                    </div>

                    <strong>
                      {formatPrice(
                        Number(
                          item.price
                        ) *
                          Number(
                            item.quantity
                          )
                      )}
                    </strong>
                  </div>
                )
              )}
            </div>

            <div style={styles.summary}>
              <h2>
                Order Summary
              </h2>

              <div
                style={
                  styles.summaryRow
                }
              >
                <span>
                  Items
                </span>

                <span>
                  {cartItems.reduce(
                    (total, item) =>
                      total +
                      Number(
                        item.quantity
                      ),
                    0
                  )}
                </span>
              </div>

              <div
                style={
                  styles.summaryRow
                }
              >
                <span>
                  Subtotal
                </span>

                <strong>
                  {formatPrice(
                    totalPrice
                  )}
                </strong>
              </div>

              <div
                style={
                  styles.summaryRow
                }
              >
                <span>
                  Delivery
                </span>

                <strong>
                  FREE
                </strong>
              </div>

              <hr />

              <div
                style={
                  styles.total
                }
              >
                <strong>
                  Total
                </strong>

                <strong>
                  {formatPrice(
                    totalPrice
                  )}
                </strong>
              </div>

              <button
                style={
                  styles.checkout
                }
                onClick={
                  checkoutHandler
                }
                disabled={loading}
              >
                {loading
                  ? "Processing..."
                  : "Place Secure Order"}
              </button>

              <button
                style={
                  styles.clear
                }
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "calc(100vh - 72px)",
    background: "#f8fafc",
    padding: "45px 20px",
  },

  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  },

  label: {
    color: "#6366f1",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "2px",
  },

  title: {
    margin: "7px 0 0",
    fontSize: "38px",
    color: "#0f172a",
  },

  backButton: {
    border: "1px solid #cbd5e1",
    background: "white",
    padding: "11px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  layout: {
    display: "grid",
    gridTemplateColumns:
      "1fr 340px",
    gap: "25px",
  },

  items: {
    background: "white",
    borderRadius: "15px",
    padding: "20px",
  },

  item: {
    display: "flex",
    gap: "18px",
    alignItems: "center",
    padding: "20px 0",
    borderBottom:
      "1px solid #e2e8f0",
  },

  image: {
    width: "100px",
    height: "100px",
    objectFit: "cover",
    borderRadius: "10px",
  },

  itemDetails: {
    flex: 1,
  },

  category: {
    color: "#64748b",
    margin: "4px 0",
    fontSize: "13px",
  },

  price: {
    color: "#4f46e5",
  },

  controls: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginTop: "12px",
  },

  remove: {
    border: "none",
    background: "transparent",
    color: "#ef4444",
    cursor: "pointer",
  },

  summary: {
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    height: "fit-content",
    boxShadow:
      "0 5px 20px rgba(15,23,42,0.06)",
  },

  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    margin: "15px 0",
    color: "#475569",
  },

  total: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "20px",
    margin: "20px 0",
  },

  checkout: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "9px",
    background:
      "linear-gradient(135deg,#6366f1,#4f46e5)",
    color: "white",
    fontWeight: "800",
    cursor: "pointer",
  },

  clear: {
    width: "100%",
    padding: "11px",
    marginTop: "10px",
    border: "1px solid #fecaca",
    borderRadius: "9px",
    background: "#fff",
    color: "#ef4444",
    cursor: "pointer",
  },

  empty: {
    textAlign: "center",
    padding: "90px 20px",
    background: "white",
    borderRadius: "16px",
  },

  emptyIcon: {
    fontSize: "60px",
  },

  shopButton: {
    marginTop: "15px",
    border: "none",
    borderRadius: "8px",
    padding: "12px 20px",
    background: "#6366f1",
    color: "white",
    fontWeight: "700",
    cursor: "pointer",
  },
};

export default Cart;