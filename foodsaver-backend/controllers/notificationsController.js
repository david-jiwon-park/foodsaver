const db = require('knex')(require('../knexfile'));

const getUserNotifications = async (req, res) => {
    const userId = req.params.id; 
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

const editUserNotifications = async (req, res) => {
    const userId = req.params.id; 
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
    getUserNotifications,
    editUserNotifications
};