const Menu = require("../models/Menu");

// Add Menu Item
exports.addMenuItem = async (req, res) => {
  try {
    const { name, price, image, category, type } = req.body;

    const newItem = new Menu({
      name,
      price,
      image,
      category,
      type,
    });

    await newItem.save();
    res.status(201).json({ message: "Menu item added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get All Menu Items
exports.getMenuItems = async (req, res) => {
  try {
    const items = await Menu.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
