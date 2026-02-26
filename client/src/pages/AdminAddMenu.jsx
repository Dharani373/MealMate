import { useState } from "react";

function AdminAddMenu() {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    image: "",
    category: "meals",
    type: "veg",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/menu/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.message);

    // Clear form after submit
    setFormData({
      name: "",
      price: "",
      image: "",
      category: "meals",
      type: "veg",
    });
  };

  return (
    <div className="admin-container">
      <h2>Add Menu Item</h2>

      <form onSubmit={handleSubmit} className="admin-form">
        <input
          type="text"
          name="name"
          placeholder="Dish Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="image"
          placeholder="Image Path (/images/...)"
          value={formData.image}
          onChange={handleChange}
          required
        />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="snacks">Snacks</option>
          <option value="meals">Meals</option>
          <option value="beverages">Beverages</option>
          <option value="breakfast">Breakfast</option>
        </select>

        <select name="type" value={formData.type} onChange={handleChange}>
          <option value="veg">Veg</option>
          <option value="nonveg">Non-Veg</option>
        </select>

        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default AdminAddMenu;
