const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

app.use(express.json());

// Enable CORS for all origins
app.use(cors());

// OR Enable CORS for specific frontend URL
app.use(
  cors({
    origin: "http://127.0.0.1:5500",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Access-Control-Allow-Origin",
      "Access-Control-Allow-Methods",
      "Access-Control-Allow-Headers",
    ],
  })
);

connectDB();

app.use("/api/auth", require("../backend/routes/api/auth"));

app.use("/api",require("./routes/index"))

// Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
