import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TodaysMenuPreview() {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/menu")
      .then((res) => res.json())
      .then((data) => setMenu(data))
      .catch((err) => console.log(err));
  }, []);

  const handleOrder = async (item) => {
    const userId = localStorage.getItem("userId");

    if (!userId) {
      alert("Please login first!");
      return;
    }

    try {
      await fetch("http://localhost:5000/api/orders/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          items: [
            {
              name: item.name,
              price: item.price,
              quantity: 1,
              image: item.image,
            },
          ],
          totalAmount: item.price,
        }),
      });

      alert("Order placed successfully!");
    } catch (error) {
      console.error(error);
      alert("Order failed");
    }
  };

  return (
    <section id="todays-menu" className="todays-menu-section">
      <h2>Today's Menu</h2>

      <div className="menu-container">
        {menu.slice(0, 6).map((item) => (
          <div className="menu-card" key={item._id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            <button className="order-btn" onClick={() => handleOrder(item)}>
              Order Now
            </button>
          </div>
        ))}
      </div>
      <div className="menu-btn-wrapper">
        <Link to="/menu" className="view-menu-btn">
          Today's Menu →
        </Link>
      </div>
    </section>
  );
}

export default TodaysMenuPreview;
