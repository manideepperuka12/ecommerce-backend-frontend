import React, {
  useState,
  useEffect,
  useContext,
} from "react";

import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const Orders = () => {
  const [orders, setOrders] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const { user } =
    useContext(AuthContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        if (!user?.token) return;

        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };

        const { data } =
          await axios.get(
            "http://localhost:5000/api/orders/myorders",
            config
          );

        setOrders(
          Array.isArray(data)
            ? data
            : []
        );
      } catch (err) {
        console.error(
          "Error fetching order history",
          err
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user]);

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString(
      "en-IN"
    )}`;

  const getStatusStyle = (
    status
  ) => {
    switch (status) {
      case "Delivered":
        return {
          background: "#dcfce7",
          color: "#15803d",
        };

      case "Shipped":
        return {
          background: "#dbeafe",
          color: "#1d4ed8",
        };

      case "Processing":
        return {
          background: "#fef3c7",
          color: "#b45309",
        };

      default:
        return {
          background: "#f1f5f9",
          color: "#475569",
        };
    }
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <span style={styles.label}>
          SHOPPING HISTORY
        </span>

        <h1 style={styles.title}>
          Your Orders
        </h1>

        <p style={styles.subtitle}>
          Track your purchases and
          order status.
        </p>

        {loading ? (
          <div style={styles.empty}>
            Loading your orders...
          </div>
        ) : orders.length === 0 ? (
          <div style={styles.empty}>
            <div
              style={styles.emptyIcon}
            >
              📦
            </div>

            <h2>
              No orders yet
            </h2>

            <p>
              Your completed orders
              will appear here.
            </p>
          </div>
        ) : (
          <div>
            {orders.map(
              (order) => (
                <div
                  key={order._id}
                  style={styles.order}
                >
                  <div
                    style={
                      styles.orderTop
                    }
                  >
                    <div>
                      <span
                        style={
                          styles.orderLabel
                        }
                      >
                        ORDER ID
                      </span>

                      <strong>
                        {order._id}
                      </strong>
                    </div>

                    <span
                      style={{
                        ...styles.status,
                        ...getStatusStyle(
                          order.status
                        ),
                      }}
                    >
                      {order.status ||
                        "Pending"}
                    </span>
                  </div>

                  <div
                    style={
                      styles.orderDetails
                    }
                  >
                    <div>
                      <span>
                        Total Amount
                      </span>

                      <strong>
                        {formatPrice(
                          order.totalPrice
                        )}
                      </strong>
                    </div>

                    <div>
                      <span>
                        Tracking
                      </span>

                      <strong>
                        {order.status ||
                          "Pending"}
                      </strong>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight:
      "calc(100vh - 72px)",
    background: "#f8fafc",
    padding: "50px 20px",
  },

  container: {
    maxWidth: "1000px",
    margin: "0 auto",
  },

  label: {
    color: "#6366f1",
    fontSize: "12px",
    fontWeight: "800",
    letterSpacing: "2px",
  },

  title: {
    fontSize: "38px",
    color: "#0f172a",
    margin: "7px 0",
  },

  subtitle: {
    color: "#64748b",
    marginBottom: "30px",
  },

  order: {
    background: "white",
    border: "1px solid #e2e8f0",
    borderRadius: "14px",
    padding: "22px",
    marginBottom: "15px",
  },

  orderTop: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "18px",
    borderBottom:
      "1px solid #e2e8f0",
  },

  orderLabel: {
    display: "block",
    color: "#94a3b8",
    fontSize: "11px",
    fontWeight: "800",
    marginBottom: "5px",
  },

  status: {
    padding: "7px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "800",
  },

  orderDetails: {
    display: "flex",
    gap: "70px",
    marginTop: "18px",
  },

  empty: {
    background: "white",
    padding: "70px 20px",
    borderRadius: "15px",
    textAlign: "center",
  },

  emptyIcon: {
    fontSize: "50px",
  },
};

export default Orders;