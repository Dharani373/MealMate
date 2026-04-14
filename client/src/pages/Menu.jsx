import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/menu")
      .then((res) => {
        setMenuItems(res.data);
        setFilteredItems(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    let items = menuItems;

    if (category !== "all") {
      items = items.filter((item) => item.category === category);
    }

    if (searchTerm !== "") {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    setFilteredItems(items);
  }, [searchTerm, category, menuItems]);

  const handleOrder = async (item) => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login first!");
        return;
      }

      await axios.post("http://localhost:5000/api/orders/create", {
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
      });

      alert("Order placed successfully!");
    } catch (error) {
      console.error(error);
      alert("Order failed");
    }
  };

  return (
    <div className="menu-page">
      <button className="back-home-btn" onClick={() => navigate("/")}>
        ← Back to Home
      </button>
      <h2>Today's Menu</h2>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search food..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      {/* Categories */}
      <div className="category-buttons">
        {["all", "breakfast", "meals", "snacks", "beverages"].map((cat) => (
          <button
            key={cat}
            className={category === cat ? "active-category" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Menu Items */}
      <div className="menu-container">
        {filteredItems.map((item) => (
          <div key={item._id} className="menu-card">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p className="price">₹{item.price}</p>

            <button className="order-btn" onClick={() => handleOrder(item)}>
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
