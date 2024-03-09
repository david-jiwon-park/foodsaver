const express = require("express");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;

const cors = require("cors");

// Middleware to implement Cross Origin Resource Sharing (CORS)
app.use(cors());

// Enables JSON to be posted in request.body
app.use(express.json());

// Routes

// Listener
app.listen(PORT, () => console.log(`Listening on ${PORT}`));