import React, { useEffect, useState } from "react";

const PRODUCTS = [
  {
    id: 1,
    name: "iPhone 15",
    category: "Phones",
    price: 69999,
    image:
      "https://images.unsplash.com/photo-1592286927505-2fd4a4f2c2e0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    name: "Samsung Galaxy S24",
    category: "Phones",
    price: 74999,
    image:
      "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    name: "OnePlus 12",
    category: "Phones",
    price: 64999,
    image:
      "https://images.unsplash.com/photo-1598327105666-5b89351aff97?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    name: "MacBook Air M3",
    category: "Laptops",
    price: 114999,
    image:
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 5,
    name: "Dell XPS 15",
    category: "Laptops",
    price: 139999,
    image:
      "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 6,
    name: "HP Pavilion",
    category: "Laptops",
    price: 69999,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 7,
    name: "Sony WH-1000XM5",
    category: "Headphones",
    price: 29999,
    image:
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 8,
    name: "AirPods Pro",
    category: "Headphones",
    price: 24999,
    image:
      "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 9,
    name: "JBL Headphones",
    category: "Headphones",
    price: 5999,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 10,
    name: "Apple Watch Series 9",
    category: "Watches",
    price: 41999,
    image:
      "https://images.unsplash.com/photo-1551816230-ef5deaed4a26?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 11,
    name: "Samsung Galaxy Watch",
    category: "Watches",
    price: 29999,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 12,
    name: "Nike Air Max",
    category: "Shoes",
    price: 12999,
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 13,
    name: "Adidas Ultraboost",
    category: "Shoes",
    price: 10999,
    image:
      "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 14,
    name: "iPad Air",
    category: "Tablets",
    price: 59999,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 15,
    name: "Samsung Galaxy Tab",
    category: "Tablets",
    price: 44999,
    image:
      "https://images.unsplash.com/photo-1561154464-82e9adf32764?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 16,
    name: "Canon EOS Camera",
    category: "Cameras",
    price: 79999,
    image:
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 17,
    name: "Sony Alpha Camera",
    category: "Cameras",
    price: 99999,
    image:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 18,
    name: "PlayStation 5",
    category: "Gaming",
    price: 54999,
    image:
      "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 19,
    name: "Xbox Series X",
    category: "Gaming",
    price: 52999,
    image:
      "https://images.unsplash.com/photo-1621259182978-fbf93132d53d?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 20,
    name: "Nintendo Switch",
    category: "Gaming",
    price: 34999,
    image:
      "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?auto=format&fit=crop&w=800&q=80",
  },
];

const SLIDES = [
  {
    title: "Latest Technology",
    subtitle: "Discover the newest gadgets at great prices",
    image:
      "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Upgrade Your Lifestyle",
    subtitle: "Premium products made for your everyday life",
    image:
      "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?auto=format&fit=crop&w=1600&q=80",
  },
  {
    title: "Shop With Confidence",
    subtitle: "Quality products. Simple shopping. Fast checkout.",
    image:
      "https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1600&q=80",
  },
];

function Catalog() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [slide, setSlide] = useState(0);

  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      if (!Array.isArray(parsedCart)) {
        return [];
      }

      return parsedCart
        .map((item) => {
          // Supports both old and new cart formats
          if (item.product) {
            return {
              ...item.product,
              quantity: Number(item.qty) || 1,
            };
          }

          return {
            ...item,
            quantity: Number(item.quantity) || 1,
          };
        })
        .filter((item) => item.id);
    } catch (error) {
      console.error("Could not load cart:", error);
      return [];
    }
  });

  const [showCart, setShowCart] = useState(false);
  const [showAddedCart, setShowAddedCart] = useState(false);
  const [addedProductName, setAddedProductName] = useState("");

  // Save cart
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cart));
    } catch (error) {
      console.error("Could not save cart:", error);
    }
  }, [cart]);

  // Automatic slideshow
  useEffect(() => {
    const timer = setInterval(() => {
      setSlide((current) => (current + 1) % SLIDES.length);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(PRODUCTS.map((product) => product.category))),
  ];

  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const cartCount = cart.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  const cartTotal = cart.reduce(
    (total, item) =>
      total + Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  const formatPrice = (price) => {
    return `₹${Number(price).toLocaleString("en-IN")}`;
  };

  // Add product to cart
  const addToCart = (product) => {
    const userInfo = localStorage.getItem("userInfo");

    if (!userInfo) {
      alert(
        "Please login or register before adding products to your cart."
      );

      window.location.href = "/login";
      return;
    }

    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: Number(item.quantity || 0) + 1,
              }
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

    setAddedProductName(product.name);
    setShowAddedCart(true);

    setTimeout(() => {
      setShowAddedCart(false);
    }, 2500);
  };

  // Increase quantity
  const increaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Number(item.quantity || 0) + 1,
            }
          : item
      )
    );
  };

  // Decrease quantity
  const decreaseQuantity = (id) => {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Number(item.quantity || 0) - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove product
  const removeFromCart = (id) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== id)
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
  };

  // Checkout
  const checkout = () => {
    if (cart.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    window.location.href = "/cart";
  };

  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <div style={styles.logo}>
          <span style={styles.logoIcon}>🛍️</span>
          <span>ShopEase</span>
        </div>

        <div style={styles.searchContainer}>
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            style={styles.searchInput}
          />
          <span style={styles.searchIcon}>🔍</span>
        </div>

        <button
          style={styles.headerCartButton}
          onClick={() => setShowCart(true)}
        >
          🛒 Cart
          {cartCount > 0 && (
            <span style={styles.cartBadge}>{cartCount}</span>
          )}
        </button>
      </header>

      {/* Hero Slideshow */}
      <section style={styles.hero}>
        <img
          src={SLIDES[slide].image}
          alt={SLIDES[slide].title}
          style={styles.heroImage}
        />

        <div style={styles.heroOverlay}>
          <h1 style={styles.heroTitle}>{SLIDES[slide].title}</h1>

          <p style={styles.heroSubtitle}>
            {SLIDES[slide].subtitle}
          </p>

          <button
            style={styles.shopButton}
            onClick={() => {
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Shop Now →
          </button>
        </div>

        <button
          style={{
            ...styles.slideButton,
            left: "15px",
          }}
          onClick={() =>
            setSlide(
              (current) =>
                (current - 1 + SLIDES.length) % SLIDES.length
            )
          }
        >
          ‹
        </button>

        <button
          style={{
            ...styles.slideButton,
            right: "15px",
          }}
          onClick={() =>
            setSlide((current) => (current + 1) % SLIDES.length)
          }
        >
          ›
        </button>

        <div style={styles.dots}>
          {SLIDES.map((_, index) => (
            <button
              key={index}
              onClick={() => setSlide(index)}
              style={{
                ...styles.dot,
                opacity: slide === index ? 1 : 0.5,
                transform:
                  slide === index ? "scale(1.2)" : "scale(1)",
              }}
            />
          ))}
        </div>
      </section>

      {/* Category Filter */}
      <section style={styles.categorySection}>
        <h2 style={styles.sectionTitle}>Shop by Category</h2>

        <div style={styles.categories}>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              style={{
                ...styles.categoryButton,
                ...(selectedCategory === category
                  ? styles.activeCategory
                  : {}),
              }}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Products */}
      <section id="products" style={styles.productsSection}>
        <div style={styles.productsHeader}>
          <div>
            <h2 style={styles.sectionTitle}>Featured Products</h2>
            <p style={styles.productCount}>
              {filteredProducts.length} products found
            </p>
          </div>

          {search && (
            <button
              style={styles.clearSearch}
              onClick={() => setSearch("")}
            >
              Clear Search
            </button>
          )}
        </div>

        {filteredProducts.length === 0 ? (
          <div style={styles.noProducts}>
            <div style={styles.noProductsIcon}>🔍</div>
            <h3>No products found</h3>
            <p>Try another search or category.</p>
          </div>
        ) : (
          <div style={styles.productGrid}>
            {filteredProducts.map((product) => (
              <div key={product.id} style={styles.productCard}>
                <div style={styles.productImageContainer}>
                  <img
                    src={product.image}
                    alt={product.name}
                    style={styles.productImage}
                  />

                  <span style={styles.categoryBadge}>
                    {product.category}
                  </span>
                </div>

                <div style={styles.productInfo}>
                  <h3 style={styles.productName}>{product.name}</h3>

                  <div style={styles.rating}>★★★★★</div>

                  <div style={styles.productBottom}>
                    <strong style={styles.price}>
                      {formatPrice(product.price)}
                    </strong>

                    <button
                      style={styles.addButton}
                      onClick={() => addToCart(product)}
                    >
                      🛒 Add
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Center Added To Cart Notification */}
      {showAddedCart && (
        <div style={styles.notificationOverlay}>
          <div style={styles.notification}>
            <div style={styles.successIcon}>✓</div>

            <div style={styles.notificationText}>
              <strong>Added to Cart</strong>
              <span>{addedProductName}</span>
              <small>
                {cartCount} item{cartCount !== 1 ? "s" : ""} in cart
              </small>
            </div>

            <button
              style={styles.viewCartButton}
              onClick={() => {
                setShowAddedCart(false);
                setShowCart(true);
              }}
            >
              🛒 View Cart
            </button>

            <button
              style={styles.closeNotification}
              onClick={() => setShowAddedCart(false)}
            >
              ×
            </button>
          </div>
        </div>
      )}

      {/* Cart Overlay */}
      {showCart && (
        <div
          style={styles.cartOverlay}
          onClick={() => setShowCart(false)}
        >
          <aside
            style={styles.cartDrawer}
            onClick={(event) => event.stopPropagation()}
          >
            <div style={styles.cartHeader}>
              <div>
                <h2 style={styles.cartTitle}>Your Cart</h2>
                <p style={styles.cartItemsText}>
                  {cartCount} item{cartCount !== 1 ? "s" : ""}
                </p>
              </div>

              <button
                style={styles.closeCart}
                onClick={() => setShowCart(false)}
              >
                ×
              </button>
            </div>

            {cart.length === 0 ? (
              <div style={styles.emptyCart}>
                <div style={styles.emptyCartIcon}>🛒</div>
                <h3>Your cart is empty</h3>
                <p>Add some products to get started.</p>

                <button
                  style={styles.continueButton}
                  onClick={() => setShowCart(false)}
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              <>
                <div style={styles.cartProducts}>
                  {cart.map((item) => (
                    <div key={item.id} style={styles.cartItem}>
                      <img
                        src={item.image}
                        alt={item.name}
                        style={styles.cartItemImage}
                      />

                      <div style={styles.cartItemDetails}>
                        <h4 style={styles.cartItemName}>
                          {item.name}
                        </h4>

                        <p style={styles.cartItemPrice}>
                          {formatPrice(item.price)}
                        </p>

                        <div style={styles.quantityRow}>
                          <button
                            style={styles.quantityButton}
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                          >
                            −
                          </button>

                          <span style={styles.quantity}>
                            {item.quantity}
                          </span>

                          <button
                            style={styles.quantityButton}
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                          >
                            +
                          </button>

                          <button
                            style={styles.removeButton}
                            onClick={() =>
                              removeFromCart(item.id)
                            }
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={styles.cartFooter}>
                  <div style={styles.totalRow}>
                    <span>Total</span>
                    <strong>{formatPrice(cartTotal)}</strong>
                  </div>

                  <button
                    style={styles.checkoutButton}
                    onClick={checkout}
                  >
                    Proceed to Checkout →
                  </button>

                  <button
                    style={styles.clearCartButton}
                    onClick={clearCart}
                  >
                    Clear Cart
                  </button>
                </div>
              </>
            )}
          </aside>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f7f8fc",
    color: "#1f2937",
    fontFamily:
      "Inter, Arial, Helvetica, sans-serif",
  },

  header: {
    position: "sticky",
    top: 0,
    zIndex: 1000,
    height: "70px",
    padding: "0 5%",
    display: "flex",
    alignItems: "center",
    gap: "30px",
    background: "#ffffff",
    borderBottom: "1px solid #e5e7eb",
    boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
  },

  logo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "22px",
    fontWeight: "800",
    color: "#111827",
    whiteSpace: "nowrap",
  },

  logoIcon: {
    fontSize: "25px",
  },

  searchContainer: {
    position: "relative",
    flex: 1,
    maxWidth: "650px",
    margin: "0 auto",
  },

  searchInput: {
    width: "100%",
    boxSizing: "border-box",
    padding: "13px 45px 13px 18px",
    border: "1px solid #d1d5db",
    borderRadius: "12px",
    outline: "none",
    fontSize: "15px",
    background: "#f9fafb",
  },

  searchIcon: {
    position: "absolute",
    right: "17px",
    top: "11px",
    fontSize: "20px",
  },

  headerCartButton: {
    position: "relative",
    border: "none",
    background: "#111827",
    color: "#ffffff",
    padding: "12px 18px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "700",
    fontSize: "14px",
    whiteSpace: "nowrap",
  },

  cartBadge: {
    position: "absolute",
    top: "-8px",
    right: "-8px",
    minWidth: "20px",
    height: "20px",
    borderRadius: "50%",
    background: "#ef4444",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "11px",
    fontWeight: "800",
  },

  hero: {
    position: "relative",
    height: "430px",
    overflow: "hidden",
    background: "#111827",
  },

  heroImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  heroOverlay: {
    position: "absolute",
    inset: 0,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    padding: "20px",
    background:
      "linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.35))",
    color: "#ffffff",
  },

  heroTitle: {
    margin: 0,
    fontSize: "clamp(35px, 6vw, 65px)",
    fontWeight: "900",
  },

  heroSubtitle: {
    margin: "15px 0 25px",
    fontSize: "18px",
    maxWidth: "650px",
  },

  shopButton: {
    border: "none",
    padding: "14px 28px",
    borderRadius: "10px",
    background: "#ffffff",
    color: "#111827",
    cursor: "pointer",
    fontWeight: "800",
    fontSize: "15px",
  },

  slideButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    border: "none",
    background: "rgba(255,255,255,0.85)",
    color: "#111827",
    fontSize: "30px",
    cursor: "pointer",
  },

  dots: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "8px",
  },

  dot: {
    width: "9px",
    height: "9px",
    borderRadius: "50%",
    border: "none",
    background: "#ffffff",
    cursor: "pointer",
    padding: 0,
  },

  categorySection: {
    padding: "40px 5% 20px",
    background: "#ffffff",
  },

  sectionTitle: {
    margin: "0 0 20px",
    fontSize: "26px",
    fontWeight: "800",
  },

  categories: {
    display: "flex",
    gap: "10px",
    flexWrap: "wrap",
  },

  categoryButton: {
    padding: "10px 18px",
    borderRadius: "30px",
    border: "1px solid #d1d5db",
    background: "#ffffff",
    color: "#374151",
    cursor: "pointer",
    fontWeight: "600",
  },

  activeCategory: {
    background: "#111827",
    color: "#ffffff",
    borderColor: "#111827",
  },

  productsSection: {
    padding: "35px 5% 70px",
  },

  productsHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "20px",
    marginBottom: "25px",
  },

  productCount: {
    margin: "-10px 0 0",
    color: "#6b7280",
    fontSize: "14px",
  },

  clearSearch: {
    border: "none",
    background: "#e5e7eb",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
  },

  productGrid: {
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fill, minmax(230px, 1fr))",
    gap: "22px",
  },

  productCard: {
    background: "#ffffff",
    borderRadius: "16px",
    overflow: "hidden",
    border: "1px solid #e5e7eb",
    boxShadow: "0 5px 20px rgba(0,0,0,0.05)",
  },

  productImageContainer: {
    position: "relative",
    height: "220px",
    background: "#f3f4f6",
  },

  productImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
  },

  categoryBadge: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "#ffffff",
    padding: "5px 9px",
    borderRadius: "7px",
    fontSize: "11px",
    fontWeight: "700",
  },

  productInfo: {
    padding: "17px",
  },

  productName: {
    margin: "0 0 8px",
    fontSize: "17px",
    fontWeight: "700",
  },

  rating: {
    marginBottom: "15px",
    fontSize: "13px",
    letterSpacing: "2px",
  },

  productBottom: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  },

  price: {
    fontSize: "18px",
  },

  addButton: {
    border: "none",
    background: "#111827",
    color: "#ffffff",
    padding: "9px 13px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
  },

  noProducts: {
    textAlign: "center",
    padding: "80px 20px",
    background: "#ffffff",
    borderRadius: "16px",
  },

  noProductsIcon: {
    fontSize: "50px",
  },

  notificationOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 2000,
    pointerEvents: "none",
  },

  notification: {
    pointerEvents: "auto",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "min(90%, 430px)",
    boxSizing: "border-box",
    background: "#ffffff",
    borderRadius: "18px",
    padding: "20px",
    display: "flex",
    alignItems: "center",
    gap: "14px",
    boxShadow: "0 20px 70px rgba(0,0,0,0.3)",
    border: "1px solid #e5e7eb",
  },

  successIcon: {
    width: "45px",
    height: "45px",
    minWidth: "45px",
    borderRadius: "50%",
    background: "#22c55e",
    color: "#ffffff",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "25px",
    fontWeight: "800",
  },

  notificationText: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "3px",
  },

  viewCartButton: {
    border: "none",
    background: "#111827",
    color: "#ffffff",
    padding: "10px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "700",
    whiteSpace: "nowrap",
  },

  closeNotification: {
    position: "absolute",
    right: "8px",
    top: "5px",
    border: "none",
    background: "transparent",
    fontSize: "20px",
    cursor: "pointer",
  },

  cartOverlay: {
    position: "fixed",
    inset: 0,
    zIndex: 3000,
    background: "rgba(0,0,0,0.55)",
  },

  cartDrawer: {
    position: "absolute",
    right: 0,
    top: 0,
    height: "100%",
    width: "min(440px, 100%)",
    background: "#ffffff",
    display: "flex",
    flexDirection: "column",
    boxShadow: "-10px 0 40px rgba(0,0,0,0.2)",
  },

  cartHeader: {
    padding: "22px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottom: "1px solid #e5e7eb",
  },

  cartTitle: {
    margin: 0,
    fontSize: "25px",
  },

  cartItemsText: {
    margin: "4px 0 0",
    color: "#6b7280",
    fontSize: "13px",
  },

  closeCart: {
    width: "38px",
    height: "38px",
    borderRadius: "50%",
    border: "none",
    background: "#f3f4f6",
    fontSize: "25px",
    cursor: "pointer",
  },

  cartProducts: {
    flex: 1,
    overflowY: "auto",
    padding: "15px",
  },

  cartItem: {
    display: "flex",
    gap: "13px",
    padding: "15px 0",
    borderBottom: "1px solid #e5e7eb",
  },

  cartItemImage: {
    width: "80px",
    height: "80px",
    borderRadius: "10px",
    objectFit: "cover",
  },

  cartItemDetails: {
    flex: 1,
  },

  cartItemName: {
    margin: "0 0 5px",
    fontSize: "15px",
  },

  cartItemPrice: {
    margin: "0 0 10px",
    fontWeight: "700",
  },

  quantityRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },

  quantityButton: {
    width: "30px",
    height: "30px",
    borderRadius: "7px",
    border: "1px solid #d1d5db",
    background: "#ffffff",
    cursor: "pointer",
    fontSize: "18px",
  },

  quantity: {
    minWidth: "20px",
    textAlign: "center",
    fontWeight: "700",
  },

  removeButton: {
    marginLeft: "auto",
    border: "none",
    background: "transparent",
    cursor: "pointer",
    fontSize: "16px",
  },

  cartFooter: {
    padding: "20px",
    borderTop: "1px solid #e5e7eb",
    background: "#ffffff",
  },

  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "20px",
    marginBottom: "15px",
  },

  checkoutButton: {
    width: "100%",
    padding: "14px",
    border: "none",
    borderRadius: "10px",
    background: "#111827",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "800",
    cursor: "pointer",
  },

  clearCartButton: {
    width: "100%",
    marginTop: "10px",
    padding: "11px",
    border: "1px solid #d1d5db",
    borderRadius: "10px",
    background: "#ffffff",
    cursor: "pointer",
    fontWeight: "600",
  },

  emptyCart: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "30px",
    textAlign: "center",
  },

  emptyCartIcon: {
    fontSize: "65px",
    marginBottom: "10px",
  },

  continueButton: {
    marginTop: "15px",
    padding: "12px 20px",
    border: "none",
    borderRadius: "9px",
    background: "#111827",
    color: "#ffffff",
    cursor: "pointer",
    fontWeight: "700",
  },
};

export default Catalog;