require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("./models/User");

const connectDB = require("./config/db");

const createAdmin = async () => {
  try {
    await connectDB();

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "Admin",
      email: "admin@cvr.ac.in",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();

    console.log("Admin created successfully ");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();
