const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) return res.status(400).json({ message: "All fields are required." });

  try {
    const user = new User({ username, password });
    await user.save();
    res.status(201).json({ message: "User registered successfully." });
  } catch (err) {
    res.status(500).json({ message: "Error registering user.", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  // Validate input
  if (!username || !password) {
    return res.status(400).json({ message: "All fields are required." });
  }

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    // if (!isPasswordValid) {
    //   return res.status(400).json({ message: "Invalid credentials." });
    // }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      '123',
      { expiresIn: "1h" }
    );

    // Return token and user information
    res.status(200).json({ 
      message: "Login successful.", 
      token,
    });
  } catch (err) {
    console.error("Error logging in:", err.message);
    res.status(500).json({ 
      message: "Error logging in.", 
      error: err.message 
    });
  }
};
