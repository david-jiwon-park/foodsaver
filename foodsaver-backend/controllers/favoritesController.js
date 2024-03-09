const db = require('knex')(require('../knexfile'));

// Getting Favorites list for a specific user
const getFavorites = async (req, res) => {
    const userId = req.params.userId; 
    const userExists = await db("users").where("id", userId).first();
    if (!userExists) {
        return res.status(404).json({ error: "User not found" });
    }
    try {
        const userFavorites = await db("favorites").where("user_id", userId);
        res.status(200).json(userFavorites);
    } catch (error) {
        res.status(500).json({ message: 'There was an error with the server' });
    }
}

// Adding a recipe to Favorites list
const addFavorites = async (req, res) => {
    const userId = req.params.userId; 
    const userExists = await db("users").where("id", userId).first();
    if (!userExists) {
        return res.status(404).json({ error: "User not found" });
    }
    try {
        await db("favorites").insert({
            recipe_id: req.body.recipe_id,
            user_id: userId, 
        });
        res.status(201).json({
            message: "Favorite created successfully",
          });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Deleting recipe in the Favorites list
const deleteFavorites = async (req, res) => {
    const id = req.params.id; 
    const favoriteExists = await db("favorites").where("id", id).first();
    if (!favoriteExists) {
        return res.status(404).json({ error: "Favorite not found" });
    }
    try {
        await db("favorites").where("id", id).del();
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: 'There was an error with the server' });
    }
};

module.exports = {
    getFavorites,
    addFavorites,
    deleteFavorites 
};