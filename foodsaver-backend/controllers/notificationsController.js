const db = require('knex')(require('../knexfile'));

// All users will be given default notification settings upon account creation 
const createDefaultNotifications = async (req, res) => {
    const userId = req.userData.id; 
    const userExists = await db("users").where("id", userId).first();
    if (!userExists) {
        return res.status(404).json({ error: "User not found" });
    }
    try {
        await db("notifications").insert({
            user_id: userId, 
            enabled: 1, 
            days_before: 2
        });
        res.status(201).json({
            message: "Default notification settings created successfully",
          });
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
};

// Getting the User Notification Settings for a specific user
const getUserNotifications = async (req, res) => {
    const userId = req.userData.id; 
    try {
        const userNotifications = await db("notifications").where("user_id", userId).first();
        if (!userNotifications) {
            return res.status(404).json({ error: "User not found" });
        }
        res.status(200).json(userNotifications);
    } catch (error) {
        res.status(500).json({ message: 'There was an error with the server' });
    }
};

// Editing User Notification Settings 
const editUserNotifications = async (req, res) => {
    const userId = req.userData.id; 
    try {
        const updatedData = await db("notifications").where("user_id", userId).update({
            enabled: req.body.enabled, 
            days_before: req.body.days_before,
        });
        if (updatedData === 0) {
            return res.status(404).json({ error: "User not found" });
        } 
        res.json({ message: "User notification settings updated successfully" });
    } catch (error) {
        res.status(500).json({ message: 'There was an error with the server' });
    }
};

module.exports = {
    createDefaultNotifications,
    getUserNotifications,
    editUserNotifications
};