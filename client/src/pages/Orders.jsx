import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (!userId) return;

    axios
      .get(`http://localhost:5000/api/orders/${userId}`)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="orders-page">
      <h2>My Orders</h2>

      {orders.map((order) => (
        <div key={order._id} className="order-card">
          <div className="order-left">
            <h3>Order ID: {order._id.slice(-6)}</h3>
            <p>
              <strong>Total:</strong> ₹{order.totalAmount}
            </p>
            <p>
              <strong>Status:</strong> {order.status}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.createdAt).toLocaleString()}
            </p>

            <div className="order-items">
              {order.items.map((item, index) => (
                <p key={index}>
                  {item.name} × {item.quantity}
                </p>
              ))}
            </div>
          </div>

          <div className="order-right">
            <img src={order.items[0]?.image || "/placeholder.jpg"} alt="Food" />
          </div>
        </div>
      ))}
      <button className="back-home-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
    </div>
  );
}

export default Orders;
