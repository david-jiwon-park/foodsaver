const db = require('knex')(require('../knexfile'));

const getInventory = async (req, res) => {
    const userId = req.params.id; 
    try {
        const userInventory = await db("inventory").where("user_id", userId).first();
        if (!userInventory) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(userInventory);
    } catch (error) {
        res.status(500).json({ message: 'There was an error with the server' });
    }
}

const addInventory = async (req, res) => {
    try {
        await db("inventory").insert({
            user_id: req.body.user_id, 
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

const editInventory = async (req, res) => {
    const inventoryId = req.params.id; 
    try {
        const updatedData = await db("inventory").where("id", inventoryId).update({
            food_item: req.body.food_item,
            exp_date: req.body.exp_date, 
        });
        if (updatedData === 0) {
            return res.status(404).json({ error: "Inventory item not found" });
        } 
        res.json({ message: "Inventory item updated successfully" });
    } catch (error) {
        res.status(500).json({ message: 'There was an error with the server' });
    }
};

const discardInventory = async (req, res) => {
    const inventoryId = req.params.id; 
    try {
        const updatedData = await db("inventory").where("id", inventoryId).update({
            food_item: req.body.discarded,
        });
        if (updatedData === 0) {
            return res.status(404).json({ error: "Inventory item not found" });
        } 
        res.json({ message: "Inventory item has been discarded" });
    } catch (error) {
        res.status(500).json({ message: 'There was an error with the server' });
    }
};

module.exports = {
    getInventory,
    addInventory,
    editInventory, 
    discardInventory
};