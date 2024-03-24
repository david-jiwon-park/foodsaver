const express = require("express");
const app = express();
require('dotenv').config();
const PORT = process.env.PORT;
const usersRoutes = require("./routes/users");
const inventoryRoutes = require("./routes/inventory");
const notificationsRoutes = require("./routes/notifications");
const favoritesRoutes = require("./routes/favorites");
const edamamApiRoutes = require("./routes/edamamApi");
require('./emailNotifications/scheduleSendEmail');
const cors = require("cors");

// Middleware to implement Cross Origin Resource Sharing (CORS)
app.use(cors());

// Enables JSON to be posted in request.body
app.use(express.json());

// Routes that retrieve data from database
app.use("/users", usersRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/notifications", notificationsRoutes);
app.use("/favorites", favoritesRoutes);

// Routes that retrieve data from external API
app.use("/edamamApi", edamamApiRoutes)

// Listener
app.listen(PORT, () => console.log(`Listening on ${PORT}`));