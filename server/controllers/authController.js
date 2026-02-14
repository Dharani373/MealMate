const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// REGISTER STUDENT
exports.register = async (req, res) => {
  try {
    const { rollNo, name, email, password } = req.body;

    // Email restriction
    if (!email.endsWith("@cvr.ac.in")) {
      return res.status(400).json({
        message: "Only @cvr.ac.in email addresses are allowed",
      });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { rollNo }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      rollNo,
      name,
      email,
      password: hashedPassword,
      role: "student",
    });

    await user.save();

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN (Student or Admin)
exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    let user;

    // If identifier contains '@', treat as email (admin)
    if (identifier.includes("@")) {
      user = await User.findOne({ email: identifier });
    } else {
      user = await User.findOne({ rollNo: identifier });
    }

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
