const db = require('knex')(require('../knexfile'));

// Getting Inventory list for a specific user
const getInventory = async (req, res) => {
    const userId = req.userData.id; 
    const userExists = await db("users").where("id", userId).first();
    if (!userExists) {
        return res.status(404).json({ error: "User not found" });
    }
    try {
        const userInventory = await db("inventory").where("user_id", userId);
        res.status(200).json(userInventory);
    } catch (error) {
        res.status(500).json({ message: 'There was an error with the server' });
    }
}

// Adding food item to Inventory list  
const addInventory = async (req, res) => {
    const userId = req.userData.id; 
    const userExists = await db("users").where("id", userId).first();
    if (!userExists) {
        return res.status(404).json({ error: "User not found" });
    }
    try {
        await db("inventory").insert({
            user_id: userId, 
            food_item: req.body.food_item,
            exp_date: req.body.exp_date, 
            discarded: 0
        });
        res.status(201).json({
            message: "Inventory item created successfully",
          });
    } catch (err) {
    res.status(500).json({ error: "Internal server error" });
    }
};

// Editing food item in Inventory list
const editInventory = async (req, res) => {
    const inventoryId = req.params.id; 
    try {
        const updatedData = await db("inventory").where("id", inventoryId).update({
            food_item: req.body.food_item,
            exp_date: req.body.exp_date, 
            discarded: req.body.discarded
        });
        if (updatedData === 0) {
            return res.status(404).json({ error: "Inventory item not found" });
        } 
        res.json({ message: "Inventory item updated successfully" });
    } catch (error) {
        res.status(500).json({ message: 'There was an error with the server' });
    }
};

module.exports = {
    getInventory,
    addInventory,
    editInventory, 
};