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

  return (
    <section id="todays-menu" className="todays-menu-section">
      <h2>Today's Menu</h2>

      <div className="menu-container">
        {menu.slice(0, 6).map((item) => (
          <div className="menu-card" key={item._id}>
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>
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
