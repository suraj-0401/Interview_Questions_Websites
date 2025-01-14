const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const authRoutes = require("./routes/authRoutes");
const submissionRoutes = require("./routes/submissionRoutes");
const cors = require("cors");
const session = require('express-session');

dotenv.config();
const app = express();

app.use(cors());
// Middleware
app.use(bodyParser.json());

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("Database connection error:", err));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/submissions", submissionRoutes);

// Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
