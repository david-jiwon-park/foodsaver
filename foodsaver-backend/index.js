const express = require("express");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const usersRoutes = require("./routes/users");
const inventoryRoutes = require("./routes/inventory");
const notificationsRoutes = require("./routes/notifications");
const favoritesRoutes = require("./routes/favorites");

const cors = require("cors");

// Middleware to implement Cross Origin Resource Sharing (CORS)
app.use(cors());

// Enables JSON to be posted in request.body
app.use(express.json());

// Routes
app.use("/users", usersRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/notifications", notificationsRoutes);
app.use("/favorites", favoritesRoutes);

// Listener
app.listen(PORT, () => console.log(`Listening on ${PORT}`));